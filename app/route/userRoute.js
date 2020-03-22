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

router.get('/list-user', util.CheckLogin, function(req, res) {
	var param = {};
	param.keyword = req.query.keyword;
	param.authType = req.query.authType;
	param.status = req.query.status;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	userController.ListUser(param);
});

router.get('/list-name', function(req, res) {
	var param = {};
	param.id = req.query.id;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	userController.ListName(param);
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
	param.newPath = "/static/upload/user/"+req.user.id+"/";
	param.newName = "photo.jpg";
	param.thumb = {name:"icon.jpg",w:64,h:64};
	var image = req.body.uploadImage.replace(/^data:image\/jpeg;base64,/, "");
	param.buffer = Buffer.from(image,'base64');

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

router.post('/update-auth', util.CheckAdmin,util.CSRF, function(req, res){
	var param = {};
	param.id = req.body.id;
	param.authType = req.body.authType;
	param.status = req.body.status;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	userController.UpdateAuth(param);
});
