var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'olasearch.init.min.js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './../../npm-olasearch/dist/olasearch.core.min.css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
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
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.BannerPlugin({ banner: "Copyright Ola Search Pte Ltd 2017", raw: false, entryOnly: true }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  module: {
    rules: [{
      test: /\.js?/,
      use: ['babel-loader'],
      exclude: /node_modules/,
      include: [
        path.join(__dirname, 'src'),
      ],
    },
    {
      test: /(\.scss|\.css)$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    }
    ]
  },
  resolve: {
    alias: {
      'OlaSearch': path.join(__dirname, './../npm-olasearch'),
      '@olasearch/core': path.join(__dirname, './../npm-olasearch'),
      '@olasearch/elasticsearch-adapter': path.join(__dirname, './../npm-olasearch-elasticsearch-adapter'),
      '@olasearch/solr-adapter': path.join(__dirname, './../npm-olasearch-solr-adapter'),
      '@olasearch/logger': path.join(__dirname, './../olasearch-logger-middleware'),
      'react': path.join(__dirname, './node_modules/react'),
      'react-dom': path.join(__dirname, './node_modules/react-dom'),
      'react-line-progress': path.join(__dirname, './../react-line-progress'),
      'olasearchconfig': path.join(__dirname, './src/config')
    },
    modules: [
      'node_modules', path.resolve(__dirname, './node_modules')
    ]
  },
  externals: {
    'olasearchconfig': 'OlaSearchConfig',
    "react": "React",
    "react-dom": "ReactDOM",
    "@olasearch/core": "OlaSearch",
    "redux": "Redux",
    "react-redux": "ReactRedux"
  }
}
