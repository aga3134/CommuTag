var mongoose = require('mongoose');

var DatasetSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	maxWidth: {
		type: Number,
		min: 32,
		max: 1920
	},
	maxHeight: {
		type: Number,
		min: 32,
		max: 1920
	},
	isPublic: Boolean,
	enableUpload: Boolean,
	enableDownload: Boolean,
	enableGPS: Boolean,
	annotationType: String,
	enableAddTag: Boolean,
	tagArr: [String],
	picCover: String,
	picNum: {
		type: Number,
		default: 0
	},
	tagNum: {
		type: Number,
		default: 0
	},
},{
	collection: "datasets",
	timestamps: {createdAt:"createdAt", updatedAt:"updatedAt"} 
});

module.exports = mongoose.model("datasets", DatasetSchema);