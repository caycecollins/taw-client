import Fs from 'fs'
import Path from 'path'

import ExtractTextPlugin from 'extract-text-webpack-plugin'
import Webpack from 'webpack'
import Copy from 'copy-webpack-plugin'

import manifest from './dll/vendor-manifest.json'

let local = {}
const configFileString = './config/' + (process.env.NODE_ENV || 'development.js')
if (Fs.existsSync(configFileString)) {
  Object.assign(local, require(configFileString).default.webpack)
}

export default {
  devtool: 'cheap-module-eval-source-map',
  context: Path.resolve(__dirname, 'src'),
  watch: true,
  entry: {
    index: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './index.js',
    ],
  },
  output: {
    path: Path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      config: Path.join(__dirname, 'config', process.env.NODE_ENV || 'development'),
      modules: Path.join(__dirname, 'node_modules'),
      common: Path.join(__dirname, 'src', 'common'),
      components: Path.join(__dirname, 'src', 'components'),
      wrappers: Path.join(__dirname, 'src', 'wrappers'),
    },
    modules: ['node_modules'],
  },
  devServer: {
    contentBase: Path.resolve(__dirname, 'dist'),
    host: local.host || 'localhost',
    port: local.port || 9000,
    compress: local.compress || false,
    historyApiFallback: true,
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: false,
          presets: [
            'react',
            ['env', { modules: false }],
            'stage-0',
          ],
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap!sass-loader?sourceMap',
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap!sass-loader?sourceMap',
        }),
      },
      {
        test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'url-loader?limit=10000',
      },
    ],
  },
  plugins: [
    new Copy([
      { from: '**/*.html' },
      { from: 'static' },
      { from: '../node_modules/font-awesome/fonts', to: 'fonts' },
      { from: '../node_modules/font-awesome/css/font-awesome.min.css' },
      { from: '../node_modules/react-big-calendar/lib/css/react-big-calendar.css' },

    ]),
    new Webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      },
    }),
    new Webpack.DllReferencePlugin({
      context: Path.resolve(__dirname, 'src'),
      manifest: manifest,
    }),
    new ExtractTextPlugin('style.css'),
    new Webpack.NamedModulesPlugin(),
    new Webpack.optimize.ModuleConcatenationPlugin(),
    // new Webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks (module) {
    //     return module.context && module.context.indexOf('node_modules') !== -1
    //   },
    // }),
  ],
}
