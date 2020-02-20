var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
	uploadFrom: String,		//user or api
	uploader: String,		//user id or api token	
	annotation: mongoose.Schema.Types.Mixed,		//annotation data
	verification: [mongoose.Schema.Types.Mixed],	//annotation verification data
	verifyNum: {		//total number in verification
		type: Number,
		default: 0
	},
	agreeNum: {		//agree number in varification
		type: Number,
		default: 0
	},
	lat: Number,
	lng: Number,
	remark: String
},{timestamps: {createdAt:"createdAt", updatedAt:"updatedAt"} });

module.exports = ImageSchema;