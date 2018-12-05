'use strict';
const webpack = require('webpack');
const {resolve} = require('path');

module.exports = function(env, argv) {
  const srcPath = resolve(__dirname, 'src', 'index.ts');
  const playerUiPath = resolve(__dirname, 'lib', 'uimanager', 'main.ts');
  const hivePath = resolve(__dirname, 'lib', 'hive', 'bitmovin.hive.min.js');
  const dstPath = resolve(__dirname, 'dist');
  const devtool = argv.mode === 'production' ? false : 'cheap-module-source-map';
  const filename = argv.mode === 'production' ? 'mi-angular-bitdash-player.js' : 'mi-angular-bitdash-player.dev.js';

  return {
    entry: [srcPath, playerUiPath, hivePath],
    output: {
      path: dstPath,
      filename: filename
    },
    context: resolve(__dirname, 'src'),
    devtool: devtool,
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.ts$/,
          loader: 'tslint-loader',
          options: {
            tsConfigFile: 'tsconfig.json',
            formatter: "codeFrame",
            configFile: false,
            emitErrors: true,
            failOnHint: true,
            fix: false
          },
          exclude: [/(test|node_modules|lib|\.spec\.ts)/]
        },
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader',
          options: {
            usePrecompiledFiles: false,
            transpileOnly: false,
            isolatedModules: false,
            useCache: false,
            configFileName: resolve(__dirname, 'tsconfig.json')
          },
          exclude: [/(test|node_modules|\.spec\.ts)/]
        }
      ],
      noParse: [hivePath]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    externals: {
      'angular': 'angular'
    }
  };
};
