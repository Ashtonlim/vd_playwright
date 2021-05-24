const { login } = require(process.cwd() + '/steps');
const { URL, viewport, recordVideo } = require(process.cwd() + '/g');
const storageState = require(process.cwd() + '/creds.json');

let context;
let page;


console.log(viewport, recordVideo)

module.exports.init = async (browser, skipLogin = true, recVid=true, contextObj = {viewport}) => {
    if (skipLogin || Object.keys(storageState).length || typeof process.env.storage !== 'undefined') {
        contextObj = {...contextObj, storageState}
        console.log(123, contextObj)
    }

    if (recVid || Object.keys(recordVideo).length) {
        console.log()
        contextObj = {...contextObj, recordVideo}
        console.log(456, contextObj)
    }

    context = await browser.newContext(contextObj);
    page = await context.newPage();
    await page.goto(URL);

    if (!skipLogin) {await login(page);}

    return {context, page}

    // fs.writeFileSync('./creds.json', JSON.stringify(await context.storageState()));

}
