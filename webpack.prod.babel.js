import Path from 'path'

import ExtractTextPlugin from 'extract-text-webpack-plugin'
import Webpack from 'webpack'
import Copy from 'copy-webpack-plugin'

import manifest from './dll/vendor-manifest.json'

export default {
  context: Path.resolve(__dirname, 'src'),
  devtool: 'cheap-module-source-map',
  entry: {
    index: [
      'babel-polyfill',
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
      config: Path.join(__dirname, 'config', process.env.NODE_ENV || 'production'),
      modules: Path.join(__dirname, 'node_modules'),
      common: Path.join(__dirname, 'src', 'common'),
      components: Path.join(__dirname, 'src', 'components'),
      wrappers: Path.join(__dirname, 'src', 'wrappers'),
    },
    modules: ['node_modules'],
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
            ['es2015', { modules: false }],
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
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new Webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new Webpack.DllReferencePlugin({
      context: Path.resolve(__dirname, 'src'),
      manifest: manifest,
    }),
    new Copy([
      { from: 'web.config' }, // for iis and using url rewrite config to support cerebral-routing
      { from: '**/*.html' },
      { from: 'static' },
      { from: '../node_modules/font-awesome/fonts', to: 'fonts' },
      { from: '../node_modules/font-awesome/css/font-awesome.min.css' },
      { from: '../node_modules/react-big-calendar/lib/css/react-big-calendar.css' },
    ]),
    new ExtractTextPlugin('style.css'),
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    // new Webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks (module) {
    //     return module.context && module.context.indexOf('node_modules') !== -1
    //   },
    // }),
  ],
}
