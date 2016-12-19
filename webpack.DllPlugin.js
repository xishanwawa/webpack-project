const webpack = require('webpack');

const vendors = [
  'react',
  'react-dom',
  'redux',
  'immutable',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux-logger',
  'redux-thunk',
  'isomorphic-fetch',
  'keymirror',
  'reqwest',
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
    })
  ],
};