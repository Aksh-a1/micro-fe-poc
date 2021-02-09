const path = require('path')
const commonWebpackConfig = require('./webpack.common')
const { merge } = require('webpack-merge')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = async (env) => merge(commonWebpackConfig, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [new HTMLWebpackPlugin({
    template: './src/index.html'
  })],
  devServer: {
    publicPath: '/app2',
    port: env.PORT
  },
})