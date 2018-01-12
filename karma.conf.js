// Karma configuration
const path = require('path');
const helper = require('opensphere-build-closure-helper');
var resolver = require('opensphere-build-resolver/utils');

module.exports = function(config) {
  var closureFiles = helper.readManifest(path.resolve('.build', 'gcc-test-manifest'))
    .filter(function(item) {
      return item.indexOf('/src/core/debugutil.js') === -1 &&
        item.indexOf('test/') !== 0;
    });

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
      {pattern: resolver.resolveModulePath('moment/min/moment.min.js', __dirname), watched: false, included: true, served: true},
      {pattern: resolver.resolveModulePath('cesium/Build/Cesium/Cesium.js', __dirname), watched: false, included: true, served: true}
    ].concat(closureFiles).concat([
      // {pattern: resolver.resolveModulePath('opensphere/test/init.js', __dirname), watched: false, included: true, served: true},

      // tests and mocks
      'test/**/*.mock.js',
      'test/**/*.test.js',

      // test resources
      {pattern: 'test/**/*.json', included: false},
      {pattern: 'test/**/*.xml', included: false},
      {pattern: 'test/resources/**/*', included: false}
    ]),

    // list of files to exclude
    exclude: [
      'src/main.js',
      '**/*.swp'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['dots', 'junit', 'coverage'],

    preprocessors: {
      'src/**/*.js': ['coverage']
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

    //Write console output to terminal window
    client: {
      captureConsole: true
    }
  });
};
