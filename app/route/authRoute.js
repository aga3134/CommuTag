var passport = require("passport");
var express = require("express");
var ejs = require("ejs");
var router = express.Router();
var Config = require("../../config.json");
var util = require("../controller/util");
var auth = require("../controller/auth");

router.get('/login-by-facebook', util.StoreIntentUrl, passport.authenticate("facebook",{scope : 'email'}));

router.get('/facebook/callback', function(req, res, next) {
	passport.authenticate("facebook", {
		successRedirect : util.RetrieveIntentUrl(req),
		failureRedirect : '/login?message='+encodeURIComponent('登入失敗')
	})(req, res, next);
});

router.get('/login-by-google', util.StoreIntentUrl, passport.authenticate("google",{scope : ['profile', 'email'], "prompt": "select_account" }));

router.get('/google/callback', function(req, res, next) {
	passport.authenticate("google", {
		successRedirect : util.RetrieveIntentUrl(req),
		failureRedirect : '/login?message='+encodeURIComponent('登入失敗')
	})(req, res, next);
});

router.post('/login-by-password', util.StoreIntentUrl, function(req, res, next){
	console.log(req);
	passport.authenticate("local", {
		successRedirect : util.RetrieveIntentUrl(req),
		failureRedirect : '/login?message='+encodeURIComponent('登入失敗')
	})(req, res, next);
});

router.post('/signup-by-password', util.StoreIntentUrl, auth.Signup);

router.post('/forget-password', auth.ForgetPassword);

router.post('/reset-password', auth.ResetPassword);

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;