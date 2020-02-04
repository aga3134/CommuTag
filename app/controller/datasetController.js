var Config = require('../../config');
var util = require("./util");
var Dataset = require('../db/dataset');
var mongoose = require('mongoose');

//每個dataset存成一個collection，必免資料太大存取很慢
var ImageSchema = require("../db/ImageSchema");

var datasetController = {};

datasetController.CreateDataset = function(param){
	Dataset.create({},function(err, dataset){
		if(err){
			console.log(err);
			return param.failFunc({err:"create dataset fail"});
		}
		param.succFunc(dataset);
	});
};

datasetController.UpdateDataset = function(param){
	Dataset.findOneAndUpdate({_id:param.info._id},param.info,function(err, dataset){
		if(err){
			console.log(err);
			return param.failFunc({err:"update dataset fail"});
		}
		param.succFunc(dataset);
	});
};

datasetController.DeleteDataset = function(param){
	Dataset.deleteOne({_id:param.id},function(err){
		if(err){
			console.log(err);
			return param.failFunc({err:"delete dataset fail"});
		}
		param.succFunc({_id:param.id});
	});
};

datasetController.ListDataset = function(param){
	var limit = 8;
	var skip = (param.page||0)*limit;
	var queryOption = {};
	if(param.keyword){
		queryOption.name = {"$regex": param.keyword,"$options": "i"};
	}
	var sortOption = {};
	if(param.sort){
		sortOption[param.sort] = param.orderType=="desc"?-1:1;
	}

	Dataset.find(queryOption,{"__v":0},{limit:limit+1, skip:skip})
	.sort(sortOption)
	.exec(function(err, dataset){
		if(err){
			console.log(err);
			return param.failFunc({err:"list dataset fail"});
		}
		var result = {};
		if(dataset.length > limit){
			result.hasMore = true;
			result.dataset = dataset.slice(0,-1);
		}
		else{
			result.hasMore = false;
			result.dataset = dataset;
		}
		param.succFunc(result);
	});
};

datasetController.ViewDataset = function(param){
	Dataset.findOne({_id:param.id},{"__v":0})
	.exec(function(err, result){
		if(err){
			console.log(err);
			return param.failFunc({err:"find dataset fail"});
		}
		param.succFunc(result);
	});
};

datasetController.ChangeCover = function(param){
	var randomStr = "?rand="+Math.floor(Math.random()*100);
	var modify = {};
	modify.picCover = param.picCover+randomStr;

	Dataset.updateOne({"_id": param.id}, modify, function(err, result) {
		if(err){
			console.log(err);
			return param.failFunc({"err": "change cover fail"});
		}
		param.succFunc(modify);
	});
};

datasetController.UploadImage = function(param){
	var Image = mongoose.model("image"+param.dataset, ImageSchema);
	Image.create({},function(err, result){
		if(err){
			console.log(err);
			return param.failFunc({err:"create image fail"});
		}
		param.succFunc(result);
	});
};

datasetController.ListImage = function(param){
	var limit = 8;
	var skip = (param.page||0)*limit;

	var Image = mongoose.model("image"+param.dataset, ImageSchema);

	Image.find({},{"__v":0},{limit:limit+1, skip:skip})
	.sort({"createdAt":-1})
	.exec(function(err, images){
		if(err){
			console.log(err);
			return param.failFunc({err:"list image fail"});
		}
		var result = {};
		if(images.length > limit){
			result.hasMore = true;
			result.images = images.slice(0,-1);
		}
		else{
			result.hasMore = false;
			result.images = images;
		}
		param.succFunc(result);
	});
};

datasetController.DeleteImage = function(param){
	var Image = mongoose.model("image"+param.dataset, ImageSchema);
	Image.deleteOne({_id:param.image},function(err){
		if(err){
			console.log(err);
			return param.failFunc({err:"delete image fail"});
		}
		param.succFunc({_id:param.image});
	});
};

module.exports = datasetController;