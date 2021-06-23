const path = require('path')
const { reportProdConfig } = require(process.cwd() + '/g')
const reportFilename = path.dirname(__filename).split(path.sep).pop()
reportProdConfig['reporters'][1][1]['filename'] = `${reportFilename}.html`
module.exports = reportProdConfig
