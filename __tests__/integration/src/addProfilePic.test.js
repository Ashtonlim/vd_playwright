const { chromium } = require('playwright')
const { init, teardown } = require(process.cwd() + '/steps')
const { browserSettings } = require(process.cwd() + '/g')

let browser, context, page

beforeAll(async () => {
  browser = await chromium.launch({
    ...browserSettings,
    args: ['--use-fake-ui-for-media-stream'],
  })
})

afterAll(async () => {
  await browser.close()
})

beforeEach(async () => {
  ;({ context, page } = await init(browser))
})

afterEach(async () => {
  await teardown(page, (path = require('path').basename(__filename)))
})

describe('removes data', () => {
  it('clear queue in queue list', async () => {
    await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/queue/list' }*/), page.click('text=Queue')])
    await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]')

    // Fill [placeholder="Search by Patient's Name, NRIC, ID, Mobile Number"]
    await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'maurice')
    await page.click('text=Maurice Hamilton: ETZ8DAZOJV (1) Tel: +6596080926')
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd53d37feb000126fba10' }*/),
      page.click('text=Maurice Hamilton'),
    ])
    await page.click('text=Maurice Hamilton unknown age >> button')

    await page.waitForTimeout(3000)
    console.log('hee')
    await page.click('text=Capture Photo')
    await page.waitForTimeout(3000)
    await page.click('text=Re-take Photo')
    await page.waitForTimeout(3000)
    await page.click('text=Capture Photo')
    await page.click('text=Save')
    await page.click('text=Maurice Hamilton unknown age >> button')
    await page.click('text=Take a Photo')
    await page.click('text=Cancel')
    await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/), page.click('text=Patient')])
    await page.click('td:has-text("Maurice Hamilton")')
    // assert.equal(page.url(), 'https://hub-staging.vaultdragon.com/patient/detail/608bd53d37feb000126fba10');
  })
})
