// const { login } = require(process.cwd() + '/steps');
const { SSPath } = require(process.cwd() + '/g')
const dayjs = require('dayjs')
const crypto = require('crypto')

module.exports.teardown = async (page, path = 'testing', testFailed) => {
  let hash = crypto.randomBytes(3).toString('hex')

  await page.waitForTimeout(800)
  if (testFailed) {
    await page.screenshot({ path: `${SSPath}/${dayjs().format('YY-MM-DD@HHmm')}_${path.replace('.test.', '_')}${hash}.png` })
  }

  await page.close()
}
