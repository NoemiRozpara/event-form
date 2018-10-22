const common = require("./webpack.common.js");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = merge(common, {
	mode: 'production',
	module: {
		rules: [{
            test: /\.scss$/,
            use: [
            	{
	                loader: MiniCssExtractPlugin.loader
	            }, {
	                loader: "css-loader"
	            }, {
	            	loader: "postcss-loader"
	            }, {
	                loader: "sass-loader",
	                options: {
	                    implementation: require("node-sass")
	                }
	            }
            ]
        },
        {
            test: /\.css$/,
            use: [
            	{
	                loader: MiniCssExtractPlugin.loader
	            }, {
	                loader: "css-loader"
	            }, {
	            	loader: "postcss-loader"
	            }
            ]
        }]
    },
    plugins: [
		new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
})