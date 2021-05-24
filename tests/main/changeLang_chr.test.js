const { chromium } = require('playwright');
const { init, teardown } = require(process.cwd() + '/steps');
const { headless } = require(process.cwd() + '/g');

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
  ({context, page} = await init(browser));
});

afterEach(async () => {
  await teardown(page, path=require('path').basename(__filename))
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
