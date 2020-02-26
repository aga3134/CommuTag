var Config = require('../../config');
var util = require("./util");
var ApiKey = require("../db/apiKey");
var mongoose = require('mongoose');

var apiController = {};

apiController.AddKey = function(param){
	var data = {
		key: param.key,
		desc: param.desc
	};
	ApiKey.updateOne({key: param.key},data,{upsert:true},function(err, key){
		if(err){
			console.log(err);
			return param.failFunc({err:"create api key fail"});
		}
		param.succFunc(key);
	});
};

apiController.DeleteKey = function(param){
	ApiKey.deleteOne({_id:param.id},function(err){
		if(err){
			console.log(err);
			return param.failFunc({err:"delete api key fail"});
		}
		param.succFunc({id:param.id});
	});
};

apiController.ListKey = function(param){
	ApiKey.find({},function(err, key){
		if(err){
			console.log(err);
			return param.failFunc({err:"list api key fail"});
		}
		param.succFunc(key);
	});
};

module.exports = apiController;