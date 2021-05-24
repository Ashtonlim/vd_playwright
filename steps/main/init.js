const { login } = require(process.cwd() + '/steps');
const { URL, viewport, recordVideo } = require(process.cwd() + '/g');
const fs = require('fs');
const storageState = require(process.cwd() + '/creds.json');
// let storageState = {}
let context;
let page;



module.exports.init = async (browser, skipLogin = true, recVid=false, contextObj = {viewport}) => {
    if (skipLogin || Object.keys(storageState).length || typeof process.env.storage !== 'undefined') {
        contextObj = {...contextObj, storageState}
    }

    if (recVid || Object.keys(recordVideo).length) {
        contextObj = {...contextObj, recordVideo}
    }

    context = await browser.newContext(contextObj);
    page = await context.newPage();
    await page.goto(URL);

    if (!skipLogin) {await login(page);}

    return {context, page}

    // fs.writeFileSync('./creds.json', JSON.stringify(await context.storageState()));

}
