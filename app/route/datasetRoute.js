var express = require("express");
var router = express.Router();
var datasetController = require("../controller/datasetController");
var util = require("../controller/util");
var Config = require("../../config.json");

module.exports = router;

var meta = {};
meta.version = Config.version;
meta.hostname = Config.hostname;

router.post('/create-dataset', util.CheckAdmin,util.CSRF, function(req, res){
	var param = {};
	param.info = req.body.info;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	datasetController.CreateDataset(param);
});

router.post('/delete-dataset', util.CheckAdmin,util.CSRF, function(req, res){
	var param = {};
	param.id = req.body.id;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	datasetController.DeleteDataset(param);
});

router.get('/list-dataset', function(req, res) {
	var param = {};
	param.page = req.query.page;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	datasetController.ListDataset(param);
});