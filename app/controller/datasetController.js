var Config = require('../../config');
var util = require("./util");
var Dataset = require('../db/dataset');

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

module.exports = datasetController;