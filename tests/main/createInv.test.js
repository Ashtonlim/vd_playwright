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
    await page.fill('[placeholder="Search inventory items"]', 'meds1');

    // Click text=Medicine
    await page.click('text=meds1');
  
    // Click button:has-text("Payment")
    await page.click('button:has-text("Payment")');
  
    await page.selectOption('text=Payment Methods PayPal(Online)-Offset $0.00 Offset $0.00 Cash Offset - Credit No >> select', {label:'Cash'});

    await page.click('[aria-label="Payment Method Amount"]');
    await page.fill('[aria-label="Payment Method Amount"]', '20');
    await page.press('[aria-label="Payment Method Amount"]', 'Enter');

    // Need to wait, clicking make payment too fast doesn't save payment.
    // Could be that Vue has not triggered
    await page.waitForTimeout(5000);
  
    await page.click('text=Make Payment');


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
