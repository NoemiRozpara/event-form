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
		},
		{
            test: /\.scss$/,
            use: [{
	                loader: "style-loader"
	            }, {
	                loader: "css-loader"
	            }, {
	                loader: "sass-loader",
	                options: {
	                    implementation: require("node-sass")
	                }
	            }]
        },
        {
            test: /\.css$/,
            use: [{
	                loader: "style-loader"
	            }, {
	                loader: "css-loader"
	            } ]
        } ]
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
});
