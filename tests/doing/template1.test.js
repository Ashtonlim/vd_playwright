const { chromium } = require('playwright');
const { init, teardown } = require(process.cwd() + '/steps');
const { browserSettings } = require(process.cwd() + '/g');

let browser, context, page;


beforeAll(async () => {
  browser = await chromium.launch(browserSettings);
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  ({context, page} = await init(browser));
});

afterEach(async () => {
  await teardown(page, path=require('path').basename(__filename))
});

describe("removes data", () => {

  it('clear queue in queue list', async () => {
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/queue/list' }*/),
      page.click('text=Queue')
    ]);
    // Click #popover-3
    await page.click('#popover-3');
    // Uncheck text=✓⇅Call #TagsPatientProviderSecondary ProvidersTherapistRoomServiceNotesQueue Sta >> input[type="checkbox"]
    await page.uncheck('text=✓⇅Call #TagsPatientProviderSecondary ProvidersTherapistRoomServiceNotesQueue Sta >> input[type="checkbox"]');
    // Uncheck #priority
    await page.uncheck('#priority');
    // Uncheck #call_number
    await page.uncheck('#call_number');
    // Uncheck #tags
    await page.uncheck('#tags');
    // Uncheck #patient
    await page.uncheck('#patient');
    // Uncheck #provider
    await page.uncheck('#provider');
    // Check #secondaryProviders
    await page.check('#secondaryProviders');
    // Uncheck #therapist
    await page.uncheck('#therapist');
    // Uncheck #room
    await page.uncheck('#room');
    // Uncheck #service
    await page.uncheck('#service');
    // Uncheck #visit_notes
    await page.uncheck('#visit_notes');
    // Uncheck #queue_status
    await page.uncheck('#queue_status');
    // Uncheck #invoice
    await page.uncheck('#invoice');
    // Uncheck #clinic
    await page.uncheck('#clinic');
    // Uncheck #appointmentTime
    await page.uncheck('#appointmentTime');
    // Uncheck #appointmentDetails
    await page.uncheck('#appointmentDetails');
    // Uncheck #createdAt
    await page.uncheck('#createdAt');
    // Uncheck #start_consult
    await page.uncheck('#start_consult');
    // Uncheck #end_consult
    await page.uncheck('#end_consult');
    // Uncheck #start_treatment
    await page.uncheck('#start_treatment');
    // Uncheck #end_treatment
    await page.uncheck('#end_treatment');
    // Uncheck #call
    await page.uncheck('#call');
    // Uncheck #printLabel
    await page.uncheck('#printLabel');
    // Uncheck #secondaryProviders
    await page.uncheck('#secondaryProviders');
    // Click .col-12
    await page.click('.col-12');
    // Click #popover-3
    await page.click('#popover-3');
    // Check input[type="checkbox"]
    await page.check('input[type="checkbox"]');
    // Check #priority
    await page.check('#priority');
    // Check #call_number
    await page.check('#call_number');
    // Check #tags
    await page.check('#tags');
    // Check #patient
    await page.check('#patient');
    // Check #provider
    await page.check('#provider');
    // Check #secondaryProviders
    await page.check('#secondaryProviders');
    // Check #therapist
    await page.check('#therapist');
    // Check #room
    await page.check('#room');
    // Check #service
    await page.check('#service');
    // Check #visit_notes
    await page.check('#visit_notes');
    // Check #queue_status
    await page.check('#queue_status');
    // Check #invoice
    await page.check('#invoice');
    // Check #clinic
    await page.check('#clinic');
    // Check #appointmentTime
    await page.check('#appointmentTime');
    // Check #appointmentDetails
    await page.check('#appointmentDetails');
    // Check #createdAt
    await page.check('#createdAt');
    // Check #start_consult
    await page.check('#start_consult');
    // Check #end_consult
    await page.check('#end_consult');
    // Check #start_treatment
    await page.check('#start_treatment');
    // Check #end_treatment
    await page.check('#end_treatment');
    // Check #call
    await page.check('#call');
    // Check #printLabel
    await page.check('#printLabel');
    // Click th:has-text("✓")
    await page.click('th:has-text("✓")');
    // Click th:has-text("⇅")
    await page.click('th:has-text("⇅")');
    // Click th:has-text("Call #")
    await page.click('th:has-text("Call #")');
    // Click th:has-text("Tags")
    await page.click('th:has-text("Tags")');
    // Click th:has-text("Patient")
    await page.click('th:has-text("Patient")');
    // Click th:has-text("Provider")
    await page.click('th:has-text("Provider")');
    // Click th:has-text("Secondary Providers")
    await page.click('th:has-text("Secondary Providers")');
    // Click th:has-text("Therapist")
    await page.click('th:has-text("Therapist")');
    // Click th:has-text("Room")
    await page.click('th:has-text("Room")');
    // Click th:has-text("Service")
    await page.click('th:has-text("Service")');
    // Click th:has-text("Notes")
    await page.click('th:has-text("Notes")');
    // Click th:has-text("Queue Status")
    await page.click('th:has-text("Queue Status")');
    // Click th:has-text("Invoice No.")
    await page.click('th:has-text("Invoice No.")');
    // Click th:has-text("Location")
    await page.click('th:has-text("Location")');
    // Click th:has-text("Appointment Time")
    await page.click('th:has-text("Appointment Time")');
    // Click th:has-text("Appointment Details")
    await page.click('th:has-text("Appointment Details")');
    // Click th:has-text("Queue Time")
    await page.click('th:has-text("Queue Time")');
    // Click main:has-text("Queue< < May 2021 > SunMonTueWedThuFriSat 12345678910111213141516171819202122232")
    await page.click('main:has-text("Queue< < May 2021 > SunMonTueWedThuFriSat 12345678910111213141516171819202122232")');
    // Click :nth-match(td:has-text("No Notes Yet"), 2)
    await page.click(':nth-match(td:has-text("No Notes Yet"), 2)');
    // Click th:has-text("Start Consult")
    await page.click('th:has-text("Start Consult")');
    // Click th:has-text("End Consult")
    await page.click('th:has-text("End Consult")');
    // Click th:has-text("Start Treatment")
    await page.click('th:has-text("Start Treatment")');
    // Click th:has-text("End Treatment")
    await page.click('th:has-text("End Treatment")');
    // Click :nth-match(th:has-text("Call"), 2)
    await page.click(':nth-match(th:has-text("Call"), 2)');
    // Click th:has-text("Patient Label")
    await page.click('th:has-text("Patient Label")');
  


  })

})
