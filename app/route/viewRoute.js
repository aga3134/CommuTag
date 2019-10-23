var express = require("express");
var router = express.Router();
var Config = require("../../config.json");
var util = require("../controller/util");

var meta = {};
meta.version = Config.version;
meta.hostname = Config.hostname;

router.get('/', util.CheckLogin, util.CSRF, function(req, res) {
	meta.title = Config.siteName;
	meta.desc = Config.desc;
	meta.path = req.originalUrl;
	meta.csrfToken = req.csrfToken();
	meta.warnPassword = req.user.password?0:1;
	res.render("index.ejs",{meta: meta, user:req.user});
});

router.get('/admin', util.CheckAdmin, util.CSRF, function(req, res) {
	meta.title = Config.siteName;
	meta.desc = Config.desc;
	meta.path = req.originalUrl;
	meta.csrfToken = req.csrfToken();
	res.render("admin.ejs",{meta: meta, user:req.user});
});

router.get('/login', util.CSRF, function(req, res) {
	meta.title = Config.siteName;
	meta.desc = Config.desc;
	meta.path = req.originalUrl;
	meta.csrfToken = req.csrfToken();
	res.render("login.ejs",{meta: meta, user:req.user});
});

module.exports = router;