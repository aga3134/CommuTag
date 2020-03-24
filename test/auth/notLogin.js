var Config = require("../../config.json");
var chai = require('chai');
var chaiHttp = require('chai-http');

var mongoose = require('mongoose');
var app = require("../../server.js");
var Dataset = require("../../app/db/dataset");
var User = require("../../app/db/user");
var bcrypt = require('bcrypt');
var async = require("async");
var rimraf = require("rimraf");

chai.use(chaiHttp);
var agent = chai.request.agent(app);
var expect = chai.expect;

mongoose.connect(Config.mongodb.url,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.pluralize(null);

var datasetAdd = {
	allOn: {
		name: "allOn",
		desc: "allOn",
		isPublic: true,
		enableUpload: true,
		enableDownload: true,
		enableGPS: true,
		enableAnnotation: true,
	},
	allOff: {
		name: "allOff",
		desc: "allOff",
		isPublic: false,
		enableUpload: false,
		enableDownload: false,
		enableGPS: false,
		enableAnnotation: false,
	}
};

var testImage = "data:image/jpeg;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7";

var dataset = {};

describe("未登入權限測試", function() { 
	this.timeout(5000);
	var saltRounds = 10;

	before(function(done){
		async.series([
			function(next){
				Dataset.create(datasetAdd.allOn, function(err,result){
					if(err) console.log(err);
					dataset.allOn = result;
					next();
				});
			},
			function(next){
				Dataset.create(datasetAdd.allOff, function(err,result){
					if(err) console.log(err);
					dataset.allOff = result;
					next();
				});
			},
		],
		function(err,results){
			if(err) console.log(err);
			done();
		});

	});

	//===========================================================
	it("user info", function(done){ 
		agent.get("/user/info")
		.set("x-requested-with","XMLHttpRequest")
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("please login");
			done(); 
		}); 
	});

	it("list user", function(done){ 
		agent.get("/user/list-user")
		.set("x-requested-with","XMLHttpRequest")
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("please login");
			done(); 
		}); 
	});

	it("list name", function(done){ 
		agent.get("/user/list-name")
		.set("x-requested-with","XMLHttpRequest")
		.query({id:mongoose.Types.ObjectId().toString()})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("ok");
			done(); 
		}); 
	});

	it("edit user info", function(done){ 
		agent.post("/user/edit")
		.set("x-requested-with","XMLHttpRequest")
		.send({data:{name: "123"}})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("please login");
			done(); 
		}); 
	});

	it("upload user photo", function(done){ 
		agent.post("/user/upload-image")
		.set("x-requested-with","XMLHttpRequest")
		.send({uploadImage: testImage})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("please login");
			done(); 
		}); 
	});

	it("update user auth", function(done){ 
		agent.post("/user/update-auth")
		.set("x-requested-with","XMLHttpRequest")
		.send({
			id:mongoose.Types.ObjectId().toString(),
			authType: "user",
			status: "blacklist"
		})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("permission denied");
			done(); 
		}); 
	});

	it("add favorite", function(done){ 
		agent.post("/favorite/add-favorite")
		.set("x-requested-with","XMLHttpRequest")
		.send({dataset: dataset.allOn._id.toString()})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("please login");
			done(); 
		}); 
	});

	it("remove favorite", function(done){ 
		agent.post("/favorite/remove-favorite")
		.set("x-requested-with","XMLHttpRequest")
		.send({dataset: dataset.allOn._id.toString()})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("please login");
			done(); 
		}); 
	});

	it("list my favorite", function(done){ 
		agent.get("/favorite/list-my-favorite")
		.set("x-requested-with","XMLHttpRequest")
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("please login");
			done(); 
		}); 
	});

	it("create dataset", function(done){ 
		agent.post("/dataset/create-dataset")
		.set("x-requested-with","XMLHttpRequest")
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("permission denied");
			done(); 
		}); 
	});

	it("update dataset", function(done){ 
		agent.post("/dataset/update-dataset")
		.set("x-requested-with","XMLHttpRequest")
		.send({
			dataset:dataset.allOn._id.toString(),
			info:{}
		})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("permission denied");
			done(); 
		}); 
	});

	it("delete dataset", function(done){ 
		agent.post("/dataset/delete-dataset")
		.set("x-requested-with","XMLHttpRequest")
		.send({id:mongoose.Types.ObjectId().toString()})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("permission denied");
			done(); 
		}); 
	});

	it("list dataset", function(done){ 
		agent.get("/dataset/list-dataset")
		.set("x-requested-with","XMLHttpRequest")
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("ok");
			done(); 
		}); 
	});

	it("view dataset allOn", function(done){ 
		agent.get("/dataset/list-dataset")
		.set("x-requested-with","XMLHttpRequest")
		.query({id:dataset.allOn._id.toString()})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("ok");
			done(); 
		}); 
	});

	it("view dataset allOff", function(done){ 
		agent.get("/dataset/view-dataset")
		.set("x-requested-with","XMLHttpRequest")
		.query({id:dataset.allOff._id.toString()})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("view not allowed");
			done(); 
		}); 
	});

	it("change dataset cover", function(done){ 
		agent.post("/dataset/change-cover")
		.set("x-requested-with","XMLHttpRequest")
		.send({
			"dataset": dataset.allOn._id.toString(),
			"uploadImage": testImage
		})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("permission denied");
			done(); 
		}); 
	});

	it("upload image to dataset allOn", function(done){ 
		agent.post("/dataset/upload-image")
		.set("x-requested-with","XMLHttpRequest")
		.send({
			"dataset": dataset.allOn._id.toString(),
			"uploadImage": testImage
		})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("please login");
			done(); 
		}); 
	});

	it("upload image to dataset allOff", function(done){ 
		agent.post("/dataset/upload-image")
		.set("x-requested-with","XMLHttpRequest")
		.send({
			"dataset": dataset.allOff._id.toString(),
			"uploadImage": testImage
		})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("please login");
			done(); 
		}); 
	});

	it("list image allOn", function(done){ 
		agent.get("/dataset/list-image")
		.set("x-requested-with","XMLHttpRequest")
		.query({dataset:dataset.allOn._id.toString()})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("ok");
			done(); 
		}); 
	});

	it("list image allOff", function(done){ 
		agent.get("/dataset/list-image")
		.set("x-requested-with","XMLHttpRequest")
		.query({dataset:dataset.allOff._id.toString()})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("view not allowed");
			done(); 
		}); 
	});

	it("update image info", function(done){ 
		agent.post("/dataset/update-image-info")
		.set("x-requested-with","XMLHttpRequest")
		.send({
			"dataset": mongoose.Types.ObjectId().toString(),
			"image": mongoose.Types.ObjectId().toString()
		})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("permission denied");
			done(); 
		}); 
	});

	it("delete image", function(done){ 
		agent.post("/dataset/delete-image")
		.set("x-requested-with","XMLHttpRequest")
		.send({
			"dataset": mongoose.Types.ObjectId().toString(),
			"image": mongoose.Types.ObjectId().toString()
		})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("permission denied");
			done(); 
		}); 
	});

	it("list image for annotation allOn", function(done){ 
		agent.get("/dataset/list-image-for-annotation")
		.set("x-requested-with","XMLHttpRequest")
		.query({"dataset": dataset.allOn._id.toString()})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("ok");
			done(); 
		}); 
	});

	it("list image for annotation allOff", function(done){ 
		agent.get("/dataset/list-image-for-annotation")
		.set("x-requested-with","XMLHttpRequest")
		.query({"dataset": dataset.allOff._id.toString()})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("view not allowed");
			done(); 
		}); 
	});

	it("set annotation allOn", function(done){ 
		agent.post("/dataset/set-annotation")
		.set("x-requested-with","XMLHttpRequest")
		.send({
			"dataset": dataset.allOn._id.toString(),
			"image": mongoose.Types.ObjectId().toString(),
			"annotation": [],
		})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("please login");
			done(); 
		}); 
	});

	it("set annotation allOff", function(done){ 
		agent.post("/dataset/set-annotation")
		.set("x-requested-with","XMLHttpRequest")
		.send({
			"dataset": dataset.allOff._id.toString(),
			"image": mongoose.Types.ObjectId().toString(),
			"annotation": [],
		})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("please login");
			done(); 
		}); 
	});

	it("add verification allOn", function(done){ 
		agent.post("/dataset/add-verification")
		.set("x-requested-with","XMLHttpRequest")
		.send({
			"dataset": dataset.allOn._id.toString(),
			"image": mongoose.Types.ObjectId().toString(),
			"agree": true,
		})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("please login");
			done(); 
		}); 
	});

	it("add verification allOff", function(done){ 
		agent.post("/dataset/add-verification")
		.set("x-requested-with","XMLHttpRequest")
		.send({
			"dataset": dataset.allOff._id.toString(),
			"image": mongoose.Types.ObjectId().toString(),
			"agree": true,
		})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("please login");
			done(); 
		}); 
	});

	it("verify condition", function(done){ 
		agent.get("/dataset/verify-condition")
		.set("x-requested-with","XMLHttpRequest")
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("ok");
			done(); 
		}); 
	});

	it("batch download allOn", function(done){ 
		agent.post("/dataset/batch-download")
		.set("x-requested-with","XMLHttpRequest")
		.send({
			dataset:dataset.allOn._id.toString(),
			filter: "all",
			format: "voc"
		})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("please login");
			done(); 
		}); 
	});

	it("batch download allOff", function(done){ 
		agent.post("/dataset/batch-download")
		.set("x-requested-with","XMLHttpRequest")
		.send({
			dataset:dataset.allOff._id.toString(),
			filter: "all",
			format: "voc"
		})
		.end(function(err,res){
			expect(res.statusCode).to.equal(200);
			var result = JSON.parse(res.text);
			expect(result.status).to.equal("fail");
			expect(result.message).to.equal("please login");
			done(); 
		}); 
	});
	//===========================================================

	after(function(done) {
		async.series([
			function(next){
				var idArr = [];
				for(var key in dataset){
					var datasetID = dataset[key]._id;
					idArr.push(datasetID);
					rimraf.sync("../static/upload/dataset/"+datasetID);
					rimraf.sync("../static/file/"+datasetID);
				}
				//delete related image collection
				for(var i=0;i<idArr.length;i++){
					mongoose.connection.db.listCollections({name: "image"+idArr[i]})
					.next(function(err, info) {
						if(info) {
							mongoose.connection.db.dropCollection(info.name);
						}
					});
				}
				//console.log(idArr);
				Dataset.deleteMany({_id:idArr}, function(err){
					if(err) console.log(err);
					next();
				});
			},
		],
		function(err,results){
			if(err) console.log(err);
			agent.close();
			done();
		});
	});

});