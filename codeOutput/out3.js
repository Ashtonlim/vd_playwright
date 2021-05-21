const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext({
    viewport: {
      width: 1920,
      height: 1080
    },
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

  // Click button:has-text("✓")
  await page.click('button:has-text("✓")');

  // Click text=Delete
  await page.click('text=Delete');

  // Click div[role="dialog"]:has-text("Delete Record×To delete, type in the number of record(s) to delete.Your answer i")
  await page.click('div[role="dialog"]:has-text("Delete Record×To delete, type in the number of record(s) to delete.Your answer i")');

  // Press F12
  await page.press('text=Delete', 'F12');

  // Click text=✓DeleteEdit-- All Rooms --Room 1-- All Services --Service 1-- All Providers --Do
  await page.click('text=✓DeleteEdit-- All Rooms --Room 1-- All Services --Service 1-- All Providers --Do');

  // Click text=Queue< < May 2021 > SunMonTueWedThuFriSat 12345678910111213141516171819202122232
  await page.click('text=Queue< < May 2021 > SunMonTueWedThuFriSat 12345678910111213141516171819202122232');

  // Press F12
  await page.press('body:has-text("<strong>We\'re sorry but dragonhub-v2-frontend doesn\'t work properly without Java")', 'F12');

  // Press F12
  await page.press('body:has-text("<strong>We\'re sorry but dragonhub-v2-frontend doesn\'t work properly without Java")', 'F12');

  // Click text=Delete
  await page.click('text=Delete');

  // Click [placeholder="6"]
  await page.click('[placeholder="6"]');

  // Fill [placeholder="6"]
  await page.fill('[placeholder="6"]', '6');

  // Click text=Cancel
  await page.click('text=Cancel');

  // Click text=Pharmacy 12 0
  await page.click('text=Pharmacy 12 0');
  // assert.equal(page.url(), 'https://hub-staging.vaultdragon.com/pharmacy');

  // Click span:has-text("Confirmed")
  await page.click('span:has-text("Confirmed")');

  // Press F12
  await page.press('div[role="tabpanel"]:has-text("Pharmacy May 20, 2021 - May 20, 2021 Generate -- All Services --Service 1-- All ")', 'F12');

  // Select Executed
  await page.selectOption('text=meds1 (Swallow 1 LOZENGE 4 - 4 hourly 6 days) 1 1 Confirmed Confirm Correct Exec >> select', 'Executed');

  // Select Executed
  await page.selectOption('div:nth-child(3) .card-body .vgt-wrap .vgt-inner-wrap .vgt-responsive .vgt-table tbody tr td:nth-child(6) .custom-select', 'Executed');

  // Click div:nth-child(3) .card-body .dispense__details .dispense__details__col.col-md-2 .btn.btn-sm.btn-outline-success
  await page.click('div:nth-child(3) .card-body .dispense__details .dispense__details__col.col-md-2 .btn.btn-sm.btn-outline-success');

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();