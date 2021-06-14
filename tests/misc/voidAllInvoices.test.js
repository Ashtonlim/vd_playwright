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
  

    await page.click('text=PAYMENT');

    await page.waitForTimeout(2000)
    // await page.waitForSelector('button:has-text("Void")') // will not exist if all voided

    // does not seem to exit after voiding all. But works.
    while (await page.isVisible('button:has-text("Void")')) {

      // console.log(await page.isVisible('button:has-text("Void")'))

      // Click button:has-text("Void")
      await page.click('button:has-text("Void")');
    
      // Click textarea
      await page.click('textarea');
    
      // Fill textarea
      await page.fill('textarea', 'testing');
    
      // Click text=Confirm
      await page.click('text=Confirm');

    }

    return
  


  })

})
