'use strict';
const webpack = require('webpack');
const {resolve} = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function (env) {
  const srcPath = resolve(__dirname, 'src', 'index.ts');
  const libPath = resolve(__dirname, 'lib', 'main.ts');
  const dstPath = resolve(__dirname, 'dist');
  const devtool = env.prod ? 'inline-source-map' : '';
  const filename = env.prod ? 'mi-angular-bitdash-player.js' : 'mi-angular-bitdash-player.min.js';
  const CleanCompiledJS = ['lib/**/*.js', 'src/**/*.js', 'lib/components/*.js', 'interfaces/*.js'];
  const cleanArray = array => array.filter((item) => !!item);
  const ifMin = plugin => (env.min ? plugin : undefined);

  return {
    entry: [srcPath, libPath],
    output: {
      path: dstPath,
      filename: filename,
      pathinfo: env.dev
    },
    context: resolve(__dirname, 'src'),
    devtool: devtool,
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.ts$/,
          loader: 'tslint-loader',
          exclude: [/(test|node_modules|lib)/]
        },
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader',
          options: {
            usePrecompiledFiles: false,
            transpileOnly: false,
            isolatedModules: false,
            useCache: false,
            configFileName: 'tsconfig/tsconfig.app.json'
          },
          exclude: [/(test|node_modules)/]
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    plugins: cleanArray([
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        quiet: true,
        options: {
          tslint: {
            tsConfigFile: 'tsconfig/tsconfig.app.json',
            formatter: "codeFrame",
            configFile: false,
            emitErrors: true,
            failOnHint: true,
            fix: false
          }
        }
      }),
      ifMin(new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false}
      })),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new CleanWebpackPlugin(CleanCompiledJS,
        {
          root: resolve('.'),
          verbose: true,
          dry: false
        }),
    ]),
    externals: {
      'angular': 'angular'
    }
  };
};
