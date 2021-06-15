const Path = require('path')
const { defaults } = require('jest-config')

// Note: rootDir is relative to the directory containing this file.
const rootDir = './'
const { testMatch } = defaults

module.exports = {
  preset: 'jest-playwright-preset',
  setupFilesAfterEnv: [`${process.cwd()}/jest.setup.js`],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './',
        filename: 'prod5.html',
        expand: true,
        // "openReport": true
      },
    ],
  ],
  rootDir,
  // setupFiles: ['../setup.js'],
  testMatch,
}
