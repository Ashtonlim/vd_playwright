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
    await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/queue/list' }*/), page.click('text=Queue')])
    await page.click('#popover-3')
    await page.uncheck('text=✓⇅Call #TagsPatientProviderSecondary ProvidersTherapistRoomServiceNotesQueue Sta >> input[type="checkbox"]')
    await page.uncheck('#priority')
    await page.uncheck('#call_number')
    await page.uncheck('#tags')
    await page.uncheck('#patient')
    await page.uncheck('#provider')
    await page.uncheck('#secondaryProviders')
    await page.uncheck('#therapist')
    await page.uncheck('#room')
    await page.uncheck('#service')
    await page.uncheck('#visit_notes')
    await page.uncheck('#queue_status')
    await page.uncheck('#invoice')
    await page.uncheck('#clinic')
    await page.uncheck('#appointmentTime')
    await page.uncheck('#appointmentDetails')
    await page.uncheck('#createdAt')
    await page.uncheck('#start_consult')
    await page.uncheck('#end_consult')
    await page.uncheck('#start_treatment')
    await page.uncheck('#end_treatment')
    await page.uncheck('#call')
    await page.uncheck('#printLabel')

    await page.click('.col-12')
    await page.click('#popover-3')
    await page.check('input[type="checkbox"]')
    await page.check('#priority')
    await page.check('#call_number')
    await page.check('#tags')
    await page.check('#patient')
    await page.check('#provider')
    await page.check('#secondaryProviders')
    await page.check('#therapist')
    await page.check('#room')
    await page.check('#service')
    await page.check('#visit_notes')
    await page.check('#queue_status')
    await page.check('#invoice')
    await page.check('#clinic')
    await page.check('#appointmentTime')
    await page.check('#appointmentDetails')
    await page.check('#createdAt')
    await page.check('#start_consult')
    await page.check('#end_consult')
    await page.check('#start_treatment')
    await page.check('#end_treatment')
    await page.check('#call')
    await page.check('#printLabel')

    await page.isVisible('th:has-text("✓")')
    await page.isVisible('th:has-text("⇅")')
    await page.isVisible('th:has-text("Call #")')
    await page.isVisible('th:has-text("Tags")')
    await page.isVisible('th:has-text("Patient")')
    await page.isVisible('th:has-text("Provider")')
    await page.isVisible('th:has-text("Secondary Providers")')
    await page.isVisible('th:has-text("Therapist")')
    await page.isVisible('th:has-text("Room")')
    await page.isVisible('th:has-text("Service")')
    await page.isVisible('th:has-text("Notes")')
    await page.isVisible('th:has-text("Queue Status")')
    await page.isVisible('th:has-text("Invoice No.")')
    await page.isVisible('th:has-text("Location")')
    await page.isVisible('th:has-text("Appointment Time")')
    await page.isVisible('th:has-text("Appointment Details")')
    await page.isVisible('th:has-text("Queue Time")')
    // await page.isVisible('main:has-text("Queue< < May 2021 > SunMonTueWedThuFriSat 12345678910111213141516171819202122232")');
    // await page.isVisible(':nth-match(td:has-text("No Notes Yet"), 2)');
    await page.isVisible('th:has-text("Start Consult")')
    await page.isVisible('th:has-text("End Consult")')
    await page.isVisible('th:has-text("Start Treatment")')
    await page.isVisible('th:has-text("End Treatment")')
    await page.isVisible(':nth-match(th:has-text("Call"), 2)')
    await page.isVisible('th:has-text("Patient Label")')
  })
})
