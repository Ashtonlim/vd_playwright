// const { login } = require(process.cwd() + '/steps');
// const { URL } = require(process.cwd() + '/g');

const crypto = require("crypto");

module.exports.teardown = async (page, path='testing') => {
    var hash = crypto.randomBytes(5).toString('hex');

    await page.screenshot({ path: `./screenshots/${path.replace('test.', '')}${hash}.png` });
    await page.close();

}
