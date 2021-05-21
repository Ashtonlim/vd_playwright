module.exports.login = async (page) => {
    await page.click('[placeholder="Organization code"]');
    await page.fill('[placeholder="Organization code"]', 'uilicious');
    await page.press('[placeholder="Organization code"]', 'Tab');
    await page.fill('[placeholder="Email address"]', 'vaultdragon.com');
    await page.press('[placeholder="Email address"]', 'Home');
    await page.fill('[placeholder="Email address"]', 'support@vaultdragon.com');
    await page.press('[placeholder="Email address"]', 'Tab');
    await page.fill('[placeholder="Password"]', 'vd_0802!');
    await page.press('[placeholder="Password"]', 'Shift+Home');
    await Promise.all([
        page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/' }*/),
        page.press('[placeholder="Password"]', 'Enter')
    ]);
    
}

