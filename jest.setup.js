const fs = require('fs')
const secs = 150
jest.setTimeout(secs * 1000)

// global.it = async function (name, func) {
//   return await test(name, async () => {
//     try {
//       await func()
//     } catch (e) {
//       await fs.ensureDir('e2e/screenshots')
//       await page.screenshot({ path: `e2e/screenshots/${name}.png` })
//       throw e
//     }
//   })
// }
