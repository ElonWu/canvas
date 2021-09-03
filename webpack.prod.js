const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { DefinePlugin } = webpack;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { externals } = require('./defaultSettings.js');
const commonConfig = require('./webpack.common');

module.exports = (env, argv) => {
  const prodConfig = {
    mode: 'production',
    // externalsType: 'script',
    // externals,

    plugins: [
      new CleanWebpackPlugin(),
      new DefinePlugin({
        NODE_ENV: JSON.stringify('production'),
        WEBPACK_BUILD_TYPE: JSON.stringify(env.buildType),
      }),
    ],
  };

  return merge(commonConfig, prodConfig);
};
