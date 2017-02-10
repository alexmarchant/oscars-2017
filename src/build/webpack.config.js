const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '..', 'scripts', 'bundle.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '..', '..', 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }, {
				test: /\.css$/,
				loader: 'style-loader!css-loader'
      }, {
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			}, {
        test: /\.jpg$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Oscar Pool 2017',
    favicon: path.resolve(__dirname, '..', 'images', 'favicon.ico'),
    template: path.resolve(__dirname, '..', 'templates', 'index.ejs'),
  })],
  devtool: 'cheap-module-eval-source-map',
};
