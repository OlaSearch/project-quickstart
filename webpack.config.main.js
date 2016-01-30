var path = require('path');
var webpack = require('webpack');

module.exports = {  
  entry: [
    './src/main'
  ],
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'olasearch.min.js',
    library: 'OlaSearch',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
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
      loaders: ['babel'],
      include: path.join(__dirname, 'src')      
    }, 
      { test: require.resolve("react"), loader: "expose?React" },
      { test: require.resolve("react-dom"), loader: "expose?ReactDOM" },
      { test: /ramda/, loader: "expose?R" }
    ]
  },
  resolve: {
    alias: {
      'olasearch': path.join(__dirname, './../npm-olasearch')
    },
    fallback: path.resolve(__dirname, './node_modules')
  },
  resolveLoader: {
      fallback: path.resolve(__dirname, './node_modules')
  }
};
