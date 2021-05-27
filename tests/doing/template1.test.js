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
    
    const sel = '.panel-body div > div:nth-child(5) div:nth-child(3)'
    await page.selectOption('text=PatientTitleNameNRICGiven IDLocal Name >> select', '{patient.title}');

    await page.selectOption('css=.panel-body div > div:nth-child(5) div:nth-child(2) select', '{date.today_date}');
    await page.selectOption('css=.panel-body div > div:nth-child(5) div:nth-child(3) select', '{clinic.name}');
    await page.selectOption('css=.panel-body div > div:nth-child(5) div:nth-child(4) select', '{provider.name}');


    await page.selectOption('text=REFERRAL INFONameCategoryDescriptionAddressContact NumberFaxEmail >> select', '{referral.email}');
    await page.selectOption('text=REFERRAL INFONameCategoryDescriptionAddressContact NumberFaxEmail >> select', '{referral.telephone}');
    // await page.selectOption('text=DrNameGiven IDRoleMCR NumberEmailMobileNameGiven IDRoleEmailMobileNameGiven IDRo >> select', '{provider.name}');
    // text=DrNameGiven IDRoleMCR NumberEmailMobileNameGiven IDRoleEmailMobileNameGiven IDRo >> select
    // text=ClinicNameAddressContactNameAddressContactNameAddressContact >> select
    // text=DateToday's DateDate (1 Business Day Later)Date (3 Business Days Later)Date (5 B >> select

    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/letterbuilder/list' }*/),
      page.click(':nth-match(button:has-text("Create"), 2)')
    ]);

    await page.isVisible('text=REF01');
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/queue/list' }*/),
      page.click('text=Queue')
    ]);

    await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]');
    await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'mau');
    await page.click('text=Maurice Hamilton: ETZ8DAZOJV (1) Tel: +6596080926');

    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd53d37feb000126fba10' }*/),
      page.click('text=Maurice Hamilton -')
    ]);

    await page.click('text=CONSULTATION');
    await page.click('text=Open a note for May 27, 2021 Visit (Draft)');
    await page.click('[placeholder="Issue letters and MCs"]');
    await page.fill('[placeholder="Issue letters and MCs"]', 'ref01');
    await page.click('#invoice-note-container a div:has-text("Demo referral (REF01)")');
    await page.click('textarea');
    await page.click('text=Save Letter');
    await page.click('text=27 May 2021 Visit Notes > From Date < May 2021 > SunMonTueWedThuFriSat 123456789 >> :nth-match(path, 2)');

    await page.click('text=Queue');

    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });

    await page.click('text=Queue');

    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/queue/list' }*/),
      page.click('text=Queue')
    ]);


    // await page.click('#settingsbutton__BV_toggle_');
    // page.once('dialog', dialog => {
    //   console.log(`Dialog message: ${dialog.message()}`);
    //   dialog.dismiss().catch(() => {});
    // });
    // await page.click('#settingsbutton__BV_toggle_');
    // await page.click('#settingsbutton >> text=Letter Builder');
    await page.click('#settingsbutton__BV_toggle_');

    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/letterbuilder/list' }*/),
      page.click('#settingsbutton >> text=Letter Builder')
    ]);

    // Click [placeholder="Search Table"]
    await page.click('[placeholder="Search Table"]');
    // Fill [placeholder="Search Table"]
    await page.fill('[placeholder="Search Table"]', 'ref01');
    // Click text=✓
    await page.click('text=✓');
    // Click text=Delete
    await page.click('text=Delete');
    // Click text=Confirm Delete
    await page.click('text=Confirm Delete');
  

    


  })

})
