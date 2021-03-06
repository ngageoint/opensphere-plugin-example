'use strict';

const fs = require('fs');
const path = require('path');
const resolver = require('opensphere-build-resolver/utils');

/**
 * @type {string}
 */
const buildDir = '.build';

/**
 * Path to the build directory.
 * @type {string}
 */
const buildPath = path.join(process.cwd(), buildDir);

/**
 * Path to the built version file.
 * @type {string}
 */
const versionFile = path.join(buildPath, 'version');

/**
 * Relative path of the built version directory.
 * @type {string}
 */
const version = fs.readFileSync(versionFile, 'utf8').trim()
    .replace(/.*\//, '');

const appPath = resolver.resolveModulePath('opensphere');

module.exports = {
  appVersion: version,
  basePath: __dirname,
  appPath: appPath,
  distPath: path.join(appPath, 'dist', 'opensphere'),
  templates: [{
    id: 'index',
    skip: true,
    resources: [{
      source: __dirname,
      target: '',
      files: ['images']
    }]
  }],
  debugCss: path.relative(__dirname, path.join(buildPath, 'themes', 'default.combined.css')),
  compiledCss: path.join(version, 'styles', 'themes', 'default.min.css'),
  debugJs: path.relative(__dirname, path.join(buildPath, 'opensphere.js')),
  compiledJs: path.join(version, 'opensphere.min.js')
};
