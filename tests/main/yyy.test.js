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
  ({ context, page } = await init(browser));
});

afterEach(async () => {
  await teardown(page, path = require('path').basename(__filename))
});

describe("removes data", () => {

  it('clear queue in queue list', async () => {
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/),
      page.click('text=Patient')
    ]);

    // Click text=Virgie Goodman
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd9332a1e310013df1e66' }*/),
      page.click('text=Virgie Goodman')
    ]);

    // Double click a[role="tab"]:has-text("APPOINTMENT")
    await page.dblclick('a[role="tab"]:has-text("APPOINTMENT")');
    await page.waitForTimeout(4000)


  })

})
