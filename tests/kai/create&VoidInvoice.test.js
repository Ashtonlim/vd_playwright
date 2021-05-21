const { chromium } = require('playwright');
const { login, clearQueue } = require(process.cwd() + '/steps/login');
const { URL, headless, viewport, QueuePage } = require(process.cwd() + '/g');

const fs = require('fs');
let storageState = {};
// storageState = require('../creds.json');

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
  // Save storage state and store as an env variable
  if (Object.keys(storageState).length || typeof process.env.storage !== 'undefined') {
    // Create a new context with the saved storage state
    // storageState = JSON.parse(process.env.storage);

    context = await browser.newContext({storageState});
    page = await context.newPage();
    
    await page.goto(URL);

  } else {
    context = await browser.newContext();
    page = await context.newPage();

    await page.goto(URL);
    await login(page);

    fs.writeFileSync('./creds.json', JSON.stringify(await context.storageState()));
    // process.env.STORAGE = JSON.stringify(await context.storageState());
  }
  
  
});

afterEach(async () => {
  await page.screenshot({ path: `./screenshots/kai${i++}.png` });
  await page.close();
});

describe("patient", () => {

  it('create and void an invoice', async () => {

     
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/),
      page.click('text=Patient')
    ]);
  
    // Click text=Maurice Hamilton
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd53d37feb000126fba10' }*/),
      page.click('text=Maurice Hamilton')
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
    await page.fill('[placeholder="Search inventory items"]', 'meds');
  
    // Click text=Medicine
    await page.click('text=Medicine');
  
    // Click button:has-text("Payment")
    await page.click('button:has-text("Payment")');
  
    // Select [object Object]
    await page.selectOption('text=Payment Methods PayPal(Online)-Offset $0.00 Offset $0.00 Cash Offset - Credit No >> select', '[object Object]');
  
    // Click text=Cancel
    await page.click('text=Cancel');
  
    // Click text=PAYMENT
    await page.click('text=PAYMENT');
  
    // Click button:has-text("Void")
    await page.click('button:has-text("Void")');
  
    // Click textarea
    await page.click('textarea');
  
    // Fill textarea
    await page.fill('textarea', 'testing');
  
    // Click text=Confirm
    await page.click('text=Confirm');

  })

})
