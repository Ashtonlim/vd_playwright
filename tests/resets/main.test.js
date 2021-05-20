const { chromium } = require('playwright');
const { login } = require(process.cwd() + '/steps/login');
const { URL } = require(process.cwd() + '/g');

describe('reset data', () => {
    it('clear queue', async () => {
        const browser = await chromium.launch({
            headless: false
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(URL);
        await login(page)
        await page.screenshot({ path: `example.png` });
        await browser.close();
    })
})

