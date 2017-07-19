import Path from 'path'

import Webpack from 'webpack'

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    vendor: ['babel-polyfill', Path.join(__dirname, 'src', 'vendors.js')],
  },
  output: {
    path: Path.join(__dirname, 'dist', 'dll'),
    filename: 'dll.[name].js',
    library: '[name]',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true, // important for performance
          plugins: ['transform-regenerator'],
          presets: [
            'react',
            ['es2015', { modules: false }],
            'stage-0',
          ],
        },
      },
    ],
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new Webpack.DllPlugin({
      path: Path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]',
      context: Path.resolve(__dirname, 'src'),
    }),
    new (Webpack.optimize.OccurenceOrderPlugin || Webpack.optimize.OccurrenceOrderPlugin)(),
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new Webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],
  resolve: {
    modules: [Path.resolve(__dirname, 'src'), 'node_modules'],
  },
}
