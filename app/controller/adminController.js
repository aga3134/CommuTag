var Config = require('../../config');
var util = require("./util");
var User = require("../db/user");

var adminController = {};

adminController.ListUser = function(param){
	User.find({},{"_id":0,"__v":0,"password":0,"oauthID":0},function(err, user) {
		if(err){
			console.log(err);
			return param.failFunc({err:"list user fail"});
		}
		param.succFunc(user);
	});
};

adminController.UpdateAuth = function(param){
	User.updateOne({_id: param.id},{authType: param.authType},function(err, user){
		if(err){
			console.log(err);
			return param.failFunc({err:"update auth fail"});
		}
		param.succFunc({email: param.email});
	});
};

module.exports = adminController;