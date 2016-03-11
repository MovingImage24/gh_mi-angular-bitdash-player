'use strict';

module.exports = function (karma) {
  karma.set({

    frameworks: ['jasmine'],

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/index.js',
      'test/**/*spec.js'
    ],

    reporters: ['progress', 'coverage', 'coveralls'],

    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
      ]
    },
    preprocessors: {
      'src/index.js': ['webpack'],
      'test/**/*spec.js': ['webpack']
    },

    browsers: ['PhantomJS'],

    logLevel: karma.LOG_INFO,

    singleRun: true,

    webpack: {
      module: {
        postLoaders: [{ // << add subject as webpack's postloader
          test: /\.js$/,
          exclude: /(test|node_modules)\//,
          loader: 'istanbul-instrumenter'
        }]
      }
    }
  });
};