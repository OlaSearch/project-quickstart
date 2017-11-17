var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// var { WebpackBundleSizeAnalyzerPlugin } = require('webpack-bundle-size-analyzer')

module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'olasearch.init.min.js'
  },
  plugins: [
    // new WebpackBundleSizeAnalyzerPlugin('./size.txt'),
    new ExtractTextPlugin({
      filename: './assets/styles/ola.core.min.css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        // 'NODE_ENV': JSON.stringify('production'),
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
      'olasearch/src': path.join(__dirname, './../npm-olasearch/src'),
      'react': path.join(__dirname, './node_modules/react'),
      'react-dom': path.join(__dirname, './node_modules/react-dom')
    },
    modules: [
      'node_modules', path.resolve(__dirname, './node_modules')
    ]
  },
  externals: {
    'olasearchconfig': 'OlaSearchConfig',
    "react": "React",
    "react-dom": "ReactDOM",
    "olasearch": "OlaSearch",
    "redux": "Redux",
    "react-redux": "ReactRedux"
  }
}
