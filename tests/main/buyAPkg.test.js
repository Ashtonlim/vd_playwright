const { chromium } = require('playwright')
const { init, teardown, createInvoice, payInvoice } = require(process.cwd() + '/steps')
const { browserSettings } = require(process.cwd() + '/g')
const { get_DD_MMM_YYYY } = require(process.cwd() + '/api')

let browser, context, page
const r = Math.random().toString(36).substring(2)

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
    await page.click('a:has-text("Inventory")')
    await page.click('a[role="menuitem"]:has-text("Inventory")')
    await page.click('[placeholder="Search Table"]')
    await page.fill('[placeholder="Search Table"]', `bestpack${r}`)
    await page.check('input[name="Inventory_select"]')
    await page.click('text=Delete')
    await page.click('[placeholder="1"]')
    await page.fill('[placeholder="1"]', '1')
    await page.click('text=Ok')
    await teardown(page, (path = require('path').basename(__filename)))
})

describe('patient', () => {
    it('create and void an invoice', async () => {
        await page.click('a:has-text("Inventory")')
        await page.click('a[role="menuitem"]:has-text("Inventory")')

        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/inventory/new' }*/),
            page.click('text=Create Inventory Item'),
        ])
        await page.selectOption('text=Type MedicineConsumablesExpendablesProcedureTeleconsult AmountPackageBundleInves >> select', 'Package')
        console.log(r)
        await page.click('[placeholder="Name"]')
        await page.fill('[placeholder="Name"]', `bestpack${r}`)
        await page.click('[placeholder="Given ID"]')
        await page.fill('[placeholder="Given ID"]', 'pkg1')
        await page.click('[placeholder="Selling Price"]')
        await page.fill('[placeholder="Selling Price"]', '20')
        await page.click('[placeholder="Minimum Selling Price"]')
        await page.fill('[placeholder="Minimum Selling Price"]', '15')
        await page.click('[placeholder="Cost Price (Defaults to cost price in batch order if blank)"]')
        await page.fill('[placeholder="Cost Price (Defaults to cost price in batch order if blank)"]', '10')
        await page.click('text=Package Items')
        await page.click('[placeholder="Validity Period (in months)"]')
        await page.fill('[placeholder="Validity Period (in months)"]', '5')
        // await page.click('[placeholder="Search Inventory by Name, Given Id, Description"]')
        // await page.fill('[placeholder="Search Inventory by Name, Given Id, Description"]', 'meds1')
        // await page.click('text=meds1')
        await page.click('[placeholder="Search Inventory by Name, Given Id, Description"]')
        await page.fill('[placeholder="Search Inventory by Name, Given Id, Description"]', 'meds1')
        await page.click('text=meds1')
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/inventory/list' }*/),
            page.click(':nth-match(:text("Save"), 2)'),
        ])
        await page.isVisible('text=Inventory Created Successfully')

        await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/), page.click('text=Patient')])

        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd53d37feb000126fba10' }*/),
            page.click('text=Steve Marsh'),
        ])

        await createInvoice(page, { invItem: `bestpack${r}` })
        await payInvoice(page)

        await page.click('text=Create Invoice')
        // await page.click('text=Invoice Created')
        await page.click('[placeholder="Search inventory items"]')
        await page.fill('[placeholder="Search inventory items"]', 'meds1')
        await page.click('a:has-text("MedicineM1meds1")')
        page.once('dialog', (dialog) => {
            console.log(`Dialog message: ${dialog.message()}`)
            dialog.accept().catch(() => {})
        })
        await page.click('text=meds1 $%$% $20.00 >> button')
        await page.waitForTimeout(2000)
        // await page.click('text=Invoice details saved')
        await page.click('text=Close Invoice')
        // await page.click('text=Invoice closed')

        await page.click('a[role="tab"]:has-text("PACKAGES")')
        await page.waitForTimeout(1000)
        await page.click('[placeholder="Type to search"]')
        await page.fill('[placeholder="Type to search"]', `bestpack${r}`)
        await page.waitForTimeout(1000)
        await page.click('text=Show')
        console.log(`Item redeem on ${get_DD_MMM_YYYY()} by VD Support`)
        await page.click(`text=Item redeem on ${get_DD_MMM_YYYY()} by VD Support`)
    })
})
