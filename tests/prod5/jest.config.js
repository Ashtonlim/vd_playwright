const Path = require('path')
const { defaults } = require('jest-config')
const path = require('path')

const rootDir = './'
const dir = path.dirname(__filename).split(path.sep).pop()
const { testMatch } = defaults

module.exports = {
  preset: 'jest-playwright-preset',
  setupFilesAfterEnv: [`${process.cwd()}/jest.setup.js`],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './report/',
        filename: `${dir}.html`,
        expand: true,
        // "openReport": true
      },
    ],
  ],
  rootDir,
  // setupFiles: ['../setup.js'],
  testMatch,
}
