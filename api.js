// extend and fix existing API by playwright

// sel = dropdown, opt based on innertext first, if not index
const selDropdownOpt = async (page, sel, opt) => {
    
    await page.waitForSelector(`css=${sel}`);
    await page.$eval(sel, (e, opt) => {
        let i;
        for (i = 0; i < e.length; i++){
            if (e[i].innerText == opt) {
                e.selectedIndex = opt
                return
            }
        }
        e.selectedIndex = +opt // + in case it's a string
    }, opt) // must specify opt arg here to add it to pageFn
}

module.exports.selDropdownOpt = selDropdownOpt;