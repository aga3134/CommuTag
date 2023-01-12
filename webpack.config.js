//
var path = require("path");
var webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var Config = require("./config.json");
const { FALSE } = require("node-sass");

module.exports = {
	mode: Config.mode, // "production" | "development" | "none"
	entry: {
		"js/main": ["./src/js/main.js"],
		"js/login": ["./src/js/login.js"],
		"js/account": ["./src/js/account.js"],
		"js/dataset-view": ["./src/js/dataset-view.js"],
		"js/statistic": ["./src/js/statistic.js"],
		"js/image-view": ["./src/js/image-view.js"],
	},
	output:{
		path: path.resolve(__dirname,"dist/"+Config.mode),
		filename: "[name].js",
		publicPath: "/dist/"+Config.mode
	},
	module:{
		rules: [
			{
				test: /\.js$/,
                loader: "babel-loader",
                include: [
					path.resolve(__dirname, "src")
				],
                exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.vue$/,
				loader: "vue-loader"
			},
		]
	},
	plugins:[
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
			chunkFilename: "css/[id].css"
		})
	],
	devtool: Config.mode=="development"?"source-map":false
};