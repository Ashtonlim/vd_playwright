const { chromium } = require('playwright');
const { init, teardown, clearQueue } = require(process.cwd() + '/steps');
const { headless } = require(process.cwd() + '/g');

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
  ({context, page} = await init(browser));
});

afterEach(async () => {
  await teardown(page, path=require('path').basename(__filename))
});

describe("init VD", () => {

  it('clear queue', async () => {
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/queue/list' }*/),
      page.click('text=Queue')
    ]);

    await clearQueue(page);

  })

})
