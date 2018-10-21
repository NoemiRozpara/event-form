const common = require("./webpack.common.js");
const merge = require("webpack-merge");

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist'
	},
	module: {
	    rules: [
		{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader"
			}
		},
		{
			test: /\.html$/,
			use:
			{
				loader: "html-loader"
			}
		} ]
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
});
