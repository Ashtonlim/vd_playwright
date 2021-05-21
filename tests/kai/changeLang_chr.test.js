const { chromium } = require('playwright');
const { login } = require(process.cwd() + '/steps/login');
const { URL, headless, viewport } = require(process.cwd() + '/g');

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

describe("init VD", () => {

  it('change language', async () => {

    await page.click('text=VD Support Location 1');

    // Select th
    await page.selectOption('select', 'th');

    // Select id
    await page.selectOption('select', 'id');

    // Select ja
    await page.selectOption('select', 'ja');

    // Select ko
    await page.selectOption('select', 'ko');

    // Select zh-cn
    await page.selectOption('select', 'zh-cn');

    // Select zh-cn-tr
    await page.selectOption('select', 'zh-cn-tr');
    
  })

})
