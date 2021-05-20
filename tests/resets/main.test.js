const { chromium } = require('playwright');
const { login } = require(process.cwd() + '/steps/login');
const { URL, headless } = require(process.cwd() + '/g');

let i = 0

const x = async (browser) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(URL);
    await login(page)
    await page.screenshot({ path: `./screenshots/example${i++}.png` });
    await context.close();
}

describe('reset data', () => {
    it('clear queue', async () => {
        // jest.setTimeout(30000)
        const browser = await chromium.launch({
            headless
        });

        await Promise.all([x(browser),x(browser),x(browser),x(browser),x(browser),x(browser),x(browser)])

        await browser.close();

    })
})

