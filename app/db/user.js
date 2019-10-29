module.exports = function(sequelize, DataTypes) {
	return sequelize.define("user", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		provider: {
			type: DataTypes.ENUM,
			values: ['google', 'facebook', 'local'],
			alowNull: false
		},
		oauthID: DataTypes.STRING,
		signupEmail: DataTypes.STRING,
		signupName: DataTypes.STRING,
		password: DataTypes.STRING,
		status: {
			type: DataTypes.STRING,
			alowNull: false,
			defaultValue: 'valid'
		},
		name: DataTypes.STRING,
		contactEmail: DataTypes.STRING,
		photo: DataTypes.STRING,
		icon: DataTypes.STRING,
		authType:{
			type: DataTypes.ENUM,
			values: ['user', 'admin'],
			alowNull: false,
			defaultValue: 'user'
		},
	});
};