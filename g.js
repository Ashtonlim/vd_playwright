const { defaults } = require('jest-config')
const { testMatch } = defaults

// URLs
const URL = `https://hub.vaultdragon.com`
const loginURL = `${URL}/login`
const QueuePage = `${URL}/queue/list`

const reportPublicPath = './report/'
const rootDir = './'

// Settings
const appPath = './app'
const appSSPath = `${appPath}/src/public/img`
const appVidPath = `${appPath}/src/public/vid`
const headless = false
const slomo = 0
const SSPath = 'screenshots'
const viewport = {
  width: 1480,
  height: 750,
  // width: 1920,
  // height: 1080,
}

const recordVideo = {
  dir: './recordings',
}

const browserSettings = {
  slomo,
  headless,
  chromiumSandbox: false,
  args: ['--disable-dev-shm-usage'],
}

// URLs
module.exports.URL = URL // will ...url = url cuz issue?
module.exports.loginURL = loginURL
module.exports.QueuePage = QueuePage

// Settings
module.exports.headless = headless
module.exports.slomo = slomo
module.exports.SSPath = SSPath
module.exports.viewport = viewport
module.exports.recordVideo = recordVideo
module.exports.browserSettings = browserSettings

module.exports.reportProdConfig = {
  preset: 'jest-playwright-preset',
  setupFilesAfterEnv: [`${process.cwd()}/jest.setup.js`],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: reportPublicPath,
        filename: 'changeToFolderName.html',
        expand: true,
        // "openReport": true
      },
    ],
  ],
  rootDir,
  // setupFiles: ['../setup.js'],
  testMatch,
}
