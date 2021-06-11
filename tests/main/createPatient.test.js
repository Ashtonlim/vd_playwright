const { chromium } = require('playwright')
const { init, teardown, createPatient, delPatient } = require(process.cwd() + '/steps')
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

describe('Patient workflow', () => {
    it('Create and delete a patient', async () => {
        await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/), page.click('text=Patient')])
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/new' }*/),
            page.click('button:has-text("Create Patient")'),
        ])

        // const id = +Math.random().toString().substring(2)
        // const pName = 'QwaseeDee'
        // const nric = 's12345'
        // const num = 12341234

        await delPatient(page, await createPatient(page))
    })
})
