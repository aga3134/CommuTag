var passport = require("passport");
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
var Config = require('../../config');
var emailer = require("./emailer");
var util = require("./util");
var User = require("../db/user");


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
	User.create(newUser, function(err, user){
		if(err) return console.log(err);
		emailer.SendSignupConfirmEmail(user);
		if(done) return done(null,user);
	});
}

passport.serializeUser(function(user, done) {
	done(null,user._id);
});

passport.deserializeUser(function(id, done) {
	User.findOne({_id:id}, {"__v":0,"password":0,"oauthID":0},function(err, user){
		done(null,user);
    });
});

passport.use(new FacebookStrategy({
	clientID        : Config.facebookAuth.clientID,
	clientSecret    : Config.facebookAuth.clientSecret,
	callbackURL     : Config.facebookAuth.callbackURL,
	profileFields: ['id', 'email', 'name']},
	function(token, refreshToken, profile, done) {
		User.findOne({"provider": "facebook", "oauthID": profile.id},function(err, user) {
			if(err) console.log(err);
			if(user) {
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
		User.findOne({"provider": "google", "oauthID": profile.id},function(err, user){
			if(err) console.log(err);
			if(user){
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
		User.findOne({"provider": "local", "signupEmail": email},function(err, user) {
			if(err) console.log(err);
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

	User.findOne({"provider": "local", "signupEmail": email},function(err, user) {
		if(err) console.log(err);
		if(user) res.redirect('/login?message='+encodeURIComponent('帳號已存在'));
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
	User.findOne({"provider": "local", "signupEmail": email},function(err, user) {
		if(err) console.log(err);
		if(user){
			var token = jwt.sign({id: user.id, email: user.signupEmail}, Config.jwt.secret, {
				expiresIn: "1h"
			});
			if(Config.elasticEmail.enable){
				emailer.SendResetPasswordEmail(user,token);
				res.json({status: "ok", message: 'reset password email sent'});
			}
			else{
				res.json({status: "fail", message: 'send email not enabled'});
			}
		}
	});
}

auth.ResetPassword = function(req, res, next){
	var password = req.body.password;
	var token = req.body.token;
	jwt.verify(token, Config.jwt.secret, function (err, decoded) {
		if(err){
			return res.json({status: "fail", message: 'invalid token'});
		}
		else {
			User.findOne({_id: decoded.id},function(err, user){
				if(err) console.log(err);
				if(!user) return res.json({status: "fail", message: 'reset password fail'});
				else{
					var hash = bcrypt.hashSync(password, saltRounds);
					User.updateOne({_id: decoded.id}, {password: hash}, function(){
						res.json({status: "ok", message: 'reset password ok'});
					});
				}
			});
		}
	});
}

auth.ChangePassword = function(req, res, next){
	var oldPassword = req.body.data.oldPassword;
	var newPassword = req.body.data.newPassword;
	User.findOne({_id: req.user._id},function(err, user){
		if(err) console.log(err);
		if(!user) return res.json({status: "fail", message: 'user not found'});
		else{
			if(user.provider != "local") return res.json({status: "fail", message: 'not local user'});
			bcrypt.compare(oldPassword, user.password, function(err, result) {
				if(err){
					console.log(err);
					res.json({status: "fail", message: 'invalid password'});
				}
				if(result){
					var hash = bcrypt.hashSync(newPassword, saltRounds);
					User.updateOne({_id: user._id}, {password: hash}, function(){
						res.json({status: "ok", message: 'change password ok'});
					});
				}
				else return res.json({status: "fail", message: 'password not match'});
			});
		}
	});
}

module.exports = auth;