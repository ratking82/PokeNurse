import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'

export default merge(baseConfig, {
  devtool: 'source-map',

  entry: ['babel-polyfill', './main.development.js'],

  output: {
    path: __dirname,
    filename: './main.js'
  },

  plugins: [
    // TODO PogoBuf breaks uglifier
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     warnings: false
    //   }
    // }),
    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      { raw: true, entryOnly: false }
    ),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],

  target: 'electron-main',

  node: {
    __dirname: false,
    __filename: false
  },

  externals: [
    'font-awesome',
    'source-map-support',
    'pogobuf',
    'node-pogo-protos',
    'electron-devtools-installer',
    'bootstrap'
  ],

  noParse: /json-schema\/lib\/validate\.js/
})