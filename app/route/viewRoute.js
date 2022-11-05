var express = require("express");
var router = express.Router();
var Config = require("../../config.json");
var util = require("../controller/util");

var meta = {};
meta.version = Config.version;
meta.hostname = Config.hostname;
meta.logo = Config.logo;
meta.ga = Config.googleAnalytics.id;

router.get('/', util.CSRF, function(req, res) {
	meta.title = Config.siteName;
	meta.desc = Config.desc;
	meta.path = req.originalUrl;
	meta.ogImage = meta.logo;
	meta.csrfToken = req.csrfToken();
	res.render("index.ejs",{meta: meta, user:req.user,mode:Config.mode});
});

router.get('/login', util.CSRF, function(req, res) {
	meta.title = Config.siteName;
	meta.desc = Config.desc;
	meta.path = req.originalUrl;
	meta.ogImage = meta.logo;
	meta.csrfToken = req.csrfToken();
	res.render("login.ejs",{meta: meta, user:req.user,mode:Config.mode});
});

router.get('/account', util.CheckLogin, util.CSRF, function(req, res) {
	meta.title = Config.siteName;
	meta.desc = Config.desc;
	meta.path = req.originalUrl;
	meta.ogImage = meta.logo;
	meta.csrfToken = req.csrfToken();
	res.render("account.ejs",{meta: meta, user:req.user,mode:Config.mode});
});

router.get('/dataset', util.CSRF, function(req, res) {
	meta.title = Config.siteName;
	meta.desc = Config.desc;
	meta.path = req.originalUrl;
	meta.ogImage = meta.logo;
	if(req.query.id){
		meta.ogImage = "/static/upload/dataset/"+req.query.id+"/cover.jpg";
	}
	meta.csrfToken = req.csrfToken();
	res.render("dataset-view.ejs",{meta: meta, user:req.user,mode:Config.mode});
});

router.get('/image', util.CSRF, function(req, res) {
	meta.title = Config.siteName;
	meta.desc = Config.desc;
	meta.path = req.originalUrl;
	meta.ogImage = meta.logo;
	if(req.query.dataset && req.query.image){
		meta.ogImage = "/static/upload/dataset/"+req.query.dataset+"/image/"+req.query.image+".jpg";
	}
	meta.csrfToken = req.csrfToken();
	res.render("image-view.ejs",{meta: meta, user:req.user,mode:Config.mode});
});

router.get('/statistic', util.CSRF, function(req, res) {
	meta.title = Config.siteName;
	meta.desc = Config.desc;
	meta.path = req.originalUrl;
	meta.ogImage = meta.logo;
	if(req.query.id){
		meta.ogImage = "/static/upload/dataset/"+req.query.id+"/cover.jpg";
	}
	meta.csrfToken = req.csrfToken();
	res.render("statistic.ejs",{meta: meta, user:req.user,mode:Config.mode});
});

router.get('/site-info', function(req, res) {
	var info = {
		title: Config.siteName,
		host: Config.hostname,
		desc: Config.desc,
		logo: Config.logo
	};
	res.status(200).json({"status":"ok","data": info});
});

module.exports = router;