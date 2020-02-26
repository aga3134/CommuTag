var express = require("express");
var router = express.Router();
var apiController = require("../controller/apiController");
var util = require("../controller/util");
var Config = require("../../config.json");

module.exports = router;

router.post('/add-key', util.CheckAdmin,util.CSRF, function(req, res){
	var param = {};
	param.key = req.body.key;
	param.desc = req.body.desc;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	apiController.AddKey(param);
});

router.post('/delete-key', util.CheckAdmin,util.CSRF, function(req, res){
	var param = {};
	param.id = req.body.id;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	apiController.DeleteKey(param);
});

router.get('/list-key', util.CheckAdmin, function(req, res){
	var param = {};
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	apiController.ListKey(param);
});