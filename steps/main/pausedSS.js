module.exports.pausedSS = async (page, { fileName = 'pleaseAddAFileName', path = 'noPathSpecified-', wait = 2500 } = {}) => {
    await page.waitForTimeout(wait)
    await page.screenshot({ path: `./screenshots/${path.replace('test.js', '')}${fileName}.png` })
    await page.waitForTimeout(wait)
}
