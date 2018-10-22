const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require("path");

module.exports = {
 	entry: path.join(__dirname, "src/index.js"),
 	output: {
	    path: path.resolve( __dirname, 'dist'),
	    filename: '[name].bundle.js'
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Production',
        	filename: 'index.html'
		})
	]
}