var path = require('path');
var webpack = require('webpack');

// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// var WebpackErrorNotificationPlugin = require('webpack-error-notification');

module.exports = {
  // bundle個體&其來源
  entry: {
    index: './src/index.js'
  },
  //輸出位置
  output: {
    path: path.resolve(__dirname, 'build'), //webpack 建置專案的路徑
    // publicPath: "http://localhost:3000/build/", //css引入url時參考的路徑
    filename: 'bundle.js'
  },

  //命名空間與副檔名省略
  resolve: {
    root: [],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.scss', '.css', 'config.js']
  },

  // Assets處理加載器
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: ['transform-runtime']
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader?sourceMap'
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader?sourceMap!sass-loader?sourceMap'
    }, {
      test: /\.(jpe?g|JPE?G|png|PNG|gif|GIF|svg|SVG|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=1024&name=[sha512:hash:base64:7].[ext]'
    }]
  },

  devtool:'source-map',

  // 自動在檔案變更時進行bundle
  // watch: true,

  // 插件功能
  plugins: []
}
