// const { login } = require(process.cwd() + '/steps');
const { SSPath } = require(process.cwd() + '/g')

const crypto = require('crypto')

module.exports.teardown = async (page, path = 'testing') => {
  let hash = crypto.randomBytes(5).toString('hex')

  await page.waitForTimeout(800)
  await page.screenshot({ path: `${SSPath}/${path.replace('test.', '')}${hash}.png` })
  await page.close()
}
