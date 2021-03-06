
var webpack = require('webpack');
var path = require('path');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('[name]-[hash].css')
module.exports = {
	entry: {
      main: __dirname + "/app/main.js",  //入口文件
		  vendor: ['antd']
	},
	output: {
		path: __dirname + "/public",    //打包后的文件存放目录
		// publicPath: __dirname + "/public",
		filename: "[name]-[hash:8].js",   //打包后输出的文件名
		chunkFilename: '[id].[chunkhash:8].chunk.js'
	},
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
			// //填充style 样式
			// {
      //           test: /\.(less)$/,
	    //         loaders: ['style', 'css', 'less'],
	    //     },
			// {
      //           test: /\.(css)$/,
	    //         loaders: ['style', 'css'],
	    //     }
      //生成独立的css文件
      {
          test: /\.(less)$/,
          loader: extractCSS.extract(['css', 'less'])
      },
		]
	},
	resolve: {
      extensions: ["", ".js", ".jsx"],
      alias: {
            actionsReducers: path.join(__dirname, 'app/actionsReducers'),
            components: path.join(__dirname, 'app/components'),
            containers: path.join(__dirname, 'app/containers'),
            store: path.join(__dirname, 'app/store'),
            routes: path.join(__dirname, 'app/routes'),
            assets: path.join(__dirname, 'app/assets'),
            mockData: path.join(__dirname, 'app/mockData'),
        },
  },
	plugins: [
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./manifest.json'),
		}),
    new webpack.BannerPlugin("Copyright yangtianming Unicorns inc."), //在这个数组中new一个就可以了
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html",
    }),
	  extractCSS,                                                        //生成独立文件插件，和module对应
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
		new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 10240
        }),
    ]
}
