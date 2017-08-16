const webpack = require('webpack')
const OBP = require('open-browser-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJs = require('uglifyjs-webpack-plugin')
const HTML = require('html-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path')
let BrowserSync = require('browser-sync-webpack-plugin')

const PATHS = {
  dev: path.join(__dirname, '../../dev'),
  dist: path.join(__dirname, '../../dist')
}

let extractStyles = new ExtractTextPlugin('[name].css')
let extractHtml = new ExtractTextPlugin('[name].html')

const common = {
  devtool: 'cheap-eval-source-map',
  entry: {
    index: [
      path.join(PATHS.dev, 'pug/index.pug'),
      path.join(PATHS.dev, 'styles/app.less'),
      path.join(PATHS.dev, 'js/main.js')
    ],
    price: [
      path.join(PATHS.dev, 'pug/price.pug'),
      path.join(PATHS.dev, 'styles/price.less'),
      path.join(PATHS.dev, 'js/price.js')
    ]
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js',
    publicPath: '/dist'
  },
  resolve: {
    extensions: ['.js', '.less', '.css', '.pug']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          PATHS.dev + '/js'
        ],
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader?pretty&exports=false'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader',
        query: {
          name: '/images/[name].[ext]'
        }
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: extractStyles.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[local]',
              sourceMap: true
            }
          },
            'less-loader'
          ]
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        query: {
          name: '/fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new OBP({url: 'http://localhost:3001', delay: 500}),
    new HTML({
      filename: '../index.html',
      chunks: ['index'],
      template: PATHS.dev + '/pug/index.pug'
    }),
    new HTML({
      filename: '../price.html',
      chunks: ['price'],
      template: PATHS.dev + '/pug/price.pug'
    }),
    extractStyles,
    extractHtml,
    new webpack.NoEmitOnErrorsPlugin(),
    new BrowserSync({
      host: 'localhost',
      port: 3000,
      server: { baseDir: PATHS.dev + '/..' }
    })
  ]
}

const developmentConfig = {
  devServer: {
    hotOnly: true,
    inline: true,
    lazy: true,
    clientLogLevel: 'info',
    noInfo: true,
    stats: 'errors-only'
  }
}

module.exports = function (env) {
  console.log('enveronmnent =', env)
  if (env === 'production') {
    return common
  }
  if (env === 'development') {
    return merge([common, developmentConfig])
  }
}
