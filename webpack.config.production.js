var path = require('path');
var webpack = require('webpack');
var MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  mode: 'production',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'olasearch.init.min.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'olasearch.core.min.css',
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
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new webpack.BannerPlugin({ banner: "Copyright Ola Search Pte Ltd.", raw: false, entryOnly: true }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  module: {
    rules: [{
      test: /\.js?/,
      use: ['babel-loader'],
      exclude: /node_modules/,
      include: [
        path.join(__dirname, 'src')
      ],
    },
    {
      test: /(\.scss|\.css)$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('autoprefixer')({browsers: ['last 3 versions', 'iOS 9']}),
            ]
          }
        }, 'sass-loader']
      
    }
    ]
  },
  externals: {
    moment: 'moment'
  },
  resolve: {
    alias: {
      'OlaSearch': '@olasearch/core',
      'olasearchconfig': path.join(__dirname, './src/olasearch.config'),
    },
    modules: [
      'node_modules', path.resolve(__dirname, './node_modules')
    ]
  }
}
