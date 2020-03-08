var Config = require('../../config');
var util = require("./util");
var Dataset = require('../db/dataset');
var Favorite = require('../db/favorite');
var mongoose = require('mongoose');
const { exec } = require('child_process');
var fs   = require("fs-extra");

//每個dataset存成一個collection，必免資料太大存取很慢
var ImageSchema = require("../db/imageSchema");

var datasetController = {};

function CheckDatasetAuth(param){
	return new Promise(function(resolve, reject) {
		Dataset.findOne({_id:param.dataset},{"__v":0})
		.exec(function(err, result){
			if(err){
				console.log(err);
				return reject({err:"find dataset fail"});
			}
			if(param.checkUpload && !result.enableUpload){
				return reject({err:"upload not enabled"});
			}
			if(param.checkAnnotation && !result.enableAnnotation){
				return reject({err:"annotation not enabled"});
			}
			if(param.checkDownload && !result.enableDownload){
				return reject({err:"download not enabled"});
			}
			if(param.checkView && !result.isPublic){
				//不公開的資料集，管理員跟私密成員才能看
				if(!param.user) return reject({err:"view not allowed"});
				if(param.user.authType != "admin"){
					var isMember = result.member.filter(function(m){
						return m.id == param.user._id.toString();
					});
					if(isMember.length == 0) return reject({err:"view not allowed"});
				}
			}
			return resolve(result);
		});
	});
}

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
	//若無member資料傳輸時會自動省略，這邊補上空陣列讓資料庫更新member
	if(!param.info.member){
		param.info.member = [];
	}
	Dataset.updateOne({_id:param.info._id},param.info,function(err, dataset){
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
		mongoose.connection.db.dropCollection("image"+param.dataset);
		param.succFunc({_id:param.id});
	});
};

datasetController.ListDataset = function(param){
	var queryOption = {};
	if(param.keyword){
		queryOption.name = {"$regex": param.keyword,"$options": "i"};
	}
	if(!param.user){
		queryOption.isPublic = true;
	}
	else if(param.user.authType != "admin"){
		queryOption["$or"] = [
			{isPublic: true},
			{isPublic: false, "member.id": param.user._id.toString()}
		];
	}
	if(param.enableUpload){
		queryOption.enableUpload = param.enableUpload=="1"?true:false;
	}
	if(param.enableAnnotation){
		queryOption.enableAnnotation = param.enableAnnotation=="1"?true:false;
	}
	var sortOption = {};
	if(param.sort){
		sortOption[param.sort] = param.orderType=="desc"?-1:1;
	}

	function FindDataset(query,sort){
		var limit = 8;
		var skip = (param.page||0)*limit;
		Dataset.find(query,{"__v":0},{limit:limit+1, skip:skip})
		.sort(sort)
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
	}

	if(param.favorite == "1"){
		var query = {};
		query.userID = param.user._id.toString();
		Favorite.find(query,function(err, favorite){
			if(err){
				console.log(err);
				return param.failFunc({err:"list favorite fail"});
			}
			if(favorite.length > 0){
				queryOption._id = favorite.map(function(d){
					return d.datasetID;
				});
				FindDataset(queryOption,sortOption);
			}
			else{
				return param.succFunc({hasMore:false,dataset:[]});
			}
		});
	}
	else FindDataset(queryOption,sortOption);

};

datasetController.ViewDataset = function(param){
	CheckDatasetAuth({
		dataset: param.id,
		user: param.user,
		checkView: true
	})
	.then(function(result){
		param.succFunc(result);
	})
	.catch(function(err){
		param.failFunc(err);
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
	CheckDatasetAuth({
		dataset: param.dataset,
		user: param.user,
		checkView: true,
		checkUpload: true
	})
	.then(function(dataset){
		var Image = mongoose.model("image"+param.dataset, ImageSchema);
		var newImage = {};
		newImage.lat = param.lat;
		newImage.lng = param.lng;
		newImage.remark = param.remark;
		newImage.dataTime = param.dataTime;
		newImage.uploadFrom = "user";
		newImage.uploader = param.user._id.toString();
		Image.create(newImage,function(err, result){
			if(err){
				console.log(err);
				return param.failFunc({err:"create image fail"});
			}
			util.UpdateDatasetStatistic({dataset: param.dataset});
			param.succFunc(result);
		});
	})
	.catch(function(err){
		param.failFunc(err);
	});

};

datasetController.ListImage = function(param){
	CheckDatasetAuth({
		dataset: param.dataset,
		user: param.user,
		checkView: true
	})
	.then(function(result){
		var limit = 8;
		var skip = (param.page||0)*limit;
		var Image = mongoose.model("image"+param.dataset, ImageSchema);

		var option = {};
		if(param.all != "1"){
			option.limit = limit+1;
			option.skip = skip;
		}
		Image.find({},{"__v":0},option)
		.sort({"createdAt":-1})
		.exec(function(err, images){
			if(err){
				console.log(err);
				return param.failFunc({err:"list image fail"});
			}
			if(param.all == "1"){
				param.succFunc(images);
			}
			else{
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
			}
		});
	})
	.catch(function(err){
		param.failFunc(err);
	});

};

datasetController.ListImageForAnnotation = function(param){
	CheckDatasetAuth({
		dataset: param.dataset,
		user: param.user,
		checkView: true
	})
	.then(function(result){
		var Image = mongoose.model("image"+param.dataset, ImageSchema);
		var condition = "this.verifyNum < "+Config.verify.sample+" || this.agreeNum < this.verifyNum*"+Config.verify.accept;
		Image.find({},{"__v":0})
		.$where(condition)
		.exec(function(err, images){
			if(err){
				console.log(err);
				return param.failFunc({err:"list image for annotation fail"});
			}
			param.succFunc(images);
		});
	})
	.catch(function(err){
		param.failFunc(err);
	});

};

datasetController.UpdateImageInfo = function(param){
	var Image = mongoose.model("image"+param.dataset, ImageSchema);
	Image.updateOne({_id:param.image},param,function(err,image){
		if(err){
			console.log(err);
			return param.failFunc({err:"update image fail"});
		}
		param.succFunc(image);
	});
};

datasetController.DeleteImage = function(param){
	var Image = mongoose.model("image"+param.dataset, ImageSchema);
	Image.deleteOne({_id:param.image},function(err){
		if(err){
			console.log(err);
			return param.failFunc({err:"delete image fail"});
		}
		util.UpdateDatasetStatistic({dataset: param.dataset});
		param.succFunc({_id:param.image});
	});
};

datasetController.SetAnnotation = function(param){
	CheckDatasetAuth({
		dataset: param.dataset,
		user: param.user,
		checkView: true,
		checkAnnotation: true
	})
	.then(function(dataset){
		var Image = mongoose.model("image"+param.dataset, ImageSchema);
		var data = null;
		if(param.user && param.annotation){
			data = {};
			data.user = param.user._id;
			data.annotation = param.annotation;
		}
		var update = {
			annotation:data,
			verification: [],
			verifyNum:0,
			agreeNum:0
		}
		Image.updateOne({_id:param.image},update,function(err, image){
			if(err){
				console.log(err);
				return param.failFunc({err:"update annotation fail"});
			}
			util.UpdateDatasetStatistic({dataset: param.dataset});
			param.succFunc(image);
		});
	})
	.catch(function(err){
		param.failFunc(err);
	});

};

datasetController.AddVerification = function(param){
	CheckDatasetAuth({
		dataset: param.dataset,
		user: param.user,
		checkView: true,
		checkAnnotation: true
	})
	.then(function(dataset){
		var Image = mongoose.model("image"+param.dataset, ImageSchema);
		var data = {};
		data.user = param.user._id.toString();
		data.agree = param.agree;
		Image.findOne({_id:param.image},function(err, image){
			if(err){
				console.log(err);
				return param.failFunc({err:"find image fail"});
			}
			if(!image) return param.failFunc({err:"image not found"});
			
			var duplicate = image.verification.filter(function(v){
				return v.user == data.user;
			});
			if(duplicate.length > 0){
				return param.failFunc({err:"verification duplicate"});
			}
			else{
				image.verification.push(data);
				image.verifyNum++;
				image.agreeNum += data.agree=="1"?1:0;
				image.save(function(err, saved){
					if(err){
						console.log(err);
						return param.failFunc({err:"update verification fail"});
					}
					util.UpdateDatasetStatistic({dataset: param.dataset});
					param.succFunc(image);
				});
			}
		});
	})
	.catch(function(err){
		param.failFunc(err);
	});

};

datasetController.BatchDownload = function(param){
	CheckDatasetAuth({
		dataset: param.dataset,
		user: param.user,
		checkDownload: true,
		checkAnnotation: true
	})
	.then(function(dataset){
		var ext = "zip";
		var path = "/static/file/"+param.dataset;
		path +="/batchDownload_"+param.filter+"_"+param.format+"."+ext;

		function GenerateZip(){
			//create another process to avoid blocking
			var cmd = "python python/batchDownload/BatchDownload.py";
			cmd += " "+param.dataset;
			cmd += " "+param.filter;
			cmd += " "+param.format;

			exec(cmd, function(error, stdout, stderr){
				console.log(stdout);
				console.error(stderr);
				if(error){
					return console.log(error);
				}
				param.succFunc(path);
			});
		}

		//check if file exist and up to date
		var dir = __dirname+"/../..";
		if(fs.existsSync(dir+path)){
			var stats = fs.statSync(dir+path);
			var datasetTime = new Date(dataset.updatedAt);
			var fileTime = new Date(stats.mtime);
			if(datasetTime.getTime() <= fileTime.getTime()) {
				console.log("file is up to date");
				param.succFunc(path);
			}
			else GenerateZip();
		}
		else GenerateZip();

	})
	.catch(function(err){
		console.log(err);
		param.failFunc(err);
	});

};

module.exports = datasetController;
