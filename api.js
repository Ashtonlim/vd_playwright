// extend and fix existing API by playwright

var dayjs = require('dayjs')

// sel = dropdown, index takes priority, else userOpt based on label/text
// since similar implementaion to page.selectOption(), this fn is obsolete
const selDropdownOpt = async (page, sel, { userOpt, index }) => {
    await page.waitForSelector(`css=${sel}`)
    await page.$eval(
        sel,
        (e, { userOpt, index }) => {
            if (index >= 0) {
                // if index is set, prioritize
                e.selectedIndex = index // + in case it's a string
                return
            }

            let opt = userOpt.toString().toLowerCase()
            let i

            for (i = 0; i < e.length; i++) {
                if (e[i].innerText.toLowerCase().replace(/\s\s+/g, '') == opt) {
                    e.selectedIndex = i
                    return
                }
            }
        },
        { userOpt, index }
    ) // must specify opt arg here to add it to pageFn
}

const get_D_MMM_YYYY = () => dayjs().format('D MMM YYYY')

module.exports.selDropdownOpt = selDropdownOpt
module.exports.get_D_MMM_YYYY = get_D_MMM_YYYY
