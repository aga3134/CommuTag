var Config = require('../../config');
var util = require("./util");
var User = require('../db/user');

var userController = {};

userController.EditUserInfo = function(param){
	var modify = {};
	modify.name = param.body.name;
	modify.contactEmail = param.body.contactEmail;

	User.updateOne({"_id": param.userID}, modify, function(err, result) {
		if(err){
			console.log(err);
			return param.failFunc({"err": "edit user info fail"});
		}
	    param.succFunc(modify);
	});
};

userController.ChangeUserPhoto = function(param){
	var randomStr = "?rand="+Math.floor(Math.random()*100);
	var modify = {};
	modify.photo = param.photo+randomStr;
	modify.icon = param.icon+randomStr;
	User.updateOne({"_id": param.userID}, modify, function(err, result) {
		if(err){
			console.log(err);
			return param.failFunc({"err": "change user photo fail"});
		}
		param.succFunc(modify);
	});
};

userController.ListUser = function(param){
	var query = {};
	if(param.keyword){
		query["$or"] = [
			{"name":{$regex: ".*"+param.keyword+".*"}},
			{"contactEmail":{$regex: ".*"+param.keyword+".*"}},
		];
		if(mongoose.Types.ObjectId.isValid(param.keyword)){
			query["$or"].push({"_id":mongoose.Types.ObjectId(param.keyword)});
		}
	}
	var limit = 8;
	var skip = (param.page||0)*limit;
	User.find(query,{"__v":0,"password":0,"oauthID":0},{limit:limit+1, skip:skip},function(err, user) {
		if(err){
			console.log(err);
			return param.failFunc({err:"list user fail"});
		}
		var result = {};
		if(user.length > limit){
			result.hasMore = true;
			result.user = user.slice(0,-1);
		}
		else{
			result.hasMore = false;
			result.user = user;
		}
		param.succFunc(result);
	});
};

userController.UpdateAuth = function(param){
	User.updateOne({_id: param.id},{authType: param.authType},function(err, user){
		if(err){
			console.log(err);
			return param.failFunc({err:"update auth fail"});
		}
		param.succFunc({email: param.email});
	});
};

module.exports = userController;