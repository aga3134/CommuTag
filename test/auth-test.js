var Config = require("../config.json");
var chai = require('chai');
var chaiHttp = require('chai-http');

var mongoose = require('mongoose');
var app = require("../server.js");
var Dataset = require("../app/db/dataset");
var User = require("../app/db/user");
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

var userAdd = {
	normal: {
		provider: "local",
		signupEmail: "normalUser@test.com",
		password: "normalUser",
	},
	admin: {
		provider: "local",
		signupEmail: "adminUser@test.com",
		password: "adminUser",
		authType: "admin"
	},
	member: {
		provider: "local",
		signupEmail: "memberUser@test.com",
		password: "memberUser"
	},
	master: {
		provider: "local",
		signupEmail: "masterUser@test.com",
		password: "memberUser"
	},
	blacklist: {
		provider: "local",
		signupEmail: "blacklistUser@test.com",
		password: "blacklistUser",
		status: "blacklist"
	}
};

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

var testImage = "data:image/png;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7";

var user = {};
var dataset = {};

describe("權限測試", function() { 
	/*this.timeout(5000);
	var saltRounds = 10;

	before(function(done){
		async.series([
			function(next){
				var newUser = Object.assign({},userAdd.normal);
				newUser.password = bcrypt.hashSync(newUser.password, saltRounds);
				User.create(newUser, function(err,result){
					if(err) console.log(err);
					user.normal = result;
					next();
				});
			},
			function(next){
				var newUser = Object.assign({},userAdd.admin);
				newUser.password = bcrypt.hashSync(newUser.password, saltRounds);
				User.create(newUser, function(err,result){
					if(err) console.log(err);
					user.admin = result;
					next();
				});
			},
			function(next){
				var newUser = Object.assign({},userAdd.member);
				newUser.password = bcrypt.hashSync(newUser.password, saltRounds);
				User.create(newUser, function(err,result){
					if(err) console.log(err);
					user.member = result;
					next();
				});
			},
			function(next){
				var newUser = Object.assign({},userAdd.master);
				newUser.password = bcrypt.hashSync(newUser.password, saltRounds);
				User.create(newUser, function(err,result){
					if(err) console.log(err);
					user.master = result;
					next();
				});
			},
			function(next){
				var newUser = Object.assign({},userAdd.blacklist);
				newUser.password = bcrypt.hashSync(newUser.password, saltRounds);
				User.create(newUser, function(err,result){
					if(err) console.log(err);
					user.blacklist = result;
					next();
				});
			},
			function(next){
				datasetAdd.allOn.member = [{_id: user.member._id}];
				datasetAdd.allOn.master = [{_id: user.master._id}];
				Dataset.create(datasetAdd.allOn, function(err,result){
					if(err) console.log(err);
					dataset.allOn = result;
					next();
				});
			},
			function(next){
				datasetAdd.allOff.member = [{_id: user.member._id}];
				datasetAdd.allOff.master = [{_id: user.master._id}];
				Dataset.create(datasetAdd.allOff, function(err,result){
					if(err) console.log(err);
					dataset.allOf = result;
					next();
				});
			},
		],
		function(err,results){
			if(err) console.log(err);
			done();
		});

	});

	describe("未登入權限測試", function() { 
		before(function(done) {
			done();
		});

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
			.query({id:user.normal._id.toString()})
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
			.send({name: "123"})
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

		it("upload user auth", function(done){ 
			agent.post("/user/update-auth")
			.set("x-requested-with","XMLHttpRequest")
			.send({
				id:user.blacklist.id,
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

		after(function(done) {
			done();
		});

	});

	describe("一般使用者權限測試", function() { 
		before(function(done) {
			done();
		});
		
		it("login", function(done){ 
			agent.post("/auth/login-by-password")
			.send({
				"email": userAdd.normal.signupEmail,
				"password": userAdd.normal.password
			})
			.end(function(err,res){
				expect(res.statusCode).to.equal(200);
				done(); 
			}); 
		});

		after(function(done) {
			done();
		});
	});

	describe("管理員權限測試", function() { 
		before(function(done) {
			done();
		});

		after(function(done) {
			done();
		});

	});

	describe("私密成員權限測試", function() { 
		before(function(done) {
			done();
		});

		after(function(done) {
			done();
		});

	});

	describe("版主權限測試", function() { 
		before(function(done) {
			done();
		});

		after(function(done) {
			done();
		});

	});

	describe("黑名單權限測試", function() { 
		before(function(done) {
			done();
		});

		after(function(done) {
			done();
		});

	});

	after(function(done) {
		async.series([
			function(next){
				var idArr = [];
				for(var key in user){
					var userID = user[key]._id;
					idArr.push(userID);
					rimraf.sync("../static/upload/user/"+userID);
				}
				//console.log(idArr);
				User.deleteMany({_id:idArr}, function(err){
					if(err) console.log(err);
					next();
				});
			},
			function(next){
				var idArr = [];
				for(var key in dataset){
					var datasetID = dataset[key]._id;
					idArr.push(datasetID);
					rimraf.sync("../static/upload/dataset/"+datasetID);
					rimraf.sync("../static/file/"+datasetID);
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
*/
});