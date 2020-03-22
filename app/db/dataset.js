var mongoose = require('mongoose');

var DatasetSchema = new mongoose.Schema({
	name: String,
	desc: String,
	maxWidth: {
		type: Number,
		min: 32,
		max: 1920,
		default: 640
	},
	maxHeight: {
		type: Number,
		min: 32,
		max: 1920,
		default: 480
	},
	isPublic: {
		type: Boolean,
		default: true
	},
	enableUpload: {
		type: Boolean,
		default: true
	},
	enableDownload: {
		type: Boolean,
		default: true
	},
	enableGPS: {
		type: Boolean,
		default: false
	},
	enableAnnotation: {
		type: Boolean,
		default: true
	},
	annotationType: {
		type: String,
		default: "bbox"
	},
	tagArr: [String],
	picCover: String,
	picNum: {
		type: Number,
		default: 0
	},
	annotationNum: {
		type: Number,
		default: 0
	},
	member:[mongoose.Schema.Types.Mixed],	//私密成員
	master:[mongoose.Schema.Types.Mixed]	//版主
},{
	collection: "dataset",
	timestamps: {createdAt:"createdAt", updatedAt:"updatedAt"} 
});

module.exports = mongoose.model("dataset", DatasetSchema);