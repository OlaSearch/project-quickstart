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
        'NODE_ENV': JSON.stringify('production'),
        'OLA_ENV': JSON.stringify('production')
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
  resolve: {
    alias: {
      // 'olasearch': path.join(__dirname, './../npm-olasearch'),
      // 'olasearch-elasticsearch-adapter': path.join(__dirname, './../npm-olasearch-elasticsearch-adapter'),
      // 'olasearch-logger-middleware': path.join(__dirname, './../olasearch-logger-middleware'),
      // 'reqwest': path.join(__dirname, './../reqwest'),
    },
    fallback: path.resolve(__dirname, './node_modules')
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "olasearch": "OlaSearch",
    "ramda": "R",
    "redux": "Redux",
    "react-redux": "ReactRedux"
  }
};
