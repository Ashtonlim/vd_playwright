const { chromium } = require('playwright')
const { init, teardown } = require(process.cwd() + '/steps')
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

describe('Creating pricing scheme for other tests', () => {
    it('should create schemes for invoice tests', async () => {
        await page.click('#settingsbutton__BV_toggle_')
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/corporate/list' }*/),
            page.click('#settingsbutton >> text=Corporate / Insurance'),
        ])

        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/corporate/new' }*/),
            page.click('text=Create New Corporate'),
        ])

        await page.click('[placeholder="Name"]')
        await page.fill('[placeholder="Name"]', 'Giant Corp 1')
        await page.click('[placeholder="Given ID"]')
        await page.fill('[placeholder="Given ID"]', 'gc1')
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/corporate/list' }*/),
            page.click(':nth-match(:text("Save"), 2)'),
        ])
        await page.isVisible('text=Corporate/Insurance Created Successfully')
        await page.click('text=Giant Corp 1')
    })
})
