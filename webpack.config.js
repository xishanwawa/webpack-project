//webpack.config.js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('[name]-[hash].css')

module.exports = {
	entry: __dirname + "/app/main.js",  //入口文件
	output: {
		path: __dirname + "/public",    //打包后的文件存放目录
		filename: "[name]-[hash].js"    //打包后输出的文件名
	},
	module: {
		loaders:[
			{
				test: /\.json$/,
				exclude: /node_modules/,
			    loader: "json"
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel"
			},
			//填充style 样式
			{
                test: /\.(less)$/,
                exclude: /node_modules/,
	            loaders: ['style', 'css', 'less'],
	        },
            //生成独立的css文件
		    // {
	        //   test: /\.(less)$/,
	        //   loader: extractCSS.extract(['css', 'less'])
	        // }, 
		]
	},
	externals: {'react': 'React', 'react-dom': 'ReactDOM'},
	devtool: 'source-map',
	plugins: [
        new webpack.BannerPlugin("Copyright yangtianming Unicorns inc."), //在这个数组中new一个就可以了
        new HtmlWebpackPlugin({
	      template: __dirname + "/app/index.tmpl.html",
	    }),
	    new webpack.HotModuleReplacementPlugin(),                         //热加载插件
	    extractCSS                                                        //生成独立文件插件，和module对应
    ],
	devServer: {
		headers: {
            "Access-Control-Allow-Origin": "*"
        },
		contentBase: "./public",                                          //本地服务器所加载的页面所在的目录
	    colors: true,                                                     //终端中输出结果为彩色
	    historyApiFallback: true,                                         //不跳转
	    inline: true,                                                     //实时刷新
	    hot: true,
	    port: 3000,
	}
}