const { chromium } = require('playwright')
const { init, teardown, createInvoice, payInvoice } = require(process.cwd() + '/steps')
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

describe('patient', () => {
  it('create and void an invoice', async () => {
    await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/), page.click('text=Patient')])

    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd53d37feb000126fba10' }*/),
      page.click('text=Maurice Hamilton'),
    ])

    await createInvoice(page, { invItem: 'credit promo' })
    await payInvoice(page)

    await page.click('a[role="tab"]:has-text("CREDIT")')
    // await page.click('span:has-text("$40.00")')
    // await page.click('text=$0.00')
    await page.waitForTimeout(1000)
    const bal = (await page.innerText('text=Current Credit Balance : $ $')).replace(/^\D+/g, '')

    await page.click('a[role="tab"]:has-text("INVOICE")')

    await createInvoice(page)
    await payInvoice(page, { label: 'Credit Redeem' })

    await page.click('a[role="tab"]:has-text("CREDIT")')

    // 20 is cost of meds
    // console.log(+bal.replace(/^\D+/g, '') - 20 + '.00')
    await page.isVisible(`text=Current Credit Balance : $ $${+bal.replace(/^\D+/g, '') - 20 + '.00'}`)
    failing = false
  })
})
