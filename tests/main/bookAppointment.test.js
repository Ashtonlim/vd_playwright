const { chromium } = require('playwright')
const { init, teardown, clearQueue } = require(process.cwd() + '/steps')
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
        await page.click('#newbutton__BV_toggle_')
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/appointment/new' }*/),
            page.click('text=Create Appointment'),
        ])
        await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]')
        await page.fill(
            '[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]',
            'Virgie'
        )
        await page.click('text=Virgie Goodman: ZKK8DUE1VD (2 Tel: +6559372842)')

        await page.click('[placeholder="Select Date"]')
        await page.click('span:has-text("<")')
        await page.click('text=27')
        await page.click('[placeholder="Pick Time Slot"]')
        await page.click('text=10:30')
        await page.selectOption('[id="__BVID__342"]', '609242a8252b8800127aaf01')

        const r = Math.random().toString(36).substring(2)
        console.log(`Random String is: ${r}`)
        await page.click('textarea')
        await page.fill('textarea', `this is appt details test ${r}`)

        await page.click('text=EmailEmail Templates Template 1 Send Email >> textarea')
        await page.fill(
            'text=EmailEmail Templates Template 1 Send Email >> textarea',
            'this is a send email test'
        )
        await page.click('text=Send Email')
        await page.isVisible('text=Email sent')

        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/queue' }*/),
            page.click("text=Save & Add to Today's Queue"),
        ])

        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd9332a1e310013df1e66' }*/),
            page.click('text=Virgie Goodman -'),
        ])

        await page.click('a[role="tab"]:has-text("APPOINTMENT")')
        await page.waitForTimeout(3000)

        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/appointment/list' }*/),
            page.click('text=Appointment'),
        ])
        await page.click('[aria-label="prev"]')
        await page.click(`text=Virgie Goodman | this is appt details test ${r}`)
        await page.click('button:has-text("Cancel")')
        await page.click('text=Cancellation Reason× Confirm >> textarea')
        await page.fill('text=Cancellation Reason× Confirm >> textarea', 'cancel appt test')
        await page.click('div[role="document"] >> text=Confirm')
        await page.click('text=Appointment status updated')

        await page.goto('https://hub-staging.vaultdragon.com/queue/list')
        await clearQueue(page)
    })
})
