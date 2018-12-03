'use strict';

module.exports = function(karma) {
  karma.set({
    frameworks: ['jasmine', 'source-map-support'],
    files: [
      'src/tests.ts'
    ],
    reporters: ['progress', 'junit', 'coverage'],
    junitReporter: {
      outputDir: 'coverage/junit/', // results will be saved as $outputDir/$browserName.xml
      //outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: '', // suite will become the package name attribute in xml testsuite element
      useBrowserName: true // add browser name to report and classes names
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'html', subdir: 'html'},
        {type: 'json', subdir: 'json'},
        {type: 'lcov', subdir: 'report-lcov'},
        {type: 'text-summary'}
      ]
    },
    preprocessors: {
      'src/tests.ts': ['webpack']
    },
    webpack: {
      mode: 'development',
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
              configFileName: 'tsconfig.test.json',
              usePrecompiledFiles: false,
              transpileOnly: true,
              isolatedModules: false,
              useCache: false
            },
            exclude: /(dist|node_modules|lib)$/
          },
          {
            enforce: 'post',
            test: /\.ts$/,
            loader: 'istanbul-instrumenter-loader',
            exclude: /(node_modules|\.spec\.ts)$/
          }
        ]
      },
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