/* eslint-env es6 */
/* eslint-disable max-len */

const path = require('path');
const resolver = require('opensphere-build-resolver/utils');

/**
 * Karma configuration.
 *
 * Development Note:
 * This configuration uses a script loader to avoid pending request limits in Chrome. To limit which tests run during
 * development, use `ddescribe` and `iit` to instruct Jasmine to only run those specs.
 *
 * @param {Object} config The config.
 */
module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // frameworks to use
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      {pattern: '.build/modernizr.js', watched: false, included: true, served: true},
      {pattern: resolver.resolveModulePath('opensphere-asm/dist/os-wasm.*', __dirname), watched: false, included: false, served: true},
      {pattern: resolver.resolveModulePath('opensphere-asm/dist/os-asm.*', __dirname), watched: false, included: false, served: true},
      {pattern: resolver.resolveModulePath('opensphere-asm/dist/os-load.js', __dirname), watched: false, included: true, served: true},
      {pattern: resolver.resolveModulePath('crossfilter2/crossfilter.min.js', __dirname), watched: false, included: true, served: true},
      {pattern: resolver.resolveModulePath('moment/min/moment.min.js', __dirname), watched: false, included: true, served: true},
      {pattern: resolver.resolveModulePath('jquery/dist/jquery.min.js', __dirname), watched: false, included: true, served: true},
      {pattern: resolver.resolveModulePath('angular/angular.js', __dirname), watched: false, included: true, served: true},
      {pattern: resolver.resolveModulePath('angular-animate/angular-animate.js', __dirname), watched: false, included: true, served: true},
      {pattern: resolver.resolveModulePath('angular-sanitize/angular-sanitize.js', __dirname), watched: false, included: true, served: true},
      {pattern: resolver.resolveModulePath('angular-mocks/angular-mocks.js', __dirname), watched: false, included: true, served: true},
      {pattern: resolver.resolveModulePath('d3/d3.min.js', __dirname), watched: false, included: true, served: true},
      {pattern: resolver.resolveModulePath('jsts/dist/jsts.min.js', __dirname), watched: false, included: true, served: true},

      // load the test dependency bundle generated by webpack
      path.join('.build', 'test.bundle.js'),

      // load tests
      'test/**/*.test.js'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage-istanbul'
    reporters: ['dots', 'junit', 'coverage-istanbul'],

    //
    // Configuration for karma-coverage-istanbul-reporter.
    // @see https://www.npmjs.com/package/karma-coverage-istanbul-reporter
    //
    coverageIstanbulReporter: {
      dir: path.join('.build', 'test', 'coverage'),
      reports: ['html', 'text-summary'],
      combineBrowserReports: true,
      fixWebpackSourcePaths: true,
      'report-config': {
        // all options available at: https://github.com/istanbuljs/istanbuljs/blob/73c25ce79f91010d1ff073aa6ff3fd01114f90db/packages/istanbul-reports/lib/html/index.js#L257-L261
        html: {
          // outputs the report in ./coverage/html
          subdir: 'html'
        }
      }
    },

    junitReporter: {
      outputDir: '.build/test',
      outputFile: 'test-results.xml',
      useBrowserName: false
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    customLaunchers: {
      ChromeNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['ChromeNoSandbox', 'FirefoxHeadless'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // If the browser takes a nap, wait for it
    browserNoActivityTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    // Write console output to terminal window
    client: {
      captureConsole: true
    }
  });
};
