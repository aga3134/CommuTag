var express = require("express");
var router = express.Router();
var userController = require("../controller/userController");
var util = require("../controller/util");
var Config = require("../../config.json");
var upload = require("../controller/upload");

module.exports = router;

var meta = {};
meta.version = Config.version;
meta.hostname = Config.hostname;

router.get('/info', util.CheckLogin, function(req, res) {
	res.status(200).json({"status":"ok","data": req.user});
});

router.get('/list-user', util.CheckAdmin, function(req, res) {
	var param = {};
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	adminController.ListUser(param);
});

router.post('/edit', util.CheckLogin, util.CSRF, function(req, res) {
	var param = {};
	param.userID = req.user.id;
	param.body = req.body.data;
	param.succFunc = function(result){
		res.status(200).json({"status": "ok", "data": result});
	};
	param.failFunc = function(result){
		console.log(result);
		res.status(200).json({status: "fail", message: result.err});
	};
	userController.EditUserInfo(param);
});

router.post('/upload-image', util.CheckLogin, util.CSRF, upload.UploadImageToMem, function(req, res){
	var param = {};
	var ext = upload.GetImageType(req.file);
	param.buffer = req.file.buffer;
	param.newPath = "/static/upload/user/"+req.user.id+"/";
	param.newName = "photo."+ext;
	param.thumb = {name:"icon."+ext,w:64,h:64};
	param.succFunc = function(result){
		var photoInfo = {};
		photoInfo.userID = req.user._id;
		photoInfo.photo = result.newName;
		photoInfo.icon = result.thumbName;
		photoInfo.succFunc = function(result){
			res.status(200).json({status: "ok", "data": result});
		};
		photoInfo.failFunc = function(result){
			console.log(result);
			res.status(200).json({status: "fail", message: result.err});
		};
		userController.ChangeUserPhoto(photoInfo);
	};
	param.failFunc = function(result){
		console.log(result);
		res.status(200).json({status: "fail", message: result.err});
	}
	upload.SaveImage(param);
});