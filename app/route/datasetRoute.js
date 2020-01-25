var express = require("express");
var router = express.Router();
var datasetController = require("../controller/datasetController");
var util = require("../controller/util");
var Config = require("../../config.json");
var upload = require("../controller/upload");

module.exports = router;

var meta = {};
meta.version = Config.version;
meta.hostname = Config.hostname;

router.post('/create-dataset', util.CheckAdmin,util.CSRF, function(req, res){
	var param = {};
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	datasetController.CreateDataset(param);
});

router.post('/update-dataset', util.CheckAdmin,util.CSRF, function(req, res){
	var param = {};
	param.info = req.body.info;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	datasetController.UpdateDataset(param);
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

router.post('/change-cover', util.CheckAdmin, util.CSRF, upload.UploadImageToMem, function(req, res){	
	var param = {};
	param.newPath = "/static/upload/dataset/"+req.query.dataset+"/";
	param.newName = "cover.jpg";
	param.encode = "base64";
	param.content = req.body.uploadImage.replace(/^data:image\/jpeg;base64,/, "");
	param.succFunc = function(result){
		//update dataset info
		var coverInfo = {};
		coverInfo.id = req.query.dataset;
		coverInfo.picCover = param.newPath+param.newName;
		coverInfo.succFunc = function(result){
			res.status(200).json({status: "ok", "data": result});
		}
		coverInfo.failFunc = function(result){
			res.status(200).json({status: "fail", message: result.err});
		}
		datasetController.ChangeCover(coverInfo);
	};
	param.failFunc = function(result){
		res.status(200).json({status: "fail", message: result.err});
	};
	upload.SaveFile(param);
});