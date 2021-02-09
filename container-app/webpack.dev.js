const path = require('path')
const webpack = require('webpack')
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
  }),
  new webpack.DefinePlugin({
    "process.env.ENVIRONMENT": JSON.stringify("development")
  })],
  devServer: {
    port: env.PORT
  },
})