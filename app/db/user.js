module.exports = function(sequelize, DataTypes) {
	return sequelize.define("User", {
		email: {
			type: DataTypes.STRING,
			alowNull: false,
			primaryKey: true
		},
		password: DataTypes.STRING,
		initPwd: DataTypes.STRING,
		authType:{
			type: DataTypes.ENUM,
			values: ['user', 'admin'],
			alowNull: false,
			defaultValue: 'user'
		},
	});
};