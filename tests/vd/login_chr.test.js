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
    expect(await page.title()).toBe("Dragonhub V2");

  } else {
    context = await browser.newContext();
    page = await context.newPage();

    await page.goto(URL);
    expect(await page.title()).toBe("Dragonhub V2");
    await login(page);

    fs.writeFileSync('./creds.json', JSON.stringify(await context.storageState()));
    // process.env.STORAGE = JSON.stringify(await context.storageState());
  }
  
  
});

afterEach(async () => {
  await page.screenshot({ path: `./screenshots/vdTest${i++}.png` });
  await page.close();
});

describe("init VD", () => {


  it("Del", async () => {
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/queue/list' }*/),
      page.click('text=Queue')
    ]);

    await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]');
    await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'ma');
    await page.click('text=Maurice Hamilton: ETZ8DAZOJV (1) Tel: +6596080926');

    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd53d37feb000126fba10' }*/),
      page.click('text=Maurice Hamilton -')
    ]);

    await page.dblclick('text=Maurice Hamilton');


    await page.click('text=Add');
    await page.click('input[type="number"]');
    await page.fill('input[type="number"]', '8');
    await page.press('input[type="number"]', 'Tab');
    await page.fill('text=Weight kg >> input[type="number"]', '9');
    await page.press('text=Weight kg >> input[type="number"]', 'Tab');
    await page.fill('text=LMP date >> input[type="text"]', '2021-05-05');
    await page.click('text=LMP date >> input[type="text"]');
    await page.press('text=LMP date >> input[type="text"]', 'Enter');
    await page.click('text=Waist Circumference inch >> input[type="text"]');
    await page.fill('text=Waist Circumference inch >> input[type="text"]', '5');
    await page.press('text=Waist Circumference inch >> input[type="text"]', 'Tab');
    await page.fill('text=Pulse bpm >> input[type="text"]', '5');
    await page.press('text=Pulse bpm >> input[type="text"]', 'Tab');
    await page.fill('text=Systolic mmHg >> input[type="text"]', '5');
    await page.press('text=Systolic mmHg >> input[type="text"]', 'Tab');
    await page.fill('text=Diastolic mmHg >> input[type="text"]', '5');
    await page.press('text=Diastolic mmHg >> input[type="text"]', 'Tab');
    await page.press('button:has-text("Save")', 'Enter');
    

  })

    
  it("Del queue", async () => {
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/queue/list' }*/),
      page.click('text=Queue')
    ]);


  })

})
