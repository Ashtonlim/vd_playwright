const { chromium } = require('playwright')
const { init, teardown, createInvoice, payInvoice } = require(process.cwd() + '/steps')
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
  ;({ context, page } = await init(browser, path))
})

afterEach(async () => {
  await teardown(page, path, failing)
})

describe('Activate membership and test features', () => {
  it('scheduler 1', async () => {
    await page.click('text=Patient')
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd53d37feb000126fba10' }*/),
      page.click('text=Maurice Hamilton'),
    ])
    await page.click('text=MEMBERSHIP')
    await page.waitForTimeout(800)
    if (!(await page.isVisible('text=Please activate membership for this patient'))) {
      await page.click('text=Activate/Deactivate')
      await page.click('text=Deactivate Membership')
      await page.click('text=Please activate membership for this patient')
    }

    await page.click('text=Activate')
    await page.waitForTimeout(1000)
    await page.click('text=Select')
    await page.click('a[role="tab"]:has-text("MEMBERSHIP")')
    await page.isVisible('text=Redeemable Points')
    await page.isVisible('text=To Qualify For')
    await page.isVisible('text=outerclub1')

    const _P1Pts = (await page.innerText('css=div.col.points > p')).replace(/\D/g, '')
    const addP1Pts = 10
    const subP1Pts = 9
    await createInvoice(page)
    await payInvoice(page)

    await page.click('text=MEMBERSHIP')
    await page.isVisible(`text=${_P1Pts + 1} Points`)
    await page.click('text=Adjust Points')
    await page.click('input[type="number"]')
    await page.fill('input[type="number"]', `${addP1Pts}`)
    await page.click('div[role="document"] >> text=Up')
    await page.waitForTimeout(500)
    // await page.click(`text=Patient has not been admitted yet Successfully added ${addP1Pts} points to the balance×Dr >> div[role="alert"]`)
    await page.isVisible(`#main >> text=Successfully added ${addP1Pts} points to the balance`)
    await page.waitForTimeout(500)
    await page.isVisible(`text=${_P1Pts + addP1Pts} Points`)
    await page.click('text=Adjust Points')
    await page.click('input[type="number"]')
    await page.fill('input[type="number"]', `${subP1Pts}`)
    // await page.waitForTimeout(500)
    await page.click('div[role="document"] >> text=Down')
    await page.waitForTimeout(500)
    await page.click(`#main >> text=Successfully deducted ${subP1Pts} points from the balance`)
    await page.waitForTimeout(500)
    await page.isVisible(`text=${_P1Pts + addP1Pts - subP1Pts} Points`)

    await page.click('#newbutton__BV_toggle_')
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/transfer/point' }*/),
      page.click('text=Transfer Credit / Point'),
    ])
    await page.selectOption('text=Type * Credit Membership Point >> select', 'membershipPoint')
    await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]')
    await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'maurice')
    await page.click('text=Maurice Hamilton: ETZ8DAZOJV (1) Tel: +6596080926')
    await page.click('input[type="number"]')
    await page.fill('input[type="number"]', '1')
    await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]')
    await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'steve')
    await page.click('text=Steve Marsh: KPNEPZX5NR (3) Tel: +6558986059')
    await page.isVisible('text=Selected patient is not a member')

    await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/), page.click('text=Patient')])
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608ee95795e14e00129150d3' }*/),
      page.click('text=Steve Marsh'),
    ])

    await page.click('text=Activate')
    await page.waitForTimeout(1000)
    await page.click('text=Select')
    await page.isVisible('#main >> text=Steve Marsh successfully activated for outerclub1 membership')

    await page.click('a[role="tab"]:has-text("MEMBERSHIP")')
    await page.isVisible('text=Redeemable Points')
    await page.isVisible('text=To Qualify For')
    await page.isVisible('text=outerclub1')

    const _P2Pts = (await page.innerText('css=div.col.points > p')).replace(/\D/g, '')

    await page.click('#newbutton__BV_toggle_')
    await page.click('text=Transfer Credit / Point')

    await page.selectOption('text=Type * Credit Membership Point >> select', 'membershipPoint')
    await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]')
    await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'maurice')
    await page.click('text=Maurice Hamilton: ETZ8DAZOJV (1) Tel: +6596080926')
    await page.click('input[type="number"]')
    await page.fill('input[type="number"]', '1')
    await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]')
    await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'steve')
    await page.click('text=Steve Marsh: KPNEPZX5NR (3) Tel: +6558986059')

    // r is not necessary since no search/asertion to verify but adding in case
    const r = Math.random().toString(36).substring(2)
    await page.click('#remarks')
    await page.fill('#remarks', `maurice transfer x points to steve - ${r}`)

    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/queue/list' }*/),
      page.click('button:has-text("Transfer")'),
    ])

    await page.isVisible('text=Successfully transfer 1 points')
    await page.click('text=Patient')
    await page.click('tbody >> text=Steve Marsh')
    await page.click('text=MEMBERSHIP')
    await page.click('text=Activate/Deactivate')
    await page.click('text=Deactivate Membership')
    await page.click('#main >> text=Successfully deactivated')
    await page.click('text=Non-Member Activate')

    await page.click('text=Patient')
    await page.click('text=Maurice Hamilton')
    await page.click('text=MEMBERSHIP')

    await page.click('text=Activate/Deactivate')
    await page.click('text=Deactivate Membership')
    await page.isVisible('text=Please activate membership for this patient')
    await page.isVisible('#main >> text=Successfully deactivated')
    await page.isVisible('text=Non-Member Activate')
    await page.click('#main-content')

    failing = false
  })
})
