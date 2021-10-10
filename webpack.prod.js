const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  plugins: [
      new CompressionPlugin({
          test: /\.js$|\.css$|\.html$/,
          algorithm: "gzip",
          threshold: 10240,
          minRatio: 0.8
      }),
  ],
});