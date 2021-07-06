const { chromium } = require('playwright')
const { init, teardown } = require(process.cwd() + '/steps')
const { browserSettings } = require(process.cwd() + '/g')

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
  ; ({ context, page } = await init(browser, path))
})

afterEach(async () => {
  await teardown(page, path, failing)
})

describe('removes data', () => {
  it('clear queue in queue list', async () => {
    await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/), page.click('text=Patient')])
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd53d37feb000126fba10' }*/),
      page.click('text=Maurice Hamilton'),
    ])
    await page.click('text=QUEUE HISTORY')
    await page.click('text=No status found')
    await page.click('text=Queue Status History on')
    await page.click('text=30 Jun 2021')
    await page.isVisible('text=2021 2021/06/30 16:55 PM Status: appointment.undefined Location: Location 1 User >> div')
    await page.click('text=28 Jun 2021')
    await page.isVisible('text=2021 2021/06/28 12:28 PM Status: appointment.undefined Location: Location 1 User >> div')
    await page.click('text=Queue Status History on 28 Jun 2021')
    failing = false
  })
})
