var Config = require('../../config');
var DB = require("../db/db");
var emailer = require("./emailer");
var util = require("./util");
var fs = require("fs-extra");
var async = require('async');
var dayjs = require("dayjs");

var admin = {};

admin.ListUser = function(param){
	DB.User.findAll({
		where: {},
		attribute: ["email","authType"],
		order: ['createdAt']
	})
	.then(function(user) {
		param.succFunc(user);
	});
};

admin.DeleteUser = function(param){
	DB.User.destroy({
		where: {email: param.email}
	})
	.then(function(result) {
		param.succFunc(result);
	});
};

admin.CreateUser = function(param){
	if(!param.email || !param.initPwd) return param.failFunc({err: "not enough info"});
	var newUser = {};
	newUser.email = param.email;
	newUser.initPwd = param.initPwd;
	
	DB.User.findOne({where: {"email": newUser.email}})
	.then(function(user) {
		if(user) return param.failFunc({err: "account exist"});
		else{
			DB.User.create(newUser).then(function(user) {
				emailer.SendCreateNotifyEmail(user);
				return param.succFunc({email: user.email});
			});
		}
	});
};

admin.UpdateAuth = function(param){
	var email = param.email;
	var authType = param.authType;
	DB.User.update(
		{authType: authType},
		{where: {email: email}}
	).then(function(user){
		param.succFunc({email: user.email});
	});
};

module.exports = admin;