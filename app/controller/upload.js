var fs   = require("fs-extra");
var multer = require("multer");
var sharp = require("sharp");
var rimraf = require("rimraf");

var upload = {};

var storage = multer.memoryStorage()

var fileFilter = function(req, file, cb){
	var allowArr = ["image/jpeg","image/png","image/gif"];
	if(allowArr.includes(file.mimetype)) {
		cb(null, true);
	}
	else {
		cb(null, false);
	}
};

upload.UploadImageToMem = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 10
	},
	fileFilter: fileFilter
}).single("uploadImage");

upload.GetImageType = function(file){
	switch(file.mimetype){
		case "image/jpeg":
			return "jpg";
			break;
		case "image/png":
			return "png";
			break;
		case "image/gif":
			return "gif";
			break;
		default:
			return "";
	}
}

//param: buffer, newPath, newName, thumb {name, w, h}, succFunc, failFunc
upload.SaveImage = function(param){
	var dir = __dirname+"/../..";
	if (!fs.existsSync(dir+param.newPath)){
		fs.mkdirpSync(dir+param.newPath);
	}
	var image = sharp(param.buffer);
	var newName = param.newPath+param.newName;
	var thumbName = param.thumb?param.newPath+param.thumb.name:"";
	//resize if original size exceed limit
	var limitW = 1024;
	var limitH = 1024;
	image.metadata().then(function(meta){
		var scaleW = limitW/meta.width;
		var scaleH = limitH/meta.height;
		var s = Math.min(scaleW,scaleH);
		if(s>1) return image;
		else return image.resize(parseInt(meta.width*s),parseInt(meta.height*s));
	}).then(function(resizeImage){
		//save image & its thumbnail into disk
		resizeImage.toFile(dir+newName)
		.then(function(info){
			//console.log(info);
			if(param.thumb){
				resizeImage.resize({
					width:param.thumb.w,
					height:param.thumb.h,
					fit:sharp.fit.cover,
					position:sharp.strategy.entropy
				})
				.toFile(dir+thumbName)
				.then(function(info){
					console.log(info);
					param.succFunc({newName: newName, thumbName: thumbName});
				}).catch(function(err){
					console.log(err);
					param.failFunc({err:"save thumbnail fail"});
				});
			}
			else param.succFunc({newName: newName});
		});
	}).catch(function(err){
		console.log(err);
		param.failFunc({err:"save image fail"});
	});

};

//param: saveName, content, succFunc, failFunc
upload.SaveFile = function(param){
	var dir = __dirname+"/../..";
	if (!fs.existsSync(dir+param.newPath)){
		fs.mkdirpSync(dir+param.newPath);
	}
	var newName = param.newPath+param.newName;
	fs.writeFile(dir+newName, param.content, param.encode||"utf8", function(err) {
		if(err){
			console.log(err);
			param.failFunc({err:"save file fail"});
		}
		else param.succFunc({newName:newName});
	}); 
};

upload.DeletePath = function(path, callback) {
	rimraf(path,callback);
}

module.exports = upload;