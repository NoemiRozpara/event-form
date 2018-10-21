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
			title: 'Production'
		}),
		new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
	],
	module: {
		rules: [{
            test: /\.scss$/,
            use: [{
	                loader: process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
	            }, {
	                loader: "css-loader"
	            }, {
	                loader: "sass-loader",
	                options: {
	                    implementation: require("node-sass")
	                }
	            }]
            ]
        }]
    }
}