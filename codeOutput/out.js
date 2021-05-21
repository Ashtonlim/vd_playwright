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

  // Click text=Pharmacy 0 0
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/pharmacy' }*/),
    page.click('text=Pharmacy 0 0')
  ]);

  // Click text=Inventory
  await page.click('text=Inventory');

  // Click text=Inventory
  await page.click('text=Inventory');

  // Click text=Inventory
  await page.click('text=Inventory');

  // Click a[role="menuitem"]:has-text("Inventory")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/inventory/list' }*/),
    page.click('a[role="menuitem"]:has-text("Inventory")')
  ]);

  // Click text=Invoice
  await page.click('text=Invoice');

  // Click text=Patient
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/),
    page.click('text=Patient')
  ]);

  // Click td:has-text("Maurice Hamilton")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd53d37feb000126fba10' }*/),
    page.click('td:has-text("Maurice Hamilton")')
  ]);

  // Click text=Maurice Hamilton
  await page.click('text=Maurice Hamilton');

  // Click a[role="tab"]:has-text("INVOICE")
  await page.click('a[role="tab"]:has-text("INVOICE")');

  // Click text=PAYMENT
  await page.click('text=PAYMENT');

  // Click a[role="tab"]:has-text("INVOICE")
  await page.click('a[role="tab"]:has-text("INVOICE")');

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();