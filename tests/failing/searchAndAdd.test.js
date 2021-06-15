const { chromium } = require('playwright')
const { init, teardown, clearQueue, pausedSS } = require(process.cwd() + '/steps')
const { browserSettings } = require(process.cwd() + '/g')

let browser, context, page
const path = require('path').basename(__filename)

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
  await teardown(page, path)
})

describe('user creations', () => {
  it('add and delete patient user', async () => {
    await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/queue/list' }*/), page.click('text=Queue')])

    await clearQueue(page)

    await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]')
    await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'mau')
    await page.click('text=Maurice Hamilton: ETZ8DAZOJV (1) Tel: +6596080926')
    await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]')
    await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]')
    await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'vir')
    await page.click('text=Virgie Goodman: ZKK8DUE1VD (2) Tel: +6559372842')
    await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]')
    await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'ste')
    await page.click('text=Steve Marsh: KPNEPZX5NR (3) Tel: +6558986059')

    await page.selectOption('text=Steve Marsh - KPNEPZX5NR - 3 - Doctor One - Therapist One - Room 1 - S >> select', '60924291252b8800127aaeff')
    await page.selectOption(
      'text=Steve Marsh - KPNEPZX5NR - 3 - Doctor One - Therapist One - Room 1 - S >> :nth-match(select, 2)',
      '609242a8252b8800127aaf01'
    )
    await page.selectOption(
      'text=Steve Marsh - KPNEPZX5NR - 3 - Doctor One - Therapist One - Room 1 - S >> :nth-match(select, 3)',
      '609242ca95e14e0012915202'
    )
    await page.selectOption(
      'text=Steve Marsh - KPNEPZX5NR - 3 - Doctor One - Therapist One - Room 1 - S >> :nth-match(select, 4)',
      '609243b9252b8800127aaf13'
    )

    await page.click(':nth-match(span:has-text("No Notes Yet"), 3)')

    await page.click('text=No Notes YetSubmitCancel >> textarea[name="textarea_notes"]')
    await page.fill('text=No Notes YetSubmitCancel >> textarea[name="textarea_notes"]', 'testing')
    await page.click('text=Submit')
    await page.click('span:has-text("testing")')

    // await page.click('text=textarea[name="textarea_notes"]');
    // await page.fill('text=textarea[name="textarea_notes"]', 'update testing');
    // await page.click('text=Submit');
    // await page.click('td:has-text("update testing")');
    // await page.click('text=Cancel');

    // Go to https://hub-staging.vaultdragon.com/queue/list
    await page.goto('https://hub-staging.vaultdragon.com/queue/list')

    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608ee95795e14e00129150d3' }*/),
      page.click('text=Steve Marsh - KPNEPZX5NR - 3'),
    ])

    await page.click('text=Queue')

    await page.click('text=Steve Marsh -')
    await page.click('text=Steve Marsh')

    await page.click('text=Queue')

    await page.click(':nth-match(button:has-text("Call"), 3)')

    const [page1] = await Promise.all([page.waitForEvent('popup'), page.click('button:has-text("Dashboard")')])
    await page1.isVisible('text=10003')
    await page1.isVisible('text=Room 1')
    await page1.isVisible('text=Therapist: Therapist One')
    await pausedSS(page1, { fileName: 'queueScreen', path })
    await page1.close()

    const [page2] = await Promise.all([
      page.waitForEvent('popup'),
      page.click('text=Steve Marsh - KPNEPZX5NR - 3 - Doctor One - Therapist One - Room 1 - S >> [aria-label="printPatientLabel"]'),
    ])
    await page2.isVisible('text=Steve Marsh')
    await pausedSS(page2, { fileName: 'printLabelOfPatientInQ', path })

    // Close page
    await page2.close()

    await page.selectOption(
      'text=-- All Rooms --Room 1-- All Services --Service 1-- All Providers --Doctor One--  >> select',
      '609242ca95e14e0012915202'
    )
    await page.waitForSelector('text=Steve Marsh -')
    await page.selectOption('text=-- All Rooms --Room 1-- All Services --Service 1-- All Providers --Doctor One--  >> select', '')

    await page.selectOption('css=.input-group.mr-2:nth-child(1) > select:nth-child(2)', {
      index: 1,
    })
    await page.waitForSelector('text=Steve Marsh -')
    await page.selectOption('css=.input-group.mr-2:nth-child(1) > select:nth-child(2)', {
      index: 0,
    })

    await page.selectOption('css=.input-group.mr-2:nth-child(1) > select:nth-child(3)', {
      index: 1,
    })
    await page.waitForSelector('text=Steve Marsh -')
    await page.selectOption('css=.input-group.mr-2:nth-child(1) > select:nth-child(3)', {
      index: 0,
    })

    await page.click('#popover-3')
    await page.check('#start_consult')
    await page.click('button:has-text("Start Consult")')
    // await page.waitForTimeout(2500) // just to see start consult was clicked

    await clearQueue(page)
  })
})
