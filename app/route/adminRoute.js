var express = require("express");
var router = express.Router();
var adminController = require("../controller/adminController");
var datasetController = require("../controller/datasetController");
var util = require("../controller/util");
var Config = require("../../config.json");

module.exports = router;

var meta = {};
meta.version = Config.version;
meta.hostname = Config.hostname;

router.post('/update-auth', util.CheckAdmin,util.CSRF, function(req, res){
	var param = {};
	param.email = req.body.email;
	param.authType = req.body.authType;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	adminController.UpdateAuth(param);
});
