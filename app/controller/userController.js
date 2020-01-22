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
	console.log(param);
	User.updateOne({"_id": param.userID}, modify, function(err, result) {
		if(err){
			console.log(err);
			return param.failFunc({"err": "change user photo fail"});
		}
		param.succFunc(modify);
	});
};

module.exports = userController;