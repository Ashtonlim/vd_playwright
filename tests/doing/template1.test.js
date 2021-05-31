const { chromium } = require('playwright');
const { init, teardown, clearQueue } = require(process.cwd() + '/steps');
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
    await page.click('#settingsbutton__BV_toggle_');

    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/letterbuilder/list' }*/),
      page.click('#settingsbutton >> text=Letter Builder')
    ]);

    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/letterbuilder/edit/new' }*/),
      page.click('text=Create New Letter')
    ]);

    await page.selectOption('text=Type GeneralReferralMedical Certificate >> select', 'Referral');
    await page.click('[placeholder="Name"]');
    await page.fill('[placeholder="Name"]', 'Demo referral');
    await page.click('[placeholder="Letter Given ID"]');
    await page.fill('[placeholder="Letter Given ID"]', 'Ref01');
    await page.click('[placeholder="REFERRAL NAME"]');
    await page.fill('[placeholder="REFERRAL NAME"]', 'Ref Ex');
    await page.click('[placeholder="REFERRAL LETTER CATEGORY"]');
    await page.click('[placeholder="REFERRAL DESCRIPTION"]');
    await page.fill('[placeholder="REFERRAL DESCRIPTION"]', 'ref desc');
    await page.click('[placeholder="REFERRAL TELEPHONE"]');
    await page.fill('[placeholder="REFERRAL TELEPHONE"]', '02-8666-7856');
    await page.click('[placeholder="REFERRAL ADDRESS"]');
    await page.fill('[placeholder="REFERRAL ADDRESS"]', 'ubi st 5');
    await page.click('[placeholder="REFERRAL FAX"]');
    await page.fill('[placeholder="REFERRAL FAX"]', '02-123-123');
    await page.click('[placeholder="REFERRAL EMAIL"]');
    await page.fill('[placeholder="REFERRAL EMAIL"]', 'random@vaultdragon.com');
    await page.click('.container-fluid.previewPrint .form-row .form-group');
    
    // const sel = '.panel-body div > div:nth-child(5) div:nth-child(3)'
    await page.selectOption('text=PatientTitleNameNRICGiven IDLocal Name >> select', '{patient.title}');

    await page.selectOption('css=.panel-body div > div:nth-child(5) div:nth-child(2) select', '{date.today_date}');
    await page.selectOption('css=.panel-body div > div:nth-child(5) div:nth-child(3) select', '{clinic.name}');
    await page.selectOption('css=.panel-body div > div:nth-child(5) div:nth-child(4) select', '{provider.name}');


    await page.selectOption('text=REFERRAL INFONameCategoryDescriptionAddressContact NumberFaxEmail >> select', '{referral.email}');
    await page.selectOption('text=REFERRAL INFONameCategoryDescriptionAddressContact NumberFaxEmail >> select', '{referral.telephone}');


    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/letterbuilder/list' }*/),
      page.click(':nth-match(button:has-text("Create"), 2)')
    ]);

    await page.isVisible('text=REF01');

    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/),
      page.click('text=Patient')
    ]);

    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd53d37feb000126fba10' }*/),
      page.click('tbody >> text=Maurice Hamilton')
    ]);

    await page.click('text=CONSULTATION');

    await page.selectOption('text=SortCreated - Newest to OldestCreated - Oldest to NewestEdited - Newest to Oldes >> select', 'updatedAt.-1');
    
    await page.click('[placeholder="Search inventory items"]');
    await page.fill('[placeholder="Search inventory items"]', 'meds1');
    await page.click('a:has-text("MedicineM1meds1")');
    await page.waitForSelector('text=NameDescriptionDosage InstructionQuantityActionsmeds1 >> :nth-match(path, 2)');
    await page.click('text=NameDescriptionDosage InstructionQuantityActionsmeds1 >> :nth-match(path, 2)');

    await page.click('[placeholder="Record ICD 10"]');
    await page.fill('[placeholder="Record ICD 10"]', 'cough');
    await page.click('text=A37.00 - Whooping cough due to Bordetella pertussis without pneumonia');
    await page.click('text=Primary Diagnosis Secondary Diagnosis Additional Diagnosis >> :nth-match([placeholder="Record ICD 10"], 2)');
    await page.fill('text=Primary Diagnosis Secondary Diagnosis Additional Diagnosis >> :nth-match([placeholder="Record ICD 10"], 2)', 'fever');
    await page.click('i');
    await page.click('text=Primary Diagnosis Secondary Diagnosis Additional Diagnosis >> button');


    await page.click('[placeholder="Issue letters and MCs"]');
    await page.fill('[placeholder="Issue letters and MCs"]', 'mc1');
    await page.click('text=Med Cert (MC1)');
    await page.click('textarea');
    await page.fill('textarea', 'Location 1 This is a test');
    await page.click('text=Save Letter');
    await page.click('text=27 May 2021 Visit Notes > From Date < May 2021 > SunMonTueWedThuFriSat 123456789 >> :nth-match(path, 2)');
    const [page1] = await Promise.all([
      page.waitForEvent('popup'),
      page.click('text=Med CertMedical Certificate >> path')
    ]);

    await page1.click('text=Location 1 This is a test');
    await page1.click('text=Location 1 This is a test');
    await page1.close();
    await page.waitForTimeout(500)
    await page.click('text=Med CertMedical Certificate >> :nth-match(path, 3)');

    await page.click('[placeholder="Issue letters and MCs"]');
    await page.fill('[placeholder="Issue letters and MCs"]', 'ref01');
    await page.click('#invoice-note-container a div:has-text("Demo referral (REF01)")');
    await page.click('textarea');
    await page.click('text=Save Letter');
    await page.click('text=27 May 2021 Visit Notes > From Date < May 2021 > SunMonTueWedThuFriSat 123456789 >> :nth-match(path, 2)');

    await page.waitForTimeout(500)
    await page.click('text=Demo referralReferral >> :nth-match(path, 3)');

    await page.click('text=Save Draft');
    // await page.waitForTimeout(6000);
    await page.waitForSelector('#main >> text=Note draft saved successfully');
    await page.waitForTimeout(1000);
 
    await page.click('#settingsbutton__BV_toggle_');
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/letterbuilder/list' }*/),
      page.click('#settingsbutton >> text=Letter Builder')
    ]);

    await page.click('[placeholder="Search Table"]');
    await page.fill('[placeholder="Search Table"]', 'ref01');
    await page.check('input[name="Inventory_select"]');
    await page.click('text=Delete');
    await page.click('text=Confirm Delete');


  })

})
