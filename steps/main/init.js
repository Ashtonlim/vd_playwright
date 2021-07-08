const login = require('./login')
const { URL, viewport, recordVideo, buildType } = require(process.cwd() + '/g')
const fs = require('fs')
let storageState
let storageStateProd = require(process.cwd() + '/creds-prod.json')
let storageStateStag = require(process.cwd() + '/creds-stag.json')

let context
let page

module.exports.init = async (browser, path, skipLogin = true, recVid = false, contextObj = { viewport }) => {
  if (buildType === 'hub') {
    console.log(buildType)
    console.log('hello. there')
    storageState = require(process.cwd() + '/creds-prod.json')
  } else if (buildType === 'hub-staging') {
    console.log('asdasd', buildType)
    storageState = require(process.cwd() + '/creds-stag.json')
  }
  console.log('hello')
  console.log(storageState)

  if (skipLogin && Object.keys(storageState).length) {
    contextObj = { ...contextObj, storageState }
  }

  if (recVid || Object.keys(recordVideo).length) {
    recordVideo.dir = './recordings/' + path.replace('.test.js', '')
    contextObj = { ...contextObj, recordVideo }
  }

  context = await browser.newContext({ ...contextObj, permissions: ['camera'] })
  page = await context.newPage()
  await page.goto(URL)

  if (skipLogin === false) {
    // console.log(await login)
    console.log('login')
    // await login(page)
  }

  return { context, page }

  // fs.writeFileSync('./creds.json', JSON.stringify(await context.storageState()));
}
