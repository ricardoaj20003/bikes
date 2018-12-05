var path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  entry: ['./css/base.css'],
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'js')
  },
  module: {
    rules: [
      // any other rules
      {
        // Exposes jQuery for use outside Webpack build
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        },{
          loader: 'expose-loader',
          options: '$'
        }
        ],
      },{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          loader: 'css-loader',
          options: {
            minimize: true,
          },
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true 
            }
            //options: {
              //name: '[path][name].[ext]',
              //emitFile: false,
            //},
          },
        ]
      },
      {
        test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {},
      },
    ]
  },
  plugins: [
    // Provides jQuery for other JS bundled with Webpack
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new ExtractTextPlugin( {
      filename: '../css/bundle.css',
    }),
    //new UglifyJsPlugin({
      //cache: true,
      //parallel: true,
      //uglifyOptions: {
        //compress: false,
        //ecma: 6,
        //mangle: true,
      //},
      //sourceMap: true,
    //}),
  ],
  //resolve: {
    //extensions: ['', '.js', '.scss'],
    //modulesDirectories: ['js', 'node_modules']
  //}
};
