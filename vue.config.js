const webpack = require('webpack')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin(),
      new webpack.ContextReplacementPlugin(/lazy-debug-legacy(\\|\/)src/, __dirname)
    ],
    externals: {
      'vue': 'Vue',
      'muse-ui': 'MuseUI'
    }
  }
}