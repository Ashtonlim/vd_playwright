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
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd53d37feb000126fba10' }*/),
            page.click('text=Maurice Hamilton'),
        ])
        await page.click('text=QUEUE HISTORY')
        await page.click('text=No status found')
        await page.click('text=Queue Status History on')
        await page.click('text=Queue Status History on')
        await page.click('text=27 May 2021 $ 0')
        await page.isVisible('text=2021 2021/05/27 16:41 PM Status: appointment.undefined Location: Location 1 User >> div')
        await page.click('text=20 May 2021 $ 20')
        await page.isVisible('text=2021 2021/05/20 15:43 PM Status: appointment. Location: Location 1 User: VD Supp >> div')
        await page.isVisible('text=2021 2021/05/20 12:19 PM Status: appointment.undefined Location: Location 1 User >> div')
        await page.click(':nth-match(:text("20 May 2021 $ 20"), 2)')
        await page.isVisible('text=2021 2021/05/20 15:43 PM Status: appointment. Location: Location 1 User: VD Supp >> div')
        await page.isVisible('text=2021 2021/05/20 09:22 AM Status: appointment.undefined Location: Location 1 User >> div')
        await page.click('text=Queue Status History on 20 May 2021')
        await page.click('text=Queue Status History on 20 May 2021')
    })
})
