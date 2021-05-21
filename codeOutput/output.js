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

  // Click text=Appointment
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/appointment/list' }*/),
    page.click('text=Appointment')
  ]);

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();