require('dotenv').config()
const fs = require('fs')
const { chromium } = require('playwright')
const { login } = require(process.cwd() + '/steps/main/login')
const { URL, browserSettings } = require(process.cwd() + '/g')

let browser, context, page
let failing = true
const path = require('path').basename(__filename)

beforeAll(async () => {
  browser = await chromium.launch(browserSettings)
})

afterAll(async () => {
  await browser.close()
})

beforeEach(async () => {
  context = await browser.newContext()
  page = await context.newPage()

  // site to use
  await page.goto(URL)
  await login(page)

  fs.writeFileSync('./creds.json', JSON.stringify(await context.storageState()))
})

afterEach(async () => {
  await page.close()
})

describe('removes data', () => {
  it('clear queue in queue list', async () => {
    // ===== Add test code below =====

    // ===== Add test code above =====

    // if test reaches here -> no issues encountered.
    failing = false
  })
})
