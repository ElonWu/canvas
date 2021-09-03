const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {
  title,
  description,
  keywords,
  shareOptions = [],
  favicon,
  alias = {},
} = require('./defaultSettings.js');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/', // 否则 browser-router 子路由会定位错误
    filename: '[name]_[contenthash].js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.ejs'),
      title, // 页面标题
      description, // 描述、关键字
      keywords, // 描述、关键字
      shareOptions,
      favicon: path.resolve(__dirname, './public', favicon), // logo
    }),
    // css 文件单独拆分出来
    new MiniCssExtractPlugin({ filename: 'main.[contenthash].css' }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        loader: 'ts-loader',
        include: [path.resolve('./src')],
      },
      {
        test: [/\.css$/],
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          // },
          'style-loader',
          'css-loader',
        ],
      },

      {
        oneOf: [
          // 小于 10m 的文件通过转成 baseurl, 避免打包成静态文件（增加请求）
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[path][name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(png|jpe?g|gif|svg|tff|wav|mp3)$/i,
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.tsx',
      '.css',
      '.png',
      '.jpg',
      '.svg',
      '.wav',
      '.mp3',
    ],
    alias: {
      '@': path.resolve(__dirname, './src'),
      ...alias,
    },
  },

  // 提升打包效率
  optimization: {
    moduleIds: 'deterministic',

    // 浏览器运行时， runtime 衔接各打包后的chunk
    runtimeChunk: {
      // manifest 则是记录模块要点以及模块之间关系的文件
      // 通过对比更新前后的 manifest 可以对未更新的 chunk 使用缓存，以达到性能提升
      name: 'manifest',
    },
    // 将第三方库单独打包
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  cache: {
    type: 'filesystem',
    version: '1.0',
    buildDependencies: {
      config: [__filename],
    },
  },
};
