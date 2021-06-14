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

describe('removes data', () => {
    it('clear queue in queue list', async () => {
        await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/), page.click('text=Patient')])
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/60b8f6f6fb05690013d57ae0' }*/),
            page.click('text=Maurice Hamilton'),
        ])
        await page.click('text=SUMMARY')
        await page.isVisible('text=meds1')
        await page.isVisible('text=pack of joy')
        await page.isVisible('text=credit promo')
        await page.click('text=Diagnosis')
        // await page.waitForTimeout(600) to see in recording
        await page.isVisible('text=A37.00 - Whooping cough due to Bordetella pertussis without pneumonia')
        await page.isVisible('text=A01.00 - Typhoid fever, unspecified')
        await page.isVisible('text=Primary Diagnosis')
        await page.isVisible('text=Secondary Diagnosis')
        await page.isVisible('text=Additional Diagnosis')
        await page.isVisible('text=A16.0 - Tuberculosis of lung, bacteriologically and histologically negative - 肺结')
        await page.click('text=Letters/MCs')
        // await page.waitForTimeout(600) to see in recording
        await page.isVisible('text=Medical Certificate')
        await page.click('text=Tasks')
        await page.isVisible('text=No data for table')
        await page.click('text=Vaccinations')
        await page.click('text=Documents')
        await page.isVisible('text=No data for table')
        // await page.waitForTimeout(600) to see in recording
    })
})
