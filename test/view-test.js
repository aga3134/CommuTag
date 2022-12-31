var Config = require("../config.json");
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
var app = require("../server.js");
var agent = chai.request.agent(app);
var expect = chai.expect;

describe("View Route 測試", function() {
	this.timeout(5000);
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
	it("get /statistic", function(done){ 
		agent.get("/statistic")
		.end(function(err,res){
			expect(res.status).to.equal(200); 
			done(); 
		}); 
	});

	after(function(done){
		agent.close();
		done();
	});
});
