require('dotenv').config()
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
        await page.click('#settingsbutton__BV_toggle_')
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/config' }*/),
            page.click('#settingsbutton >> text=System Preferences'),
        ])
        await page.waitForTimeout(1000)
        await page.click('#main >> text=Invoice')
        await page.click('text=Send out Invoice Automatically')

        // await page.click('div:nth-child(21) div .row .col-sm-9 .mb-3')

        await page.click('text=Patient Name Appointment Schedule Appointment Service Clinic Name Clinic Address >> textarea')
        await page.fill('text=Patient Name Appointment Schedule Appointment Service Clinic Name Clinic Address >> textarea', 'dear ')
        await page.click('text=Patient Name')
        await page.click('text=Patient Name Appointment Schedule Appointment Service Clinic Name Clinic Address >> textarea')
        await page.fill(
            'text=Patient Name Appointment Schedule Appointment Service Clinic Name Clinic Address >> textarea',
            'dear {patient.name} this is a test email'
        )
        await page.click('button:has-text("Save Details")')
        await page.isVisible('text=Configuration Updated Successfully')

        await page.click('text=Patient')
        await page.click('text=Maurice Hamilton')
        await page.click('a[role="tab"]:has-text("INVOICE")')
        await page.click('text=Create Invoice')
        await page.isVisible('text=Invoice Created')
        await page.click('[placeholder="Search inventory items"]')
        await page.fill('[placeholder="Search inventory items"]', 'meds1')
        await page.click('a:has-text("MedicineM1meds1")')
        await page.click('.btn-group button:nth-child(3)')
        await page.isVisible('text=Email is being sent. Please wait for serveral minutes and then check the email.')

        const page1 = await context.newPage()
        await page1.goto('https://www.zoho.com/mail/')
        await page1.click('text=SIGN IN')
        await page1.click('[placeholder="Email address or mobile number"]')

        await page1.fill('[placeholder="Email address or mobile number"]', `${process.env.ZOHOUSR}`)
        await page1.click('button:has-text("Next")')
        await page1.click('[placeholder="Enter password"]')
        await page1.fill('[placeholder="Enter password"]', `${process.env.ZOHOPWD}`)
        await Promise.all([
            page1.waitForNavigation(/*{ url: 'https://accounts.zoho.com/home#profile/personal' }*/),
            page1.click('button:has-text("Sign in")'),
        ])
        await page1.goto('https://mail.zoho.com/zm/#mail/folder/inbox/p/1622722649873100001')
        await Promise.all([
            page1.waitForNavigation(/*{ url: 'https://mail.zoho.com/zm/#mail/folder/inbox/p/1622723244776100001' }*/),
            page1.click('text=no-reply@vaultdragon.com'),
        ])
        await Promise.all([
            page1.waitForNavigation(/*{ url: 'https://mail.zoho.com/zm/#mail/folder/inbox/p/1622723244776100001' }*/),
            page1.click('text=Maurice Hamilton_'),
        ])
        await page1.click('#topBar >> text=Mail')
        await page1.click('text=Maurice Hamilton_ .pdf DownloadView20.0 KB >> i')
        await pausedSS(page1, { fileName: 'emailInvoice', path })
        await page1.close()

        await page.click('text=Delete')
        await page.click('text=Confirm delete this draft invoice?')
        await page.click('text=OK')
        await page.isVisible('text=Invoice Deleted')
        await page.click('#settingsbutton__BV_toggle_')
        await page.waitForTimeout(2500)
        await page.click('#settingsbutton >> text=System Preferences')
        await page.waitForTimeout(2500)
        await page.click('#main >> text=Invoice')
        await page.waitForTimeout(1000)
        await page.click('text=Send out Invoice Automatically')
        await page.click('text=Patient Name Appointment Schedule Appointment Service Clinic Name Clinic Address >> textarea')
        await page.fill('text=Patient Name Appointment Schedule Appointment Service Clinic Name Clinic Address >> textarea', '')
        await page.click('button:has-text("Save Details")')
        await page.isVisible('text=Configuration Updated Successfully')
        // document.querySelector('#config__invoice div:nth-child(21) div > input').click()
        // await page.waitForTimeout(3000)
    })
})
