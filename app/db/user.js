var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	provider: String,
	oauthID  : String,
	signupEmail: String,
	signupName: String,
	password: String,
	status: String,			//valid or blacklist
	name: String,
	contactEmail: String,
	photo: String,
	icon: String,
	authType: String,		//user or admin
},{
	collection: "users",
	timestamps: {createdAt:"createdAt", updatedAt:"updatedAt"} 
});

module.exports = mongoose.model('users', UserSchema);