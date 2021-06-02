const { chromium } = require('playwright')
const { init, teardown, togglePatientFields } = require(process.cwd() + '/steps')
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
    // ensure always NRIC reset field.
    await togglePatientFields(page)
    await teardown(page, (path = require('path').basename(__filename)))
})

describe('Patient workflow', () => {
    it('Create and delete a patient', async () => {
        await togglePatientFields(page)

        await page.click('#newbutton__BV_toggle_')
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/new' }*/),
            page.click('text=Create Patient'),
        ])

        await page.click('text=DoctorDoctor One Patient ID * >> input[type="text"]')
        await page.click('#patientName')
        await page.fill('#patientName', 'demo clinic 9912')
        await page.selectOption('text=Gender *-MaleFemaleOther >> select', 'M')
        await page.selectOption(
            'text=Nationality *Select nationalityBangladeshiCambodianChineseFilipinoIndianIndonesi >> select',
            'Singaporean'
        )

        // await page.click('text=Date of Birth is required');

        await page.click('input[name="patientDOB"]')
        await page.click('span:has-text("<")')
        await page.click('text=27')

        await page.click('button:has-text("Create Patient")')

        await page.isVisible('text=Nric is required')
        await page.click('text=NRIC/Passport *Local Name >> input[type="text"]')
        await page.fill('text=NRIC/Passport *Local Name >> input[type="text"]', 's123')
        await page.click('text=Questionnaire')
        await page.click('a[role="tab"]:has-text("Corporate / Insurance")')
        await page.click('a[role="tab"]:has-text("Marketing")')

        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/),
            page.click('button:has-text("Create Patient")'),
        ])

        await page.click('text=4 s123 demo clinic 9912 +65 Active Preview >> button')
        await page.click('text=S123')
        await page.click('#edit-patient-profile')

        await page.click('text=NRIC/Passport *Local Name >> input[type="text"]')
        await page.fill('text=NRIC/Passport *Local Name >> input[type="text"]', 'S12345')
        await page.click('text=Update Profile')
        await page.click('div[role="tablist"] >> text=Patient Profile Updated Successfully')
        await page.click('text=4 s12345 demo clinic 9912 +65 Active Preview >> button')
        await page.click('text=S12345')
        await page.click('#edit-patient-profile')
        await page.click('text=Delete')
        await page.fill('[placeholder="4"]', '4')
        await page.click('button:has-text("Ok")')
        await page.waitForTimeout(3000)

        await page.click('text=Patient deleted successfully')
    })
})
