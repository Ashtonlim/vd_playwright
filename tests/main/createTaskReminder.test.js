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

describe('removes data', () => {
  it('clear queue in queue list', async () => {
    await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/), page.click('text=Patient')])
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd9332a1e310013df1e66' }*/),
      page.click('text=Virgie Goodman'),
    ])
    await page.click('text=SUMMARY')
    await page.click('text=Tasks')
    await page.waitForTimeout(2000)
    const numOfTasks = (await page.innerText('.tab-pane:nth-child(4) div:nth-child(1) > span')).split(' ').slice(-1)
    await page.click('#newbutton__BV_toggle_')
    await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/task/upsert/new' }*/), page.click('text=Create Task')])
    await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]')
    await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'Virgie')
    await page.click('text=Virgie Goodman: ZKK8DUE1VD (2) Tel: +6559372842')
    await page.click('textarea')
    await page.fill('textarea', 'test create task desc 123')
    await page.selectOption('text=Assigned To *Select User VD Support >> select', { label: 'Doctor One' })
    await page.click('input[name="dueDate"]')
    await page.click('span:has-text(">")')
    await page.click('span:has-text("22")')
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/task/list' }*/),
      page.click('button:has-text("Save Details")'),
    ])

    await page.selectOption('text=Filter-- Assigned To --VD SupportDoctor OneTherapist One-- Creator --VD SupportD >> select', {
      label: 'Doctor One',
    })

    await page.waitForTimeout(1000)

    await page.click('text=Patient')
    await page.waitForTimeout(1000)
    await page.click('span:has-text("ZKK8DUE1VD")')
    await page.click('text=SUMMARY')
    await page.click('text=Tasks')
    await page.waitForTimeout(2000)
    const numOfTasksIncBy1 = (await page.innerText('.tab-pane:nth-child(4) div:nth-child(1) > span')).split(' ').slice(-1)
    console.log(numOfTasksIncBy1, numOfTasks)
    if (numOfTasksIncBy1 - numOfTasks === 1) {
      console.log('did add task')
    } else {
      throw 'did not add task'
    }

    await page.click('#taskbutton svg')
    await page.selectOption('text=Filter-- Assigned To --VD SupportDoctor OneTherapist One-- Creator --VD SupportD >> select', {
      label: 'Doctor One',
    })
    await page.click('text=test create task desc 123')

    await page.selectOption('text=Assigned To *Select User >> select', { label: 'VD Support' })
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/task/list' }*/),
      page.click('button:has-text("Save Details")'),
    ])
    await page.click('button:has-text("Mark As Complete")')
    await page.click('text=Yes')
    await page.waitForTimeout(1500)
  })
})
