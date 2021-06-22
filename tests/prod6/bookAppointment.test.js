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
        await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'Virgie')
        await page.click('text=Virgie Goodman: ZKK8DUE1VD (2 Tel: +6559372842)')

        await page.click('[placeholder="Select Date"]')
        // await page.click('span:has-text("<")')
        await page.click('text=27')
        await page.click('[placeholder="Pick Time Slot"]')
        // time will not be selected if there alr exists a time
        await page.click('text=08:30')
        await page.selectOption('text=*Please select a medical service >> select', {label: 'Service 1'});
        
        const r = Math.random().toString(36).substring(2)
        console.log(`Random String is: ${r}`)
        await page.click('textarea')
        await page.fill('textarea', `this is appt details test ${r}`)
        
        await page.click('text=EmailEmail >> textarea')
        await page.fill('text=EmailEmail >> textarea', 'this is a send email test')
        
        await page.click('text=Send Email')
        await page.isVisible('text=Email sent')

        await page.click('text=Save')

        // if (await page.isEnabled('text=Today')) {
        //     await page.click('text=Today')
        // }

        await page.click(`a:has-text("8:30a Virgie Goodman | this is appt details test ${r}")`)
        await page.isVisible('text=Appointment Details (Status: Scheduled)')
        await page.click('.modal-wrapper')
        await page.click('text=Patient')
        await page.click('tbody >> text=Virgie Goodman')
        await page.click('a[role="tab"]:has-text("APPOINTMENT")')
        await page.waitForTimeout(2000)
        await page.click(`text=this is appt details test ${r}`)

        await page.click('text=Appointment')
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/appointment/list' }*/),
            page.click('a[role="menuitem"]:has-text("Appointment")'),
        ])

        if (await page.isEnabled('text=Today')) {
            await page.click('text=Today')
        }

        await page.click(`text=Virgie Goodman | this is appt details test ${r}`)
        await page.click('button:has-text("Cancel")')
        await page.click('text=Cancellation Reason× Confirm >> textarea')
        await page.fill('text=Cancellation Reason× Confirm >> textarea', 'cancel appt test')
        await page.click('div[role="document"] >> text=Confirm')
        await page.click('text=Appointment status updated')

        await page.click(`text=8:30a Virgie Goodman | this is appt details test ${r}`)
        await page.click('#delete-appointment')
    })
})
