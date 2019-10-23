var express = require("express");
var router = express.Router();
var authController = require("../controller/authController");
var util = require("../controller/util");
var Config = require("../../config.json");
var passport = require("passport");

module.exports = router;

var meta = {};
meta.version = Config.version;
meta.hostname = Config.hostname;

router.get('/login', util.CSRF, function(req, res) {
	meta.title = Config.siteName;
	meta.desc = Config.desc;
	meta.path = req.originalUrl;
	meta.csrfToken = req.csrfToken();
	res.render("login.ejs",{meta: meta, user:req.user});
});

router.post('/login-by-password',util.CSRF, function(req, res, next){
	passport.authenticate("local", {
		successRedirect : "/",
		failureRedirect : '/auth/login?message='+encodeURIComponent('登入失敗')
	})(req, res, next);
});

router.post('/forget-password',util.CSRF, function(req, res){
	var param = {};
	param.email = req.body.email;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	authController.ForgetPassword(param);
});

router.post('/update-password',util.CSRF, function(req, res){
	var param = {};
	param.email = req.user.email;
	param.oriPwd = req.body.oriPwd;
	param.newPwd = req.body.newPwd;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	authController.UpdatePassword(param);
});

router.post('/reset-password',util.CSRF, function(req, res){
	var param = {};
	param.password = req.body.password;
	param.token = req.body.token;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	authController.ResetPassword(param);
});

router.get('/logout',util.CSRF, function(req, res) {
    req.logout();
    res.redirect('/');
});