const playwright = require('playwright');

it('test all', async () => {

  for (const browserType of ['webkit']) {
    const browser = await playwright[browserType].launch({
      headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://whatsmyuseragent.org/');
    await page.screenshot({ path: `./screenshots/example-${browserType}.png` });
    await browser.close();
  }

})