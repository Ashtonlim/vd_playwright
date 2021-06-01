const { chromium } = require('playwright')
const { init, teardown, createInvoice } = require(process.cwd() + '/steps')
const { browserSettings } = require(process.cwd() + '/g')

let browser, context, page

beforeAll(async () => {
    browser = await chromium.launch(browserSettings)
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

describe('patient', () => {
    it('create and void an invoice', async () => {
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/),
            page.click('text=Patient'),
        ])

        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd53d37feb000126fba10' }*/),
            page.click('text=Maurice Hamilton'),
        ])

        const invNum = await createInvoice(page)
        await page.selectOption(
            'text=Payment Methods PayPal(Online)-Offset $0.00 Offset $0.00 Cash Offset - Credit No >> select',
            { label: 'Cash' }
        )
        await page.click('[aria-label="Payment Method Amount"]')
        await page.fill('[aria-label="Payment Method Amount"]', '20')
        await page.press('[aria-label="Payment Method Amount"]', 'Enter')

        // Need to wait, clicking make payment too fast doesn't save payment.
        // Could be that Vue has not triggered
        await page.waitForTimeout(3000)

        await page.click('text=Make Payment')
        await page.waitForTimeout(500)

        await page.click('text=PAYMENT')
        await page.click('button:has-text("Void")')
        await page.click('textarea')
        await page.fill('textarea', 'testing')
        await page.click('text=Confirm')
    })
})
