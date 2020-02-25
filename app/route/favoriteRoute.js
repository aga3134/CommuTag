var express = require("express");
var router = express.Router();
var favoriteController = require("../controller/favoriteController");
var util = require("../controller/util");
var Config = require("../../config.json");

module.exports = router;

router.post('/add-favorite', util.CheckLogin,util.CSRF, function(req, res){
	var param = {};
	param.user = req.user;
	param.dataset = req.body.dataset;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	favoriteController.AddFavorite(param);
});

router.post('/remove-favorite', util.CheckLogin,util.CSRF, function(req, res){
	var param = {};
	param.user = req.user;
	param.dataset = req.body.dataset;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	favoriteController.RemoveFavorite(param);
});

router.get('/list-my-favorite', util.CheckLogin, function(req, res){
	var param = {};
	param.user = req.user;
	param.dataset = req.query.dataset;
	param.succFunc = function(result){
		res.status(200).json({"status":"ok","data": result});
	};
	param.failFunc = function(result){
		res.status(200).json({"status": "fail","message": result.err});
	};
	favoriteController.ListFavorite(param);
});