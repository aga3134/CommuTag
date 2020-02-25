var Config = require('../../config');
var util = require("./util");
var Favorite = require("../db/favorite");
var mongoose = require('mongoose');

var favoriteController = {};


favoriteController.AddFavorite = function(param){
	var data = {
		userID: param.user._id.toString(),
		datasetID: param.dataset
	};
	Favorite.updateOne(data,data,{upsert:true},function(err, favorite){
		if(err){
			console.log(err);
			return param.failFunc({err:"create favorite fail"});
		}
		param.succFunc(favorite);
	});
};

favoriteController.RemoveFavorite = function(param){
	var data = {
		userID: param.user._id.toString(),
		datasetID: param.dataset
	};
	Favorite.deleteOne(data,function(err){
		if(err){
			console.log(err);
			return param.failFunc({err:"remove favorite fail"});
		}
		param.succFunc(data);
	});
};

favoriteController.ListFavorite = function(param){
	var query = {};
	if(param.user){
		query.userID = param.user._id.toString();
	}
	if(param.dataset){
		query.datasetID = param.dataset;
	}
	Favorite.find(query,function(err, favorite){
		if(err){
			console.log(err);
			return param.failFunc({err:"list favorite fail"});
		}
		param.succFunc(favorite);
	});
};

module.exports = favoriteController;