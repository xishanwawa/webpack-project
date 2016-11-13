//webpack.config.js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: __dirname + "/app/main.js", //入口文件
	output: {
		path: __dirname + "/public",    //打包后的文件存放目录
		filename: "bundle.js"           //打包后输出的文件名
	},
	module: {
		loaders:[
			{
				test: /\.json$/,
			    loader: "json"
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel"
			},
			{
		        test: /\.css$/,
		        loader: 'style!css?modules!postcss'//添加对样式表的处理
		        //loader: extractCSS.extract(['css'])
		    }
		]
	},
	devtool: 'source-map',
	postcss: [
	    require('autoprefixer')//调用autoprefixer插件
	],
	plugins: [
        new webpack.BannerPlugin("Copyright yangtianming Unicorns inc."),//在这个数组中new一个就可以了
        new HtmlWebpackPlugin({
	      template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
	    }),
	    new webpack.HotModuleReplacementPlugin(),//热加载插件
    ],
	devServer: {
		headers: {
            "Access-Control-Allow-Origin": "*"
        },
		contentBase: "./public",//本地服务器所加载的页面所在的目录
	    colors: true,//终端中输出结果为彩色
	    historyApiFallback: true,//不跳转
	    inline: true,//实时刷新
	    hot: true
	}
}