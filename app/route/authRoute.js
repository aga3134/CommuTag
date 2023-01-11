var passport = require("passport");
var express = require("express");
var ejs = require("ejs");
var router = express.Router();
var Config = require("../../config.json");
var util = require("../controller/util");
var auth = require("../controller/auth");

router.get('/method', function(req, res) {
	var data = {
		"google":Config.googleAuth.enable,
		"facebook":Config.facebookAuth.enable,
		"local":true
	};
	res.status(200).json({"status":"ok","data": data});
});

if(Config.facebookAuth.enable){
	router.get('/login-by-facebook', util.StoreIntentUrl, passport.authenticate("facebook",{scope : 'email'}));

	router.get('/facebook/callback', function(req, res, next) {
		passport.authenticate("facebook", {
			successRedirect : util.RetrieveIntentUrl(req),
			failureRedirect : '/login?message='+encodeURIComponent('登入失敗')
		})(req, res, next);
	});
}

if(Config.googleAuth.enable){
	router.get('/login-by-google', util.StoreIntentUrl, passport.authenticate("google",{scope : ['profile', 'email'], "prompt": "select_account" }));

	router.get('/google/callback', function(req, res, next) {
		passport.authenticate("google", {
			successRedirect : util.RetrieveIntentUrl(req),
			failureRedirect : '/login?message='+encodeURIComponent('登入失敗')
		})(req, res, next);
	});
}

router.post('/login-by-password', util.StoreIntentUrl, function(req, res, next){
	passport.authenticate("local", {
		successRedirect : util.RetrieveIntentUrl(req),
		failureRedirect : '/login?message='+encodeURIComponent('登入失敗')
	})(req, res, next);
});

router.post('/signup-by-password', util.StoreIntentUrl, auth.Signup);

router.post('/forget-password', auth.ForgetPassword);

router.post('/reset-password', auth.ResetPassword);

router.post('/change-password', auth.ChangePassword);

router.get('/logout', function(req, res) {
	req.logout(function(err) {
		if (err) { return console.log(err); }
		res.redirect('/');
	});
});

module.exports = router;