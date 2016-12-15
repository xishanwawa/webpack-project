//webpack.config.js
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('[name]-[hash].css')
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
	entry: __dirname + "/app/main.js",  //入口文件
	output: {
		path: __dirname + "/public",    //打包后的文件存放目录
		//filename: "[name]-[hash].js"    //打包后输出的文件名
		filename: "[name]-min.js"    //打包后输出的文件名
	},
	// externals: {
    //     react: 'React',
    //     'react-dom': 'ReactDOM',
	// 	immutable: 'Immutable'
    // },
	module: {
		loaders:[
			{
				test: /\.json$/,
				exclude: /node_modules/,
			    loader: "json"
			},
			{
				test: /\.(js|jsx|ts)$/,
				exclude: /node_modules/,
				loader: "babel"
			},
			//填充style 样式
			{
                test: /\.(less)$/,
	            loaders: ['style', 'css', 'less'],
	        },
			{
                test: /\.(css)$/,
	            loaders: ['style', 'css'],
	        }
            // //生成独立的css文件
		    // {
	        //   test: /\.(less)$/,
	        //   loader: extractCSS.extract(['css', 'less'])
	        // },
		]
	},
	resolve: {
        extensions: ["", ".js", ".jsx"],
        alias: {
            actionsReducers: path.join(__dirname, 'app/actionsReducers'),
            components: path.join(__dirname, 'app/components'),
            containers: path.join(__dirname, 'app/components/containers'),
            store: path.join(__dirname, 'app/store'),
            routes: path.join(__dirname, 'app/routes'),
			MockData: path.join(__dirname, 'app/mock'),
        },
    },
	devtool: 'source-map',
	plugins: [
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./manifest.json'),
		}),
        new webpack.BannerPlugin("Copyright yangtianming Unicorns inc."), //在这个数组中new一个就可以了
        new HtmlWebpackPlugin({
	      template: __dirname + "/app/index.tmpl.html",
	    }),
	    new webpack.HotModuleReplacementPlugin(),                         //热加载插件
	    extractCSS,                                                        //生成独立文件插件，和module对应
		new OpenBrowserPlugin({ url: 'http://localhost:3000' }),
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
