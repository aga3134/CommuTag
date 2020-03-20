var express = require("express");
var router = express.Router();
var Config = require("../../config.json");
var util = require("../controller/util");

var meta = {};
meta.version = Config.version;
meta.hostname = Config.hostname;

router.get('/', util.CSRF, function(req, res) {
	meta.title = Config.siteName;
	meta.desc = Config.desc;
	meta.path = req.originalUrl;
	meta.csrfToken = req.csrfToken();
	res.render("index.ejs",{meta: meta, user:req.user,mode:Config.mode});
});

router.get('/login', util.CSRF, function(req, res) {
	meta.title = Config.siteName;
	meta.desc = Config.desc;
	meta.path = req.originalUrl;
	meta.csrfToken = req.csrfToken();
	res.render("login.ejs",{meta: meta, user:req.user,mode:Config.mode});
});

router.get('/account', util.CheckLogin, util.CSRF, function(req, res) {
	meta.title = Config.siteName;
	meta.desc = Config.desc;
	meta.path = req.originalUrl;
	meta.csrfToken = req.csrfToken();
	res.render("account.ejs",{meta: meta, user:req.user,mode:Config.mode});
});

router.get('/view', util.CSRF, function(req, res) {
	meta.title = Config.siteName;
	meta.desc = Config.desc;
	meta.path = req.originalUrl;
	meta.csrfToken = req.csrfToken();
	res.render("view.ejs",{meta: meta, user:req.user,mode:Config.mode});
});

router.get('/statistic', util.CSRF, function(req, res) {
	meta.title = Config.siteName;
	meta.desc = Config.desc;
	meta.path = req.originalUrl;
	meta.csrfToken = req.csrfToken();
	res.render("statistic.ejs",{meta: meta, user:req.user,mode:Config.mode});
});

router.get('/site-info', function(req, res) {
	var info = {
		title: Config.siteName,
		host: Config.hostname,
		desc: Config.desc
	};
	res.status(200).json({"status":"ok","data": info});
});

module.exports = router;