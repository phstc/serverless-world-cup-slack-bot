const path = require('path')
const externals = require('webpack-node-externals')
const slsw = require('serverless-webpack')

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
    filename: '[name].js'
  },
  stats: 'minimal',
  target: 'node',
  devtool: 'source-map',
  externals: [
    externals({
      whitelist: [/source-map.*/]
    })
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  }
}
