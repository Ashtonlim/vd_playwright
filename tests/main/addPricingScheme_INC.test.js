const { chromium } = require('playwright')
const { init, teardown } = require(process.cwd() + '/steps')
const { browserSettings } = require(process.cwd() + '/g')

let browser, context, page

beforeAll(async () => {
    browser = await chromium.launch(browserSettings)
})

afterAll(async () => {
    await browser.close()
})

beforeEach(async () => {
    ;({ context, page } = await init(browser))
})

afterEach(async () => {
    await teardown(page, (path = require('path').basename(__filename)))
})

describe('Pricing scheme', () => {
    it('adds a pricing scheme and deletes it', async () => {
        await page.click('#settingsbutton__BV_toggle_')
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/corporate/list' }*/),
            page.click('#settingsbutton >> text=Corporate / Insurance'),
        ])
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/corporate/new' }*/),
            page.click('text=Create New Corporate'),
        ])
        await page.click('[placeholder="Name"]')
        await page.fill('[placeholder="Name"]', 'Demo copr01')
        await page.press('[placeholder="Name"]', 'Tab')
        await page.fill('[placeholder="Given ID"]', 'Dc')
        await page.click('[placeholder="Name"]')
        await page.fill('[placeholder="Name"]', 'Demo copr02')
        await page.click('[placeholder="Given ID"]')
        await page.click('[placeholder="Name"]')
        await page.fill('[placeholder="Name"]', 'Demo copr22')
        await page.click('[placeholder="Given ID"]')
        await page.fill('[placeholder="Given ID"]', 'Dc22')
        await page.click('text=Company Name *Company ID *Type *CorporateInsuranceHospitalNoneAddressTelephoneEm')
        await page.click('[placeholder="Address"]')
        await page.click('text=Pricing Scheme')
        await page.click('[placeholder="Pricing Scheme Name"]')
        await page.fill('[placeholder="Pricing Scheme Name"]', 'demo scheme 22')
        await page.selectOption('text=Inventory Type--Select--ConsumablesExpendablesProcedureTeleconsult AmountPackage >> select', 'Product')
        await page.click('input[type="number"]')

        // await page.selectOption('text=Inventory Type--Select--ConsumablesExpendablesProcedureTeleconsult AmountPackage >> select', 'Investigation')
        // await page.click('button:has-text("Add")')
        // await page.click('text=Add Medicine%$ >> :nth-match(button, 2)')
        // await page.click('text=meds1 % Yes >> input[type="number"]')
        // await page.fill('text=meds1 % Yes >> input[type="number"]', '10')
        // await page.click('label:has-text("Yes")')
        // await page.click('text=Ok')
        // await page.click('text=Add Investigation%$ >> :nth-match(button, 2)')
        // await page.click('text=Ok')

        await page.selectOption('text=Inventory Type--Select--ConsumablesExpendablesProcedureTeleconsult AmountPackage >> select', 'Package')
        await page.click('button:has-text("Add")')
        await page.selectOption('text=Inventory Type--Select--ConsumablesExpendablesProcedureTeleconsult AmountBundleI >> select', 'Procedure')
        await page.click('button:has-text("Add")')

        await page.click('text=Add Medicine%$ >> :nth-match(button, 2)')
        await page.click('text=meds1 % Yes >> input[type="number"]')
        await page.fill('text=meds1 % Yes >> input[type="number"]', '10')
        await page.click('text=Ok')
        await page.click('text=Add Package%$ >> :nth-match(button, 2)')
        await page.click('text=bestpacki2l2fyq359a % Yes >> input[type="number"]')
        await page.fill('text=bestpacki2l2fyq359a % Yes >> input[type="number"]', '')
        await page.click('[id="__BVID__358___BV_modal_body_"]')
        await page.click('text=bestpacki2l2fyq359a % Yes >> input[type="number"]')
        await page.fill('text=bestpacki2l2fyq359a % Yes >> input[type="number"]', '5')
        await page.press('text=bestpacki2l2fyq359a % Yes >> input[type="number"]', 'Enter')
        await page.click('text=bestpacki2l2fyq359a % Yes >> input[type="number"]')
        await page.click('text=CancelOk')
        await page.click('text=bestpacki2l2fyq359a % Yes >> input[type="number"]')
        await page.fill('text=bestpacki2l2fyq359a % Yes >> input[type="number"]', '20')
        await page.click('text=CancelOk')
        await page.click('text=bestpacki2l2fyq359a % Yes >> label')
        await page.dblclick(':nth-match(:text("Yes"), 3)')
        await page.click('text=Ok')
        await page.click('text=Add Package%$ Multiple values applied >> :nth-match(button, 2)')
        await page.click(':nth-match(td:has-text("%"), 5)')
        await page.click('text=bestpacki2l2fyq359a % Yes >> input[type="number"]')
        await page.fill('text=bestpacki2l2fyq359a % Yes >> input[type="number"]', '50')
        await page.press('text=bestpacki2l2fyq359a % Yes >> input[type="number"]', 'Enter')
        await page.click('text=bestpacki2l2fyq359a % Yes >> label')
        await page.click(':nth-match(:text("Yes"), 3)')
        await page.click('text=Ok')

        await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/corporate/list' }*/), page.click('text=Save')])
        await page.click('text=Corporate/Insurance Created Successfully')

        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/corporate/edit/60ab4820cf7b3c00139ab12d' }*/),
            page.click('td:has-text("Dc22")'),
        ])
        await page.click('text=Pricing Scheme')
        await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/corporate/list' }*/), page.click('text=Save')])

        await page.click('[placeholder="Search Table"]')
        await page.fill('[placeholder="Search Table"]', 'demo')
        await page.check('input[name="Corporate_select"]')
        await page.click('text=Delete')
        await page.click('[placeholder="1"]')
        await page.fill('[placeholder="1"]', '1')
        await page.click('text=Ok')
        await page.click('text=Corporate deleted successfully')
    })
})
