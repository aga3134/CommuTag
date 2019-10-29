var passport = require("passport");
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
var Config = require('../../config');
var DB = require("../db/db");
var emailer = require("./emailer");
var util = require("./util");


//==========================passport strategy============================
function CreateUser(provider, profile, done){
	var newUser = {};
	newUser.provider = provider;
	if(profile.id) newUser.oauthID = profile.id;
	if(profile.emails){
		var email = profile.emails[0].value;
		newUser.signupEmail = email;
		newUser.contactEmail = email;
	}
	if(profile.password) newUser.password = profile.password;
	if(profile.name){
		var name = profile.name.givenName + ' ' + profile.name.familyName;
		newUser.signupName = name;
		newUser.name = name;
	}
	if(profile.signupName){
		newUser.signupName = profile.signupName;
		newUser.name = profile.signupName;
	}
	if(Config.defaultAdmin){
		if(Config.defaultAdmin.provider == provider && 
			Config.defaultAdmin.email == newUser.signupEmail){
			newUser.authType = "admin";
		}
	}
	newUser.photo = "/static/image/user-default.png";
	newUser.icon = "/static/image/user-default-icon.png";

	DB.User.create(newUser).then(function(user) {
		emailer.SendSignupConfirmEmail(user);
		if(done) return done(null,user);
	});
}

passport.serializeUser(function(user, done) {
	done(null,user.id);
});

passport.deserializeUser(function(id, done) {
	DB.User.findOne({where: {id:id}}).then(function(user){
		done(null,user);
    });
});

passport.use(new FacebookStrategy({
	clientID        : Config.facebookAuth.clientID,
	clientSecret    : Config.facebookAuth.clientSecret,
	callbackURL     : Config.facebookAuth.callbackURL,
	profileFields: ['id', 'email', 'name']},
	function(token, refreshToken, profile, done) {
		DB.User.findOne({where: {"provider": "facebook", "oauthID": profile.id}})
		.then(function(user) {
			if (user) {
				return done(null,user);
			}
			else CreateUser("facebook",profile,done);
		});
	}
));

passport.use(new GoogleStrategy({
    clientID        : Config.googleAuth.clientID,
    clientSecret    : Config.googleAuth.clientSecret,
    callbackURL     : Config.googleAuth.callbackURL},
    function(token, refreshToken, profile, done) {
		DB.User.findOne({where: {"provider": "google", "oauthID": profile.id}})
		.then(function(user) {
			if (user) {
				return done(null,user);
			}
			else CreateUser("google",profile,done);
		});
	}
));

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"},
	function(email, password, done) {
		DB.User.findOne({where: {"provider": "local", "signupEmail": email}})
		.then(function(user) {
			if(user) {
				bcrypt.compare(password, user.password, function(err, result) {
					if(result) return done(null,user);
					else return done(null, false);
				});
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

auth.Signup = function(req, res, next){
	var email = req.body.email;
	var password = req.body.password;
	var name = req.body.name;

	DB.User.findOne({where: {"provider": "local", "signupEmail": email}})
	.then(function(user) {
		if(user) res.redirect('/auth/login?message='+encodeURIComponent('帳號已存在'));
		else{
			var profile = {};
			profile.emails = [{value: email}];
			profile.password = bcrypt.hashSync(password, saltRounds);
			profile.signupName = name;
			CreateUser("local",profile,function(err,user){
				//直接login
				req.login(user, function(err) {
					if(err) return next(err);
					return res.redirect(util.RetrieveIntentUrl(req));
				});
			});
		}
	});
}

auth.ForgetPassword = function(req, res, next){
	var email = req.body.email;
	DB.User.findOne({where: {"provider": "local", "signupEmail": email}})
	.then(function(user) {
		if(user){
			var token = jwt.sign({id: user.id, email: user.signupEmail}, Config.jwt.secret, {
				expiresIn: "1h"
			});
			emailer.SendResetPasswordEmail(user,token);
			res.json({status: "ok", message: 'reset password email sent'});
		}
	});
}

auth.ResetPassword = function(req, res, next){
	var password = req.body.password;
	var token = req.body.token;
	jwt.verify(token, Config.jwt.secret, function (err, decoded) {
		if (err) {
			return res.json({status: "fail", message: 'invalid token'});
		}
		else {
			var query = {id: decoded.id};
			DB.User.findOne({where: query}).then(function(user){
				if(!user) return res.json({status: "fail", message: 'reset password fail'});
				else{
					var hash = bcrypt.hashSync(password, saltRounds);
					DB.User.update({password: hash}, {where: query}).then(function(){
						res.json({status: "ok", message: 'reset password ok'});
					});
				}
			});
		}
	});
}

module.exports = auth;