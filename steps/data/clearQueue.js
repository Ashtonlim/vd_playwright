const { queuePage } = require(process.cwd() + '/g')

module.exports.clearQueue = async (page) => {
  expect(page.url()).toBe(queuePage)

  // Click button:has-text("✓")
  await page.click('button:has-text("✓")')

  if (await page.isEnabled('text=Delete')) {
    await page.click('text=Delete')
    const numRows = await page.getAttribute('#answerInput', 'placeholder')

    await page.click('#answerInput')
    await page.fill('#answerInput', numRows)

    await page.click('text=Ok')
  }
}
