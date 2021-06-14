// URLs
const URL = `https://hub-staging.vaultdragon.com`
const loginURL = `${URL}/login`
const QueuePage = `${URL}/queue/list`

// Settings
const appPath = './app'
const appSSPath = `${appPath}/src/public/img`
const appVidPath = `${appPath}/src/public/vid`
const headless = true
const slomo = 0
const SSPath = appSSPath
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
