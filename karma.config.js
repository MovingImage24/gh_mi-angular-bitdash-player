'use strict';
const {resolve} = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CleanCompiledJS = ['src/**/*.js', 'lib/uimanager/**/*.js', 'interface/*.js'];

module.exports = function(karma) {
  karma.set({
    frameworks: ['jasmine', 'source-map-support'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/**/*.ts'
    ],
    reporters: ['jasmine-diff', 'progress', 'junit', 'coverage', 'coveralls'],
    junitReporter: {
      outputDir: 'coverage/junit/', // results will be saved as $outputDir/$browserName.xml
      //outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: '', // suite will become the package name attribute in xml testsuite element
      useBrowserName: true // add browser name to report and classes names
    },
    jasmineDiffReporter: {
      color: {
        expectedBg: 'bgRed',
        expectedWhitespaceBg: 'bgRed',
        expectedFg: 'white',

        actualBg: 'bgGreen',
        actualWhitespaceBg: 'bgGreen',
        actualFg: 'white',

        warningBg: 'bgYellow',
        warningWhitespaceBg: 'bgYellow',
        warningFg: 'white',

        defaultBg: 'bgBlue',
        defaultFg: 'white'
      },
      pretty: false,
      multiline: false,
      verbose: true,
      matchers: {}
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'html', subdir: 'html-js'},
        {type: 'json', subdir: 'json'},
        {type: 'lcov', subdir: 'report-lcov'},
        {type: 'text-summary'}
      ]
    },
    preprocessors: {
      'src/**/*.ts': ['webpack']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.ts$/,
            loader: 'tslint-loader',
            exclude: [/(src|node_modules)/]
          },
          {
            test: /\.ts$/,
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: 'tsconfig/tsconfig.test.json',
              usePrecompiledFiles: false,
              transpileOnly: true,
              isolatedModules: false,
              useCache: false
            },
            exclude: [/(dist|node_modules|lib)\//]
          },
          {
            enforce: 'post',
            test: /\.ts$/,
            loader: 'istanbul-instrumenter-loader',
            exclude: /(tests|node_modules|\.spec\.ts)$/
          }
        ]
      },
      externals: {
        'angular': 'angular'
      },
      plugins: [
        new webpack.LoaderOptionsPlugin({
          options: {
            tslint: {
              tsConfigFile: 'tsconfig/tsconfig.test.json',
              formatter: "codeFrame",
              configFile: false,
              emitErrors: true,
              failOnHint: true,
              fix: false
            }
          }
        }),
        new CleanWebpackPlugin(CleanCompiledJS,
          {
            root: resolve('.'),
            verbose: true,
            dry: false
          })
      ],
      resolve: {
        extensions: ['.ts', '.js']
      }
    },
    webpackMiddleware: {noInfo: true},
    port: 9876,
    colors: true,
    logLevel: karma.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  });
};