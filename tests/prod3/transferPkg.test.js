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
  ;({ context, page } = await init(browser, path))
})

afterEach(async () => {
  await teardown(page, path, failing)
})

describe('removes data', () => {
  it('clear queue in queue list', async () => {
    await page.click('#newbutton__BV_toggle_')
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/transfer/package' }*/),
      page.click('text=Transfer Packages'),
    ])
    await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]')
    await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'maurice')
    await page.click('text=Maurice Hamilton: ETZ8DAZOJV (1) Tel: +6596080926')
    await page.selectOption('text=Transfer To Location 1Location 2 >> select', '6087d549fe594f348e33b691')
    await page.click('text=Transfer To Location 1Location 2 >> [placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]')
    await page.fill('text=Transfer To Location 1Location 2 >> [placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'virgie')
    await page.click('text=Virgie Goodman: ZKK8DUE1VD (2) Tel: +6559372842')
    await page.click('[placeholder="Search Table"]')
    await page.fill('[placeholder="Search Table"]', 'p')
    await page.click('input[type="number"]')
    await page.fill('input[type="number"]', '1')
    await page.click('button:has-text("Transfer")')
    await page.click('input[type="number"]')
    await page.fill('input[type="number"]', '1')
    await page.click('button:has-text("Transfer")')
    await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/), page.click('text=Patient')])
    await page.click('text=Patient')
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd9332a1e310013df1e66' }*/),
      page.click('text=Virgie Goodman'),
    ])
    await page.click('a[role="tab"]:has-text("PACKAGES")')
    await page.click('text=Show')
    await page.click('text=mini procedure 1')
    await page.waitForTimeout(1500)
    failing = false
  })
})
