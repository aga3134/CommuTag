var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
	uploadFrom: String,		//user or api
	uploader: String,		//user id or api token	
	annotation: {			//annotation data id
		type: [String],
		default: []
	},
	lat: Number,
	lng: Number
},{timestamps: {createdAt:"createdAt", updatedAt:"updatedAt"} });

module.exports = ImageSchema;