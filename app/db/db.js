var Sequelize = require('sequelize');
var Config = require('../../config');
var bcrypt = require('bcrypt');

var db = {};

db.Init = function(){
	db.sequelize = new Sequelize(Config.mysqlAuth.dbName, Config.mysqlAuth.username, Config.mysqlAuth.password,
		{host: Config.mysqlAuth.host, port: '3306', logging: false, dialect: "mysql"
	});
	db.Op = Sequelize.Op;
	db.User = db.sequelize.import(__dirname + "/user.js");
	
	var syncOp = {};
	syncOp.force = false;
    db.sequelize.sync(syncOp);
}

module.exports = db;
