var express = require("express");
var router = express.Router();
var apiController = require("../controller/apiController");
var util = require("../controller/util");
var Config = require("../../config.json");
var upload = require("../controller/upload");

module.exports = router;

router.post('/add-key', util.CheckAdmin,util.CSRF, function(req, res){
	var param = {};
	param.key = req.body.key;
	param.desc = req.body.desc;
	param.scope = req.body.scope||"all";
	param.dataset = req.body.dataset||[];
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

router.post('/upload-image', upload.UploadImageToMem, function(req, res){
	var param = {};
	param.dataset = req.body.dataset;
	param.lat = req.body.lat;
	param.lng = req.body.lng;
	param.remark = req.body.remark;
	param.dataTime = req.body.dataTime;
	if(req.body.formReply){
		param.formReply = JSON.parse(req.body.formReply);
	}
	param.apiKey = req.body.apiKey;

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
	apiController.UploadImage(param);
});

router.post('/set-annotation', function(req, res){
	var param = {};
	param.dataset = req.body.dataset;
	param.image = req.body.image;
	param.annotation = req.body.annotation;
	param.apiKey = req.body.apiKey;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	apiController.SetAnnotation(param);
});