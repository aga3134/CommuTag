//
var path = require("path");
var webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "production", // "production" | "development" | "none"
	entry: {
		"js/main": ["./src/js/main.js"],
		"js/login": ["./src/js/login.js"],
		"js/account": ["./src/js/account.js"],
		"js/admin": ["./src/js/admin.js"],
	},
	output:{
		path: path.resolve(__dirname,'dist'),
		filename: "[name].js",
		publicPath: "/dist"
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
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
	devtool: "source-map"
};