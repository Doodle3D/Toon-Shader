const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.js',

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    alias: {
      'src': path.resolve(__dirname, 'src/')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          presets: ['es2015']
        }
      }, { // make THREE global available to three.js examples
        test: /three\/examples\/.+\.js/,
        use: 'imports-loader?THREE=three'
      }, {
				test: /\.glsl$/,
        use: 'raw-loader'
      }
    ]
  },

	plugins: [
    new HtmlWebpackPlugin({
      title: 'Toon Shader',
      template: require('html-webpack-template'),
      inject: false,
      appMountId: 'app'
    })
  ],

	devtool: devMode ? 'eval-source-map' : 'nosources-source-map'
};
