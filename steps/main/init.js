const login = require('./login')
const { URL, viewport, recordVideo } = require(process.cwd() + '/g')
const fs = require('fs')
const storageState = require(process.cwd() + '/creds.json')
let context
let page

module.exports.init = async (browser, path, skipLogin = true, recVid = false, contextObj = { viewport }) => {
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
