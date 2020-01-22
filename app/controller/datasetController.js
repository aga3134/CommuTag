var Config = require('../../config');
var util = require("./util");
var Dataset = require('../db/dataset');

var datasetController = {};

datasetController.CreateDataset = function(param){
	Dataset.create(param.info,function(err, dataset){
		if(err){
			console.log(err);
			return param.failFunc({err:"create dataset fail"});
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
	var skip = param.page*limit;
	Dataset.find({},{"__v":0},{limit:limit+1, skip:skip},function(err, dataset) {
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

module.exports = datasetController;