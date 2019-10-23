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
    db.sequelize.sync(syncOp).then(function(result){
    	//add default admin
	    if(Config.defaultAdmin){
	    	db.User.findOne({where: {"email": Config.defaultAdmin}}).then(function(user) {
				if(!user){
					var newUser = {};
					newUser.email = Config.defaultAdmin;
					var hash = bcrypt.hashSync("defaultAdmin", 10);
					newUser.password = hash;
					newUser.authType = "admin";
					db.User.create(newUser).then(function(user) {
						console.log("create default admin: "+user.email);
					});
				}
			});
	    }
    });
    
}

module.exports = db;
