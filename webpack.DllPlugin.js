const webpack = require('webpack');

const vendors = [
  'antd',
  'isomorphic-fetch',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux',
  'redux-logger',
  'redux-thunk',
  'immutable',
  'reqwest',
  'mockjs',
];

module.exports = {
  output: {
    path: 'public',
    filename: '[name].[chunkhash].js',
    library: '[name]_[chunkhash]',
  },
  entry: {
    vendor: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]_[chunkhash]',
      context: __dirname,
    }),
  ],
};