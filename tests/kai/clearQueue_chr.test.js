const { chromium } = require('playwright');
const { login, clearQueue } = require(process.cwd() + '/steps');
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

    context = await browser.newContext({viewport, storageState});
    page = await context.newPage();
    
    await page.goto(URL);

  } else {
    context = await browser.newContext({viewport});
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

describe("init VD", () => {

  it('clear queue', async () => {
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/queue/list' }*/),
      page.click('text=Queue')
    ]);

    await clearQueue(page);

  })

})
