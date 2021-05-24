const { chromium } = require('playwright');
const { init, teardown, logout } = require(process.cwd() + '/steps');
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

describe("Simple change lang", () => {

  it('change language', async () => {

    await page.click('text=VD Support Location 1');
    await page.selectOption('select', 'th');
    await page.selectOption('select', 'id');
    await page.selectOption('select', 'ja');
    await page.selectOption('select', 'ko');
    await page.selectOption('select', 'zh-cn');
    await page.selectOption('select', 'zh-cn-tr');
    await page.selectOption('select', 'en');

    await page.click('text=Welcome back VD Support!');

    await logout(page)

    await page.selectOption('select', 'zh-cn');
    await page.click('[placeholder="机构代码"]');
    await page.selectOption('select', 'th');
    await page.click('[placeholder="รหัสองค์กร"]');
    await page.selectOption('select', 'id');
    await page.click('[placeholder="Alamat Email"]');
    await page.selectOption('select', 'en');
    await page.click('[placeholder="Organization code"]')
    
  })

})
