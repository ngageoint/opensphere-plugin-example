/* eslint-env es6 */
/* eslint-disable max-len */

const path = require('path');
const resolved = require(path.join(__dirname, '.build/resolved.json'));
const resolver = require('opensphere-build-resolver/utils');
const closureLibJsPattern = resolver.resolveModulePath('google-closure-library/**/*.js', __dirname);

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

      // source files for the script loader
      {pattern: 'src/**/*.js', watched: false, included: false, served: true},
      {pattern: 'test/**/*.js', watched: false, included: false, served: true},
      {pattern: path.join(resolved['opensphere'], '**/*.js'), watched: false, included: false, served: true},
      {pattern: closureLibJsPattern, watched: false, included: false, served: true},
      {pattern: resolver.resolveModulePath('openlayers/**/*.js', __dirname), watched: false, included: false, served: true},

      // serve the test manifest and include the script loader
      {pattern: '.build/gcc-test-manifest', watched: false, included: false, served: true},
      resolver.resolveModulePath('opensphere-build-index/karma-test-loader.js', __dirname)
    ],

    proxies: {
      // the test loader uses this path to resolve the manifest
      '/karma-test-scripts': path.resolve(__dirname, '.build', 'gcc-test-manifest')
    },

    // list of files to exclude
    exclude: [
      'src/main.js',
      '**/*.swp'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['dots', 'junit', 'coverage'],

    //
    // Preprocessors:
    //  - googmodule wraps goog.module files so they are loaded correctly by the browser
    //  - coverage provides test coverage reports
    //
    preprocessors: {
      'src/**/*.js': ['googmodule', 'coverage'],
      'test/**/*.mock.js': ['googmodule'],
      // support goog.module in all other js files in the workspace
      '../**/*.js': ['googmodule'],
      // support goog.module in Closure library
      [`${closureLibJsPattern}`]: ['googmodule']
    },

    junitReporter: {
      outputDir: '.build/test',
      outputFile: 'test-results.xml',
      useBrowserName: false
    },

    coverageReporter: {
      // Enforce test coverage in the build
      // Change this to your liking
      check: {
        global: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
          excludes: []
        },
        each: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
          excludes: [],
          overrides: {}
        }
      },
      includeAllSources: true,
      reporters: [{
        type: 'html',
        dir: '.build/test/coverage/html'
      }, {
        type: 'cobertura',
        dir: '.build/test/coverage/cobertura'
      }, {
        type: 'text-summary'
      }]
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

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['ChromeHeadless', 'FirefoxHeadless'],

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
