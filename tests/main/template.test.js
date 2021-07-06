require('dotenv').config()
const { chromium } = require('playwright')
const { init, teardown, delPatient, pausedSS, createInvoice, payInvoice } = require(process.cwd() + '/steps')
const { browserSettings } = require(process.cwd() + '/g')

let browser, context, page
let failing = true
const path = require('path').basename(__filename)

beforeAll(async () => {
    browser = await chromium.launch(browserSettings)
})

afterAll(async () => {
    await browser.close()
})

beforeEach(async () => {
    ; ({ context, page } = await init(browser, path))
})

afterEach(async () => {
    await teardown(page, path, failing)
})


describe('removes data', () => {
    it('clear queue in queue list', async () => {
        // Add test code below


        // Add test code above

        // if test reaches here -> no issues encountered.
        failing = fasle
    })
})
