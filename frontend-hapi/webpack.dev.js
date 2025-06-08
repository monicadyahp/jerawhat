const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: common.output.path,
    },
    compress: true,
    port: 9000, // Port untuk development server
    historyApiFallback: true, // Penting untuk routing SPA
  },
});