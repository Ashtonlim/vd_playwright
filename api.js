// extend and fix existing API by playwright

const dayjs = require('dayjs')

// sel = dropdown, index takes priority, else userOpt based on label/text
// since similar implementaion to page.selectOption(), this fn is obsolete
// const selDropdownOpt = async (page, sel, { userOpt, index }) => {
//     await page.waitForSelector(`css=${sel}`)
//     await page.$eval(
//         sel,
//         (e, { userOpt, index }) => {
//             if (index >= 0) {
//                 // if index is set, prioritize
//                 e.selectedIndex = index // + in case it's a string
//                 return
//             }

//             let opt = userOpt.toString().toLowerCase()
//             let i

//             for (i = 0; i < e.length; i++) {
//                 if (e[i].innerText.toLowerCase().replace(/\s\s+/g, '') == opt) {
//                     e.selectedIndex = i
//                     return
//                 }
//             }
//         },
//         { userOpt, index }
//     ) // must specify opt arg here to add it to pageFn
// }

// const qweClick = async (page, sel) => {
//     await page.waitForSelector(`css=${sel}`)
//     await page.$eval(sel, (e) => {
//         e.click()
//     })
// }

// module.exports.selDropdownOpt = selDropdownOpt
// module.exports.qweClick = qweClick

const get_D_MMM_YYYY = () => dayjs().format('D MMM YYYY')
const get_DD_MMM_YYYY = () => dayjs().format('DD MMM YYYY')
const get_MMM_YYYY = () => dayjs().format('MMM YYYY')

module.exports.get_D_MMM_YYYY = get_D_MMM_YYYY
module.exports.get_DD_MMM_YYYY = get_DD_MMM_YYYY
module.exports.get_MMM_YYYY = get_MMM_YYYY
