module.exports.login = async (page, { org = 'uilicious' } = {}) => {
  await page.click('[placeholder="Organization code"]')
  await page.fill('[placeholder="Organization code"]', org)
  await page.press('[placeholder="Organization code"]', 'Tab')
  await page.fill('[placeholder="Email address"]', 'vaultdragon.com')
  await page.press('[placeholder="Email address"]', 'Home')
  await page.fill('[placeholder="Email address"]', 'support@vaultdragon.com')
  await page.press('[placeholder="Email address"]', 'Tab')
  await page.fill('[placeholder="Password"]', 'vd_0802!')
  await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/' }*/), page.press('[placeholder="Password"]', 'Enter')])
}
