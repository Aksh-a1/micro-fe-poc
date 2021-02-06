const path = require('path')
const commonWebpackConfig = require('./webpack.common')
const { merge } = require('webpack-merge')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const findAPort = require('../utils/findAPort')

module.exports = async () => merge(commonWebpackConfig, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [new HTMLWebpackPlugin({
    template: './src/index.html'
  })],
  devServer: {
    port: await findAPort()
  },
})