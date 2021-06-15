const { chromium } = require('playwright')
const { init, teardown } = require(process.cwd() + '/steps')
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
        // .btn-toolbar > div > select:nth-child(3)'
        await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/pharmacy' }*/), page.click('text=Pharmacy')])
        // await page.click('text=Pharmacy')
        // await page.isVisible('span:has-text("Confirmed")')
        // await page.selectOption('[id="__BVID__310"]', '60924291252b8800127aaeff')
        // await page.selectOption('[id="__BVID__310"]', '609242a8252b8800127aaf01')
        // await page.selectOption('[id="__BVID__310"]', '')
        // await page.selectOption(
        //     'text=-- All Services --Service 1-- All Providers --Doctor OneTherapist One-- All Stat >> select',
        //     '609243b9252b8800127aaf13'
        // )
        // await page.selectOption('text=-- All Services --Service 1-- All Providers --Doctor OneTherapist One-- All Stat >> select', '')

        await page.selectOption('css=.btn-toolbar > div > select:nth-child(3)', { label: 'Confirmed' })
        // await page.waitForTimeout(10000)

        await page.selectOption('css=td:nth-child(6) > select', 'Executed')
        await page.click('button:has-text("Confirm Dispense")')
        await page.isVisible('text=Item Updated Successfully')
        await page.selectOption('css=.btn-toolbar > div > select:nth-child(3)', { label: 'Executed' })
        await page.click('span:has-text("Executed")')

        await page.click('button:has-text("Edit Label")')
        await page.click('text=Dosage:Precaution 1:Precaution 2: >> input[type="text"]')
        await page.fill('text=Dosage:Precaution 1:Precaution 2: >> input[type="text"]', '123')
        await page.click('#input-precaution-1')
        await page.fill('#input-precaution-1', '')
        await page.click('text=Dosage:Precaution 1:Precaution 2: >> input[type="text"]')
        await page.fill('text=Dosage:Precaution 1:Precaution 2: >> input[type="text"]', 'test-dosage-edit-1')
        await page.click('#input-precaution-1')
        await page.fill('#input-precaution-1', 'test-write-precaution-1')
        await page.click('text=OK')
        await page.click('text=Medicine Label Saved')

        const [page1] = await Promise.all([page.waitForEvent('popup'), page.click('button:has-text("Print Label")')])
        await page1.waitForTimeout(1500)
        await page.screenshot({ path: `./screenshots/${path.replace('test.js', '')}printLabelOfExec.png` })
        await page1.waitForTimeout(1500)
        await page1.close()

        const [page2] = await Promise.all([page.waitForEvent('popup'), page.click('button:has-text("Print Packing List")')])
        await page1.waitForTimeout(1500)
        await page.screenshot({ path: `./screenshots/${path.replace('test.js', '')}printPackingListOfExec.png` })
        await page1.waitForTimeout(1500)
        await page2.close()

        await page.selectOption('css=.btn-toolbar > div > select:nth-child(3)', { label: 'Confirmed' })
        // await page.selectOption('[id="__BVID__311"]', '')

        const [page3] = await Promise.all([page.waitForEvent('popup'), page.click('button:has-text("Print Label")')])
        await page1.waitForTimeout(1500)
        await page.screenshot({ path: `./screenshots/${path.replace('test.js', '')}printLabelOfConfirmed.png` })
        await page1.waitForTimeout(1500)
        await page3.close()
    })
})
