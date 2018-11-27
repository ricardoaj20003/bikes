var path = require('path');
const webpack = require('webpack')


module.exports = {
  entry: './js/app/index.js',
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
        }]
      }
    ]
  },
  plugins: [
    // Provides jQuery for other JS bundled with Webpack
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};
