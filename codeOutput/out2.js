const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext({
    storageState: 'creds.json'
  });

  // Open new page
  const page = await context.newPage();

  // Go to https://hub-staging.vaultdragon.com/
  await page.goto('https://hub-staging.vaultdragon.com/');

  // Click text=Queue
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/queue/list' }*/),
    page.click('text=Queue')
  ]);

  // Click text=Maurice Hamilton -
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd53d37feb000126fba10' }*/),
    page.click('text=Maurice Hamilton -')
  ]);

  // Click a[role="tab"]:has-text("INVOICE")
  await page.click('a[role="tab"]:has-text("INVOICE")');

  // Click text=Create Invoice
  await page.click('text=Create Invoice');

  // Select 60924291252b8800127aaeff
  await page.selectOption('text=Provider-Doctor One >> select', '60924291252b8800127aaeff');

  // Select 609242a8252b8800127aaf01
  await page.selectOption('text=Therapist-Therapist One >> select', '609242a8252b8800127aaf01');

  // Click [placeholder="Search inventory items"]
  await page.click('[placeholder="Search inventory items"]');

  // Fill [placeholder="Search inventory items"]
  await page.fill('[placeholder="Search inventory items"]', '');

  // Click [placeholder="Search inventory items"]
  await page.click('[placeholder="Search inventory items"]');

  // Fill [placeholder="Search inventory items"]
  await page.fill('[placeholder="Search inventory items"]', '');

  // Click [placeholder="Search inventory items"]
  await page.click('[placeholder="Search inventory items"]');

  // Fill [placeholder="Search inventory items"]
  await page.fill('[placeholder="Search inventory items"]', '');

  // Click #settingsbutton__BV_toggle_
  await page.click('#settingsbutton__BV_toggle_');

  // Click text=Inventory
  await page.click('text=Inventory');

  // Click a[role="menuitem"]:has-text("Inventory")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/inventory/list' }*/),
    page.click('a[role="menuitem"]:has-text("Inventory")')
  ]);

  // Click text=Create Inventory Item
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/inventory/new' }*/),
    page.click('text=Create Inventory Item')
  ]);

  // Click [placeholder="Name"]
  await page.click('[placeholder="Name"]');

  // Fill [placeholder="Name"]
  await page.fill('[placeholder="Name"]', 'meds1');

  // Click [placeholder="Given ID"]
  await page.click('[placeholder="Given ID"]');

  // Fill [placeholder="Given ID"]
  await page.fill('[placeholder="Given ID"]', 'm1');

  // Click [placeholder="Selling Price"]
  await page.click('[placeholder="Selling Price"]');

  // Fill [placeholder="Selling Price"]
  await page.fill('[placeholder="Selling Price"]', '20');

  // Press Tab
  await page.press('[placeholder="Selling Price"]', 'Tab');

  // Fill [placeholder="Minimum Selling Price"]
  await page.fill('[placeholder="Minimum Selling Price"]', '10');

  // Press Tab
  await page.press('[placeholder="Minimum Selling Price"]', 'Tab');

  // Fill [placeholder="Cost Price (Defaults to cost price in batch order if blank)"]
  await page.fill('[placeholder="Cost Price (Defaults to cost price in batch order if blank)"]', '5');

  // Click text=CategoryDrug ClassificationNormalClassifiedOTCPrescriptionControlled >> [placeholder="Category"]
  await page.click('text=CategoryDrug ClassificationNormalClassifiedOTCPrescriptionControlled >> [placeholder="Category"]');

  // Select NORMAL
  await page.selectOption('text=Drug ClassificationNormalClassifiedOTCPrescriptionControlled >> select', 'NORMAL');

  // Click [placeholder="Default Dosage"]
  await page.click('[placeholder="Default Dosage"]');

  // Fill [placeholder="Default Dosage"]
  await page.fill('[placeholder="Default Dosage"]', '2');

  // Select Swallow
  await page.selectOption('text=UsageApplyChewDissolveDropGargleInhaleInjectInsertInstillMassageMixPatchPlacePum >> select', 'Swallow');

  // Select 1
  await page.selectOption('text=Dose½11½22½3451020oncetwicesmallliberal1/21/43/46789 >> select', '1');

  // Select LOZENGE
  await page.selectOption('text=UnitAMOUNTAMPBOTTBOXCAP/SCCDROP/SENEMAEYE THINLYGMKIT/SLOZENGEMARK/SML/SROLL/SPA >> select', 'LOZENGE');

  // Select 4 - 4 hourly
  await page.selectOption('text=FreqM - every morningN - every nightD - dailyP - when requiredS - use as instruc >> select', '4 - 4 hourly');

  // Select 6 days
  await page.selectOption('text=Duration1 day2 days3 days4 days5 days6 days7 days8 days9 days10 days11 days12 da >> select', '6 days');

  // Click text=Provider Commission%$ >> input[type="number"]
  await page.click('text=Provider Commission%$ >> input[type="number"]');

  // Click [placeholder="e.g. US (for Ultrasound)"]
  await page.click('[placeholder="e.g. US (for Ultrasound)"]');

  // Press Tab
  await page.press('[placeholder="e.g. US (for Ultrasound)"]', 'Tab');

  // Press Enter
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/inventory/list' }*/),
    page.press(':nth-match(:text("Save"), 3)', 'Enter')
  ]);

  // Click text=Create Inventory Item
  await page.click('text=Create Inventory Item');
  // assert.equal(page.url(), 'https://hub-staging.vaultdragon.com/inventory/new');

  // Click [placeholder="Name"]
  await page.click('[placeholder="Name"]');

  // Click text=Inventory
  await page.click('text=Inventory');

  // Click text=Inventory
  await page.click('text=Inventory');

  // Click text=Inventory
  await page.click('text=Inventory');

  // Click text=Delivery Order
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/order/list' }*/),
    page.click('text=Delivery Order')
  ]);

  // Click text=Create Order
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/order/new' }*/),
    page.click('text=Create Order')
  ]);

  // Click [placeholder="Invoice No."]
  await page.click('[placeholder="Invoice No."]');

  // Fill [placeholder="Invoice No."]
  await page.fill('[placeholder="Invoice No."]', '2');

  // Click [placeholder="Reference"]
  await page.click('[placeholder="Reference"]');

  // Fill [placeholder="Reference"]
  await page.fill('[placeholder="Reference"]', '2');

  // Click input[type="search"]
  await page.click('input[type="search"]');

  // Fill input[type="search"]
  await page.fill('input[type="search"]', 'john');

  // Click [placeholder="Date Raised"]
  await page.click('[placeholder="Date Raised"]');

  // Click [placeholder="Date Raised"]
  await page.click('[placeholder="Date Raised"]');

  // Click [placeholder="Date Raised"]
  await page.click('[placeholder="Date Raised"]');

  // Click text=5
  await page.click('text=5');

  // Click [placeholder="Delivery Date"]
  await page.click('[placeholder="Delivery Date"]');

  // Click :nth-match(:text("26"), 3)
  await page.click(':nth-match(:text("26"), 3)');

  // Click [placeholder="Delivery Date"]
  await page.click('[placeholder="Delivery Date"]');

  // Select true
  await page.selectOption('text=Amounts Are Tax InclusiveTax Exclusive >> select', 'true');

  // Click [placeholder="Search Inventory by Name, Given Id"]
  await page.click('[placeholder="Search Inventory by Name, Given Id"]');

  // Fill [placeholder="Search Inventory by Name, Given Id"]
  await page.fill('[placeholder="Search Inventory by Name, Given Id"]', 'me');

  // Click text=Medicine
  await page.click('text=Medicine');

  // Click input[type="number"]
  await page.click('input[type="number"]');

  // Fill input[type="number"]
  await page.fill('input[type="number"]', '10');

  // Click [id="__BVID__682"]
  await page.click('[id="__BVID__682"]');

  // Fill [id="__BVID__682"]
  await page.fill('[id="__BVID__682"]', '5');

  // Click td:has-text("meds1 (M1)")
  await page.click('td:has-text("meds1 (M1)")');

  // Click input[type="number"]
  await page.click('input[type="number"]');

  // Fill input[type="number"]
  await page.fill('input[type="number"]', '30');

  // Click text=meds1 (M1) $$ Invalid Input! Invalid expiry (YYYY/MM)! $ Invalid Quantity! >> input[type="text"]
  await page.click('text=meds1 (M1) $$ Invalid Input! Invalid expiry (YYYY/MM)! $ Invalid Quantity! >> input[type="text"]');

  // Fill text=meds1 (M1) $$ Invalid Input! Invalid expiry (YYYY/MM)! $ Invalid Quantity! >> input[type="text"]
  await page.fill('text=meds1 (M1) $$ Invalid Input! Invalid expiry (YYYY/MM)! $ Invalid Quantity! >> input[type="text"]', '1');

  // Click [placeholder="Pick a month"]
  await page.click('[placeholder="Pick a month"]');

  // Fill [placeholder="Pick a month"]
  await page.fill('[placeholder="Pick a month"]', '');

  // Click a:has-text("Jun")
  await page.click('a:has-text("Jun")');

  // Click [placeholder="Amount"]
  await page.click('[placeholder="Amount"]');

  // Fill [placeholder="Amount"]
  await page.fill('[placeholder="Amount"]', '20');

  // Click div[role="tabpanel"] >> text=Save
  await page.click('div[role="tabpanel"] >> text=Save');

  // Click [placeholder="Pick a month"]
  await page.click('[placeholder="Pick a month"]');

  // Click [placeholder="Pick a month"]
  await page.click('[placeholder="Pick a month"]');

  // Click text=DetailsUpload*
  await page.click('text=DetailsUpload*');

  // Click text=Upload*
  await page.click('text=Upload*');

  // Click input[type="file"]
  await page.click('input[type="file"]');

  // Upload bby.jpg
  await page.setInputFiles('input[type="file"]', 'bby.jpg');

  // Click img[alt="Fluid-grow image"]
  await page.click('img[alt="Fluid-grow image"]');

  // Click text=Save
  await page.click('text=Save');

  // Click text=Details
  await page.click('text=Details');

  // Click input[type="search"]
  await page.click('input[type="search"]');

  // Click #settingsbutton__BV_toggle_
  await page.click('#settingsbutton__BV_toggle_');

  // Open new page
  const page1 = await context.newPage();
  await page1.goto('https://hub-staging.vaultdragon.com/supplier/list');

  // Close page
  await page1.close();

  // Click text=Campaign
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/campaign/list' }*/),
    page.click('text=Campaign')
  ]);

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();