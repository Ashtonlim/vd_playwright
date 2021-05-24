const { chromium } = require('playwright');
const { init } = require(process.cwd() + '/steps');
const { headless } = require(process.cwd() + '/g');

let browser;
let context;
let page;

let i = 0;

beforeAll(async () => {
  browser = await chromium.launch({
    // channel: 'msedge',
    headless,
    // slowMo: 100,
    
  });
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  ({context, page} = await init(browser));
});

afterEach(async () => {
  await page.screenshot({ path: `./screenshots/kai${i++}.png` });
  await page.close();
});

describe("init VD", () => {

  it('Create and delete a patient', async () => {

     // Click text=Patient
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/),
      page.click('text=Patient')
    ]);

    // Click button:has-text("Create Patient")
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/new' }*/),
      page.click('button:has-text("Create Patient")')
    ]);

    // Click text=Personal Information
    await page.click('text=Personal Information');

    // Click button:has-text("Create Patient")
    await page.click('button:has-text("Create Patient")');

    // Click text=Personal Information
    await page.click('text=Personal Information');

    // Select 60924291252b8800127aaeff
    await page.selectOption('text=DoctorDoctor One >> select', '60924291252b8800127aaeff');

    // Click text=Personal Information
    await page.click('text=Personal Information');

    // Click button:has-text("Create Patient")
    await page.click('button:has-text("Create Patient")');

    // Click text=Patient name is required×
    await page.click('text=Patient name is required×');

    // Click text=Nric is required
    await page.click('text=Nric is required');

    // Click text=Nationality is required
    await page.click('text=Nationality is required');

    // Click text=Mobile Number is required
    await page.click('text=Mobile Number is required');

    // Click text=Personal Information
    await page.click('text=Personal Information');

    // Click text=DoctorDoctor One Patient ID * >> input[type="text"]
    await page.click('text=DoctorDoctor One Patient ID * >> input[type="text"]');

    // Click text=DoctorDoctor One Patient ID * >> input[type="text"]
    await page.click('text=DoctorDoctor One Patient ID * >> input[type="text"]');

    // Select Mr.
    await page.selectOption('text=Title - Mr. Mrs. Ms. Mdm MISS Dr Prof Master Field Marshall General Lieutenant G >> select', 'Mr.');

    // Select Singaporean
    await page.selectOption('text=Nationality *Select nationalityBangladeshiCambodianChineseFilipinoIndianIndonesi >> select', 'Singaporean');
    // Select Singapore
    await page.selectOption('text=Country Of Birth Select country of birthBangladeshCambodiaChinaIndiaIndonesiaMal >> select', 'Singapore');

    // Fill #patientName
    await page.fill('#patientName', 'random');

    // Fill text=NRIC/Passport *Local Name >> input[type="text"]
    await page.fill('text=NRIC/Passport *Local Name >> input[type="text"]', 's12345');

    // Click a:has-text("Contact")
    await page.click('a:has-text("Contact")');

    // Click input[type="email"]
    await page.click('input[type="email"]');

    // Fill input[type="email"]
    await page.fill('input[type="email"]', 'random@rand.com');

    // Click text=Mobile Number *Select region Singapore Indonesia China Cambodia Thailand start w >> input[type="text"]
    await page.click('text=Mobile Number *Select region Singapore Indonesia China Cambodia Thailand start w >> input[type="text"]');

    // Fill text=Mobile Number *Select region Singapore Indonesia China Cambodia Thailand start w >> input[type="text"]
    await page.fill('text=Mobile Number *Select region Singapore Indonesia China Cambodia Thailand start w >> input[type="text"]', '+6592812019');

    // Click text=Emergency Contact
    await page.click('text=Emergency Contact');

    // Click text=Medication
    await page.click('text=Medication');

    // Select No Known Allergies
    await page.selectOption('text=Drug Allergies *Select an answer No Known Allergies Yes >> select', 'No Known Allergies');

    // Select No Known Allergies
    await page.selectOption('text=Food Allergies *Select an answer No Known Allergies Yes >> select', 'No Known Allergies');

    // Click text=Questionnaire
    await page.click('text=Questionnaire');

    // Click canvas
    await page.click('canvas');

    // Click text=Clear
    await page.click('text=Clear');

    // Click text=Clear
    await page.click('text=Clear');

    // Click canvas
    await page.click('canvas');

    // Click text=Accept
    await page.click('text=Accept');

    // Click button:has-text("Create Patient")
    await page.click('button:has-text("Create Patient")');

    // Click button:has-text("Create Patient")
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/),
      page.click('button:has-text("Create Patient")')
    ]);

    // Click text=4 S12345 random +6592812019 Active Preview >> button
    await page.click('text=4 S12345 random +6592812019 Active Preview >> button');

    // Click text=random
    await page.click('text=random');

    // Click #edit-patient-profile
    await page.click('#edit-patient-profile');

    // Click text=Personal Information
    await page.click('text=Personal Information');

    // Click text=Delete
    await page.click('text=Delete');

    // Click [placeholder="4"]
    await page.click('[placeholder="4"]');

    // Fill [placeholder="4"]
    await page.fill('[placeholder="4"]', '4');

    // Click button:has-text("Ok")
    await page.click('button:has-text("Ok")');


  })

})
