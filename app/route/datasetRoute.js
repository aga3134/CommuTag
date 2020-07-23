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

router.post('/update-dataset', util.CheckMaster,util.CSRF, function(req, res){
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
		upload.DeletePath("static/upload/dataset/"+param.id+"/", function(){
			res.status(200).json({"status":"ok","data": result});
		});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	datasetController.DeleteDataset(param);
});

router.get('/list-dataset', function(req, res) {
	var param = {};
	param.user = req.user;
	param.page = req.query.page;
	param.sort = req.query.sort;
	param.orderType = req.query.orderType;
	param.enableUpload = req.query.enableUpload;
	param.enableAnnotation = req.query.enableAnnotation;
	param.favorite = req.query.favorite;
	param.keyword = req.query.keyword;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	datasetController.ListDataset(param);
});

router.get('/list-dataset-by-id', util.CheckAdmin, function(req, res) {
	var param = {};
	param.id = req.query.id;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	datasetController.ListDatasetByID(param);
});

router.get('/view-dataset', function(req, res) {
	var param = {};
	param.user = req.user;
	param.id = req.query.id;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	datasetController.ViewDataset(param);
});

router.get('/view-image', function(req, res) {
	var param = {};
	param.user = req.user;
	param.dataset = req.query.dataset;
	param.image = req.query.image;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	datasetController.ViewImage(param);
});

router.post('/change-cover', util.CheckMaster, util.CSRF, upload.UploadImageToMem, function(req, res){	
	var param = {};
	param.id = req.body.dataset;
	var newPath = "/static/upload/dataset/"+req.body.dataset+"/";
	var newName = "cover.jpg";
	param.picCover = newPath+newName;
	param.succFunc = function(result){
		var imageParam = {};
		imageParam.newPath = newPath;
		imageParam.newName = newName;
		imageParam.encode = "base64";
		imageParam.content = req.body.uploadImage.replace(/^data:image\/jpeg;base64,/, "");
		imageParam.succFunc = function(result){
			res.status(200).json({status: "ok", "data": result});
		};
		imageParam.failFunc = function(result){
			res.status(200).json({status: "fail", message: result.err});
		};
		upload.SaveFile(imageParam);
	}
	param.failFunc = function(result){
		res.status(200).json({status: "fail", message: result.err});
	}
	datasetController.ChangeCover(param);

});

router.post('/upload-image',util.CheckLogin,util.CheckBlacklist,util.CSRF, upload.UploadImageToMem, function(req, res){	
	var param = {};
	param.user = req.user;
	param.dataset = req.body.dataset;
	param.lat = req.body.lat;
	param.lng = req.body.lng;
	param.remark = req.body.remark;
	param.dataTime = req.body.dataTime;
	param.formReply = JSON.parse(req.body.formReply);
	param.succFunc = function(result){
		var imageParam = {};
		imageParam.newPath = "/static/upload/dataset/"+req.body.dataset+"/image/";
		imageParam.newName = result._id+".jpg";
		imageParam.encode = "base64";
		imageParam.content = req.body.uploadImage.replace(/^data:image\/jpeg;base64,/, "");
		imageParam.succFunc = function(result){
			res.status(200).json({status: "ok", "data": result});
		}
		imageParam.failFunc = function(result){
			res.status(200).json({status: "fail", message: result.err});
		}
		upload.SaveFile(imageParam);
	};
	param.failFunc = function(result){
		res.status(200).json({status: "fail", message: result.err});
	};
	datasetController.UploadImage(param);
});

router.get('/list-image', function(req, res) {
	var param = {};
	param.user = req.user;
	param.dataset = req.query.dataset;
	param.page = req.query.page;
	param.all = req.query.all;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	datasetController.ListImage(param);
});

router.post('/update-image-info', util.CheckMaster, util.CSRF, function(req, res) {
	var param = {};
	param.dataset = req.body.dataset;
	param.image = req.body.image;
	param.dataTime = req.body.dataTime;
	param.remark = req.body.remark;
	param.lat = req.body.lat;
	param.lng = req.body.lng;
	param.formReply = req.body.formReply;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	datasetController.UpdateImageInfo(param);
});

router.post('/delete-image', util.CheckMaster, util.CSRF, function(req, res) {
	var param = {};
	param.dataset = req.body.dataset;
	param.image = req.body.image;
	param.succFunc = function(result){
		upload.DeletePath("static/upload/dataset/"+param.dataset+"/image/"+param.image+".jpg", function(){
			res.status(200).json({"status":"ok","data": result});
		});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	datasetController.DeleteImage(param);
});

router.get('/list-image-for-annotation', function(req, res) {
	var param = {};
	param.user = req.user;
	param.dataset = req.query.dataset;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	datasetController.ListImageForAnnotation(param);
});

router.post('/set-annotation',util.CheckLogin,util.CheckBlacklist,util.CSRF, function(req, res){
	var param = {};
	param.user = req.user;
	param.dataset = req.body.dataset;
	param.image = req.body.image;
	param.annotation = req.body.annotation;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	datasetController.SetAnnotation(param);
});

router.post('/add-verification',util.CheckLogin,util.CheckBlacklist,util.CSRF, function(req, res){
	var param = {};
	param.user = req.user;
	param.dataset = req.body.dataset;
	param.image = req.body.image;
	param.agree = req.body.agree;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	datasetController.AddVerification(param);
});

router.get('/verify-condition', function(req, res) {
	res.status(200).json({"status":"ok","data": Config.verify});
});

router.post('/batch-download',util.CheckLogin,util.CheckBlacklist,util.CSRF, function(req, res){
	var param = {};
	param.user = req.user;
	param.dataset = req.body.dataset;
	param.filter = req.body.filter;
	param.format = req.body.format;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	datasetController.BatchDownload(param);
});