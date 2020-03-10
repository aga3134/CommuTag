var Config = require("../config.json");
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
var agent = chai.request.agent(Config.hostname+":"+Config.serverPort);
var expect = chai.expect;

describe("View Route 測試", function() { 
	it("get /", function(done){ 
		agent.get("/")
		.end(function(err,res){
			expect(res.status).to.equal(200); 
			done(); 
		}); 
	});
	it("get /login", function(done){ 
		agent.get("/login")
		.end(function(err,res){
			expect(res.status).to.equal(200); 
			done(); 
		}); 
	});
	it("get /account", function(done){ 
		agent.get("/account")
		.end(function(err,res){
			expect(res.status).to.equal(200); 
			done(); 
		}); 
	});
	it("get /view", function(done){ 
		agent.get("/view")
		.end(function(err,res){
			expect(res.status).to.equal(200); 
			done(); 
		}); 
	});
	it("get /statistic", function(done){ 
		agent.get("/statistic")
		.end(function(err,res){
			expect(res.status).to.equal(200); 
			done(); 
		}); 
	});
});
