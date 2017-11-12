var webpack = require('webpack');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
//var path = require('path');

var debug = true; /*process.env.NODE_ENV !== "production"*/;

module.exports = {
  entry: './app/require/index.js',
  output: {
     filename: './public/js/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: "css-loader"
    }]
  },
/*
  plugins: debug ? [] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
*/
};
