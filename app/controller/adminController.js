var Config = require('../../config');
var emailer = require("./emailer");
var util = require("./util");
var fs = require("fs-extra");
var async = require('async');
var dayjs = require("dayjs");
var User = require('../db/user');

var admin = {};

admin.ListUser = function(param){
	User.find({},{"_id":0,"__v":0,"password":0,"oauthID":0},function(err, user) {
		if(err){
			console.log(err);
			return param.failFunc({err:"list user fail"});
		}
		param.succFunc(user);
	});
};

admin.DeleteUser = function(param){
	User.deleteOne({_id: param.id},function(err) {
		if(err){
			console.log(err);
			return param.failFunc({err:"delete user fail"});
		}
		param.succFunc({"email":param.email});
	});
};

admin.UpdateAuth = function(param){
	User.updateOne({_id: param.id},{authType: param.authType},function(err, user){
		if(err){
			console.log(err);
			return param.failFunc({err:"update auth fail"});
		}
		param.succFunc({email: param.email});
	});
};

module.exports = admin;