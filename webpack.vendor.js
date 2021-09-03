const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    vendor: ['react', 'react-dom'],
  },
  output: {
    filename: 'dll_[name].js',
    library: '[name]_[hash]',
    path: path.resolve(__dirname, 'cache'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      format: true,
      context: path.join(__dirname, 'src'),
      path: path.join(__dirname, 'cache', 'mainfest.json'),
      name: '[name]_[hash]',
    }),
  ],
};
