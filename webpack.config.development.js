const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: '#inline-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'flashing.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname),
    publicPath: '/dist',
    compress: true,
    overlay: {
      warnings: true,
      errors: true
    },
    port: 9000
  }
};
