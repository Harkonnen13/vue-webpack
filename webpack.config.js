const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },
  entry: {
    index: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options:{
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties','@babel/plugin-syntax-dynamic-import']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      { test: /\.html$/, use: ['html-loader'] },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'img/',
              publicPath: 'img/'
            }  
          }
        ]
      },
    ]
  },
  devServer: {
    publicPath: '/',
    compress: true,
    port: 3000,
    host: 'localhost',
    stats: 'minimal',
    open: true,
    watchOptions: {
      poll: true
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      outputPath:'css/',
      publicPath: 'css/',
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].chunk.css',
    })
  ],
  optimization: {
    namedChunks: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
        }
      }
    }
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
};