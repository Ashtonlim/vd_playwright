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
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/transfer/point' }*/),
      page.click('text=Transfer Credit / Point'),
    ])
    await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]')
    await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'virgie')
    await page.click('text=Virgie Goodman: ZKK8DUE1VD (2) Tel: +6559372842')

    // await page.click('#availableUnits')
    await page.click('text=Type * Credit Membership Point Transfer From * Available Units Units * Transfer  >> path')

    await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]')
    await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'maurice')
    await page.click('text=Maurice Hamilton: ETZ8DAZOJV (1) Tel: +6596080926')

    await page.click('input[type="number"]')
    await page.fill('input[type="number"]', '1')
    await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]')
    await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'steve')
    await page.click('text=Steve Marsh: KPNEPZX5NR (3) Tel: +6558986059')
    await page.click('#remarks')

    const r = Math.random().toString(36).substring(2)

    await page.fill('#remarks', `maurice trf x to steve ${r}`)
    await page.click('button:has-text("Transfer")')
    await page.isVisible('text=Credit successfully transfer to: Steve Marsh')

    await page.waitForTimeout(3500)
    await page.click('text=Patient')
    await page.click('text=Steve Marsh')
    await page.waitForSelector('css=a[role="tab"]:has-text("CREDIT")')
    await page.click('css=a[role="tab"]:has-text("CREDIT")')
    await page.click('[placeholder="Search Table"]')
    await page.fill('[placeholder="Search Table"]', `maurice trf x to steve ${r}`)
    await page.isVisible(`text=maurice trf x to steve ${r}`)
    await page.isVisible('text=Maurice Hamilton / Steve Marsh')
    await page.isVisible('tbody >> text=receive')
    await page.isVisible('text=$1.00')
    await page.isVisible('text=$0.00')
    // await page.isVisible('span:has-text("$2.00")')
    failing = false
  })
})
