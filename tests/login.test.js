const { chromium } = require('playwright');
let browser;
let page;
let context

beforeAll(async () => {
  browser = await chromium.launch();
});
afterAll(async () => {
  await browser.close();
});
beforeEach(async () => {
  page = await browser.newPage();
});
afterEach(async () => {
  await page.close();
});

it("Home page should have the correct title", async () => {
  await page.goto("https://hub-staging.vaultdragon.com/login");
  expect(await page.title()).toBe("Dragonhub V2");

      // Click [placeholder="Organization code"]
    await page.click('[placeholder="Organization code"]');
    // Fill [placeholder="Organization code"]
    await page.fill('[placeholder="Organization code"]', 'uilicious');
    // Press Tab
    await page.press('[placeholder="Organization code"]', 'Tab');
    // Fill [placeholder="Email address"]
    await page.fill('[placeholder="Email address"]', 'vaultdragon.com');
    // Press Home
    await page.press('[placeholder="Email address"]', 'Home');
    // Fill [placeholder="Email address"]
    await page.fill('[placeholder="Email address"]', 'support@vaultdragon.com');
    // Press Tab
    await page.press('[placeholder="Email address"]', 'Tab');
    // Fill [placeholder="Password"]
    await page.fill('[placeholder="Password"]', 'vd_0802!');
    // Press Home with modifiers
    await page.press('[placeholder="Password"]', 'Shift+Home')
});

// test('login', async () => {
//   const page = await context.newPage();
//     // Go to https://hub-staging.vaultdragon.com/login
//     await page.goto('https://hub-staging.vaultdragon.com/login');
    
//     // Click [placeholder="Organization code"]
//     await page.click('[placeholder="Organization code"]');
//     // Fill [placeholder="Organization code"]
//     await page.fill('[placeholder="Organization code"]', 'uilicious');
//     // Press Tab
//     await page.press('[placeholder="Organization code"]', 'Tab');
//     // Fill [placeholder="Email address"]
//     await page.fill('[placeholder="Email address"]', 'vaultdragon.com');
//     // Press Home
//     await page.press('[placeholder="Email address"]', 'Home');
//     // Fill [placeholder="Email address"]
//     await page.fill('[placeholder="Email address"]', 'support@vaultdragon.com');
//     // Press Tab
//     await page.press('[placeholder="Email address"]', 'Tab');
//     // Fill [placeholder="Password"]
//     await page.fill('[placeholder="Password"]', 'vd_0802!');
//     // Press Home with modifiers
//     await page.press('[placeholder="Password"]', 'Shift+Home');
//     // Fill [placeholder="Password"]
//     await page.fill('[placeholder="Password"]', 'vd_0802!');
//     // Press Enter
//     await Promise.all([
//       page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/' }*/),
//       page.press('[placeholder="Password"]', 'Enter')
//     ]);
//     // Click text=Queue
//     await Promise.all([
//       page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/queue/list' }*/),
//       page.click('text=Queue')
//     ]);
// });