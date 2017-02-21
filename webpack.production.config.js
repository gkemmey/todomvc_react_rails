const webpack = require("webpack");
let config = require("./webpack.config.js");

config.plugins = config.plugins || []

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
)

config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  warnings: true,
  sourceMap: true
}))

module.exports = config;
