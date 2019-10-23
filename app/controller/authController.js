var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
var Config = require('../../config');
var DB = require("../db/db");
var emailer = require("./emailer");
var util = require("./util");


//==========================passport strategy============================
passport.serializeUser(function(user, done) {
	done(null,user.email);
});

passport.deserializeUser(function(email, done) {
	DB.User.findOne({where: {email:email}}).then(function(user){
		done(null,user);
    });
});

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"},
	function(email, password, done) {
		DB.User.findOne({where: {"email": email}})
		.then(function(user) {
			if(user) {
				if(!user.password){	//first login
					if(user.initPwd == password) return done(null,user);
					else return done(null, false);
				}
				else{
					bcrypt.compare(password, user.password, function(err, result) {
						if(result) return done(null,user);
						else return done(null, false);
					});
				}
			}
			else{
				return done(null,false);
			}
		});
	}
));

//==========================auth function============================
const saltRounds = 10;

var auth = {};

auth.ForgetPassword = function(param){
	var email = param.email;
	DB.User.findOne({where: {"email": email}}).then(function(user) {
		if(user){
			var token = jwt.sign({email: user.email}, Config.jwt.secret, {
				expiresIn: "1h"
			});
			emailer.SendResetPasswordEmail(user,token);
			return param.succFunc({email: user.email});
		}
		else return param.failFunc({err: "user not found"});
	});
}

auth.UpdatePassword = function(param){
	var email = param.email;
	var oriPwd = param.oriPwd;
	var newPwd = param.newPwd;
	var query = {email: email};
	DB.User.findOne({where: query}).then(function(user){
		if(!user) return param.failFunc({err: "user not found"});
		else{
			function UpdatePwd(){
				var newHash = bcrypt.hashSync(newPwd, saltRounds);
				DB.User.update({password: newHash}, {where: query}).then(function(){
					param.succFunc({email: user.email});
				});
			}

			if(user.password){
				bcrypt.compare(oriPwd, user.password, function(err, result) {
					if(result) UpdatePwd();
					else return param.failFunc({err: "password not match"});
				});
			}
			else{
				if(oriPwd == user.initPwd) UpdatePwd();
				else param.failFunc({err: "password not match"});
			}
			
		}
	});
}

auth.ResetPassword = function(param){
	var password = param.password;
	var token = param.token;
	jwt.verify(token, Config.jwt.secret, function (err, decoded) {
		if(err) {
			return param.failFunc({err: "invalid token"});
		}
		else {
			var query = {email: decoded.email};
			DB.User.findOne({where: query}).then(function(user){
				if(!user) return param.failFunc({err: "user not found"});
				else{
					var hash = bcrypt.hashSync(password, saltRounds);
					DB.User.update({password: hash}, {where: query}).then(function(){
						param.succFunc({email: user.email});
					});
				}
			});
		}
	});
}

module.exports = auth;