var path = require('path');
var webpack = require('webpack');

module.exports = {  
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'olasearch.config.min.js'
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
      { test: require.resolve("react"), loader: "expose?React" }
    ]
  },
  externals: {    
    "react": "React",
    "react-dom": "ReactDOM",
    "olasearch": "OlaSearch",
    "ramda": "R"
  }
};
