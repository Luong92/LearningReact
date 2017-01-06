var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');

// resolve: {
//   extensions: ['','.js', '.jsx']
// },

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./app/client.js",
  // resolveLoader: {
  //   root: path.join(__dirname, 'node_modules')
  // },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
  },

  output: {
    //path: path.join(__dirname + "/src/",'build'),
    path: path.join(__dirname, "src"),
    filename: 'bundle.js',
    //publicPath: '/scripts/'
  },
  plugins: debug ? [] : [
     new webpack.optimize.DedupePlugin(),
     new webpack.optimize.OccurenceOrderPlugin(),
     new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
 ],
};
