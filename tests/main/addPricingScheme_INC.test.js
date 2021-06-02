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
        // Click #settingsbutton__BV_toggle_
        await page.click('#settingsbutton__BV_toggle_')
        // Click #settingsbutton >> text=Corporate / Insurance
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/corporate/list' }*/),
            page.click('#settingsbutton >> text=Corporate / Insurance'),
        ])
        // Click text=Create New Corporate
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/corporate/new' }*/),
            page.click('text=Create New Corporate'),
        ])
        // Click [placeholder="Name"]
        await page.click('[placeholder="Name"]')
        // Fill [placeholder="Name"]
        await page.fill('[placeholder="Name"]', 'Demo copr01')
        // Press Tab
        await page.press('[placeholder="Name"]', 'Tab')
        // Fill [placeholder="Given ID"]
        await page.fill('[placeholder="Given ID"]', 'Dc')
        // Click [placeholder="Name"]
        await page.click('[placeholder="Name"]')
        // Fill [placeholder="Name"]
        await page.fill('[placeholder="Name"]', 'Demo copr02')
        // Click [placeholder="Given ID"]
        await page.click('[placeholder="Given ID"]')
        // Click [placeholder="Name"]
        await page.click('[placeholder="Name"]')
        // Fill [placeholder="Name"]
        await page.fill('[placeholder="Name"]', 'Demo copr22')
        // Click [placeholder="Given ID"]
        await page.click('[placeholder="Given ID"]')
        // Fill [placeholder="Given ID"]
        await page.fill('[placeholder="Given ID"]', 'Dc22')
        // Click text=Company Name *Company ID *Type *CorporateInsuranceHospitalNoneAddressTelephoneEm
        await page.click(
            'text=Company Name *Company ID *Type *CorporateInsuranceHospitalNoneAddressTelephoneEm'
        )
        // Click [placeholder="Address"]
        await page.click('[placeholder="Address"]')
        // Click text=Pricing Scheme
        await page.click('text=Pricing Scheme')
        // Click [placeholder="Pricing Scheme Name"]
        await page.click('[placeholder="Pricing Scheme Name"]')
        // Fill [placeholder="Pricing Scheme Name"]
        await page.fill('[placeholder="Pricing Scheme Name"]', 'demo scheme 22')
        // Select Product
        await page.selectOption(
            'text=Inventory Type--Select--ConsumablesExpendablesProcedureTeleconsult AmountPackage >> select',
            'Product'
        )
        // Click input[type="number"]
        await page.click('input[type="number"]')
        // Select Investigation
        await page.selectOption(
            'text=Inventory Type--Select--ConsumablesExpendablesProcedureTeleconsult AmountPackage >> select',
            'Investigation'
        )
        // Click button:has-text("Add")
        await page.click('button:has-text("Add")')
        // Click text=Add Medicine%$ >> :nth-match(button, 2)
        await page.click('text=Add Medicine%$ >> :nth-match(button, 2)')
        // Click text=meds1 % Yes >> input[type="number"]
        await page.click('text=meds1 % Yes >> input[type="number"]')
        // Fill text=meds1 % Yes >> input[type="number"]
        await page.fill('text=meds1 % Yes >> input[type="number"]', '10')
        // Click label:has-text("Yes")
        await page.click('label:has-text("Yes")')
        // Click text=Ok
        await page.click('text=Ok')
        // Click text=Add Investigation%$ >> :nth-match(button, 2)
        await page.click('text=Add Investigation%$ >> :nth-match(button, 2)')
        // Click text=Ok
        await page.click('text=Ok')
        // Click :nth-match(:text("Save"), 2)
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/corporate/list' }*/),
            page.click(':nth-match(:text("Save"), 2)'),
        ])
        // Click td:has-text("Dc22")
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/corporate/edit/60ab4820cf7b3c00139ab12d' }*/),
            page.click('td:has-text("Dc22")'),
        ])
        // Click text=Pricing Scheme
        await page.click('text=Pricing Scheme')
        // Click text=Save
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/corporate/list' }*/),
            page.click('text=Save'),
        ])
        // Click text=✓
        await page.click('text=✓')
        // Click text=Delete
        await page.click('text=Delete')
        // Click [placeholder="1"]
        await page.click('[placeholder="1"]')
        // Fill [placeholder="1"]
        await page.fill('[placeholder="1"]', '1')
        // Click text=Ok
        await page.click('text=Ok')
    })
})
