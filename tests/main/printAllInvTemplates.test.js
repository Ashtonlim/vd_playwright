const { chromium } = require('playwright')
const { init, teardown, pausedSS } = require(process.cwd() + '/steps')
const { browserSettings } = require(process.cwd() + '/g')

let browser, context, page
const path = require('path').basename(__filename)
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
    await teardown(page, path)
})

describe('removes data', () => {
    it('clear queue in queue list', async () => {
        await page.click('text=Patient')
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd53d37feb000126fba10' }*/),
            page.click('text=Maurice Hamilton'),
        ])

        await page.click('a[role="tab"]:has-text("INVOICE")')
        await page.click('text=Create Invoice')
        await page.isVisible('text=Invoice Created')

        await page.click('[placeholder="Search inventory items"]')
        await page.fill('[placeholder="Search inventory items"]', 'meds1')
        await page.click('a:has-text("MedicineM1meds1")')

        await page.click('[placeholder="Search inventory items"]')
        await page.fill('[placeholder="Search inventory items"]', 'boj1')
        await page.click('a:has-text("PackageBOJ1pack of joy")')

        await page.click('[placeholder="Search inventory items"]')
        await page.fill('[placeholder="Search inventory items"]', 'minipro1')
        await page.click('a:has-text("ProcedureMINIPRO1mini procedure 1")')

        await page.click('button:has-text("Toggle Dropdown")')
        const [page1] = await Promise.all([page.waitForEvent('popup'), page.click('text=Print Invoice (Uncategorized)')])
        await pausedSS(page1, { fileName: 'Uncategorized', path })
        await page1.close()

        await page.click('button:has-text("Toggle Dropdown")')
        const [page3] = await Promise.all([page.waitForEvent('popup'), page.click('text=Print Invoice (Categorized With Diagnosis)')])
        const x = await page3.isVisible('text=Diagnosis:')
        console.log(x)
        if (x) {
            console.log('correct leh?')
        }
        await pausedSS(page3, { fileName: 'DiagnosisCategorized', path })
        await page3.close()

        await page.click('button:has-text("Toggle Dropdown")')
        const [page2] = await Promise.all([page.waitForEvent('popup'), page.click('text=Print Invoice (Categorized)')])
        await page2.isVisible('text=Procedure')
        await page2.isVisible('text=Package')
        await pausedSS(page2, { fileName: 'Categorized', path })
        await page2.close()

        await page.click('text=Delete')
        await page.isVisible('text=Confirm delete this draft invoice?')
        await page.click('text=OK')
        await page.isVisible('text=Invoice Deleted')
    })
})
