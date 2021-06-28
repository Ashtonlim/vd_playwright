const { chromium } = require('playwright')
const { init, teardown, createInvoice, payInvoice } = require(process.cwd() + '/steps')
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
        await page.click('text=Activate')
        await page.waitForTimeout(1000)
        await page.click('text=Select')
        await page.click('a[role="tab"]:has-text("MEMBERSHIP")')
        await page.click('text=Redeemable Points')
        await page.click('text=To Qualify For')
        await page.click('text=outerclub1')

        const pts = (await page.innerText('css=div.col.points > p')).replace(/\D/g, '')
        const addPts = 10
        const subPts = 9
        await createInvoice(page)
        await payInvoice(page)

        await page.click('text=MEMBERSHIP')
        await page.isVisible(`text=${pts + 1} Points`)
        await page.click('text=Adjust Points')
        await page.click('input[type="number"]')
        await page.fill('input[type="number"]', `${addPts}`)
        await page.click('div[role="document"] >> text=Up')
        await page.waitForTimeout(500)
        // await page.click(`text=Patient has not been admitted yet Successfully added ${addPts} points to the balance×Dr >> div[role="alert"]`)
        await page.isVisible(`#main >> text=Successfully added ${addPts} points to the balance`)
        await page.waitForTimeout(500)
        await page.isVisible(`text=${pts + addPts} Points`)
        await page.click('text=Adjust Points')
        await page.click('input[type="number"]')
        await page.fill('input[type="number"]', `${subPts}`)
        // await page.waitForTimeout(500)
        await page.click('div[role="document"] >> text=Down')
        await page.waitForTimeout(500)
        await page.click(`#main >> text=Successfully deducted ${subPts} points from the balance`)
        await page.waitForTimeout(500)
        await page.isVisible(`text=${pts + addPts - subPts} Points`)
        await page.click('text=Activate/Deactivate')
        await page.click('text=Deactivate Membership')
        await page.isVisible('text=Please activate membership for this patient')
        await page.isVisible('#main >> text=Successfully deactivated')
        await page.isVisible('text=Non-Member Activate')
        await page.click('#main-content')
    })
})
