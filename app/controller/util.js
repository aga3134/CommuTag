var Config = require('../../config');
var URL = require('url');
var csrf = require('csurf');
var Dataset = require('../db/dataset');
var mongoose = require('mongoose');

//每個dataset存成一個collection，必免資料太大存取很慢
var ImageSchema = require("../db/imageSchema");

var util = {};

function FailDenied(message, message_query_param){
	return function(req, res) {
		var isAjax = req.xhr;
		if (isAjax) res.send({"status": "fail", "message": message});
		else res.redirect("/?message=" + encodeURIComponent(message_query_param));
	}
}

var PermissionDenied = FailDenied("permission denied", "權限不足");
var BlackListDenied = FailDenied("blacklist", "黑名單使用者無此權限");

util.StoreIntentUrl = function(req, res, next){
	if(req.query.intentUrl){
		req.session.intentUrl = decodeURIComponent(req.query.intentUrl);
	}
	next();
}

util.RetrieveIntentUrl = function(req){
	if(req.session.intentUrl){
		var url = req.session.intentUrl;
		var urlParse = URL.parse(url);
		delete req.session.intentUrl;
		//avoid explicit specify hostname
		if(!urlParse.hostname) return url;
		else return "/";
	}
	else return "/";
};

util.RandomInt = function(max) {
	return Math.floor(Math.random() * Math.floor(max));
};

util.CheckLogin = function (req, res, next) {
	if (req.isAuthenticated()) return next();
	PermissionDenied(req, res);
};

util.CheckAdmin = function (req, res, next) {
	if(req.user && req.user.authType == "admin"){
		return next();
	}
	PermissionDenied(req, res);
};

util.CheckMaster = function (req, res, next) {
	if (!req.user) return PermissionDenied(req, res);
	if (req.user.authType == "admin") return next();

	var id = req.query.dataset || req.body.dataset;
	if(!id) return PermissionDenied(req, res);

	Dataset.findOne({"_id": id}, function(err, dataset) {
		if(err){
			console.log(err);
			return PermissionDenied(req, res);
		}
		if(!dataset) return PermissionDenied(req, res);
		var isMaster = dataset.master.filter(function(master){
			return req.user._id.toString() == master._id.toString();
		});
		if(isMaster.length > 0) return next();
		else return PermissionDenied(req, res);
	});
};

util.CheckImageEdit = function (req, res, next) {
	if(req.user){
		if (req.user.authType == "admin") return next();
		var id = req.query.dataset || req.body.dataset;
		if(!id) return PermissionDenied(req, res);

		Dataset.findOne({"_id": id}, function(err, dataset) {
			if(err){
				console.log(err);
				return PermissionDenied(req, res);
			}
			if(!dataset) return PermissionDenied(req, res);
			var isMaster = dataset.master.filter(function(master){
				return req.user._id.toString() == master._id.toString();
			});
			if(isMaster.length > 0) return next();
			else{
				//確認是否為使用者自己上傳的影像
				var Image = mongoose.model("image"+id, ImageSchema);
				Image.findOne({_id:req.body.image},function(err, image){
					if(err){
						console.log(err);
						return PermissionDenied(req, res);
					}
					if(!image) return PermissionDenied(req, res);
					if(!image.uploader) return PermissionDenied(req, res);
					if(req.user._id.toString() == image.uploader.toString()){
						return next();
					}
					return PermissionDenied(req, res);
				});
			}
		});
	}
	else PermissionDenied(req, res);
	
};

util.CheckBlacklist = function (req, res, next) {
	if(req.user){
		if (req.user.status != "blacklist") return next();
	}
	BlackListDenied(req, res);
};

util.FailRedirect = function(req, res, redirect, message){
	var isAjax = req.xhr;
	if(isAjax) return res.send({"status":"fail","message":message});
	else return res.redirect(redirect+"?message="+encodeURIComponent(message));
};

util.UpdateDatasetStatistic = function(param){
	return new Promise(function(resolve, reject) {
		var Image = mongoose.model("image"+param.dataset, ImageSchema);
		Image.aggregate([
			{$group: {
				_id:null,
				picNum: {$sum:1},
				annotationNum: {
					$sum: {
						$cond: [{$ne: ["$annotation", null]}, 1, 0]
					}
				},
			}},
			{$project:{ _id:0}}
		],function(err, result){
			if(!result) return reject({err:"aggregate image statistic fail"});
			if(result.length == 0){
				result.push({picNum:0,annotationNum:0});
			}
			Dataset.updateOne({_id:param.dataset},result[0],function(err,dataset){
				if(err){
					console.log(err);
					return reject({err:"update dataset fail"});
				}
				return resolve();
			});
		});
	});
}


util.CSRF = csrf();

module.exports = util;
