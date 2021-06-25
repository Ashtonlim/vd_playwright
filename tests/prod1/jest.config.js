const path = require('path')

const { reportProdConfig } = require(process.cwd() + '/g')
// get the name of folder, to produce same html filename, i.e. prodx.html
const reportFilename = path.dirname(__filename).split(path.sep).pop()
reportProdConfig['reporters'][1][1]['filename'] = `${reportFilename}.html`

module.exports = reportProdConfig
