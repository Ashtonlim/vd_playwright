const { login } = require(process.cwd() + '/steps');
const { URL, viewportSettings, recordVideoSettings } = require(process.cwd() + '/g');

const storageState = require(process.cwd() + '/creds.json');

let context;
let page;

let i = 0;

module.exports.init = async (browser, skipLogin = true, recVid=true, contextObj = {viewportSettings}) => {
    if (skipLogin || Object.keys(storageState).length || typeof process.env.storage !== 'undefined') {
        contextObj = {...contextObj, storageState}
    }

    if (recVid || Object.keys(recordVideoSettings).length) {
        contextObj = {...contextObj, recordVideoSettings}
    }

    context = await browser.newContext(contextObj);
    page = await context.newPage();
    await page.goto(URL);

    if (!skipLogin) {await login(page);}

    return {context, page}

    // fs.writeFileSync('./creds.json', JSON.stringify(await context.storageState()));
    

}

 