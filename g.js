// URLs
const URL = `https://hub-staging.vaultdragon.com`

module.exports.URL = URL; // will ...url = url cuz issue?
module.exports.loginURL = `${URL}/login`;
module.exports.QueuePage = `${URL}/queue/list`;
// module.exports.QueuePage = `https://hub-staging.vaultdragon.com/queue/list`;

// Settings
module.exports.headless = true;
module.exports.slomo = 80;
module.exports.sspath = `/screenshots`
module.exports.viewport = {
    width: 1920,
    height: 1080,
}
module.exports.recordVideo = {
    dir: "./recordings"
}
