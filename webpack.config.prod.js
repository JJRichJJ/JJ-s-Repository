var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: false,
  entry: [
    'babel-polyfill',
    // fetch polyfill
    'whatwg-fetch',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader' // creates style nodes from JS strings
      }, {
        loader: 'css-loader',
        options: {
          module: true,
          camelCase: true
        }
      }, {
        loader: 'sass-loader',
      }]
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }]
    }]
  }
};
