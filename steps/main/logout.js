module.exports.logout = async (page) => {
    // Click text=VD Support Location 1
    await page.click('text=VD Support Location 1')

    // Click a[role="menuitem"]:has-text("Sign Out")
    await Promise.all([
        page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/logout' }*/),
        page.click('a[role="menuitem"]:has-text("Sign Out")'),
    ])

    // Click text=Click Here to Login again.
    await Promise.all([
        page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/login' }*/),
        page.click('text=Click Here to Login again.'),
    ])
}
