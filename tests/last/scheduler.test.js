const { chromium } = require('playwright')
const { init, teardown } = require(process.cwd() + '/steps')
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

describe('able to set template schedules', () => {
  it('scheduler 1', async () => {
    await page.click('#settingsbutton__BV_toggle_')
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/config' }*/),
      page.click('#settingsbutton >> text=System Preferences'),
    ])

    await page.waitForTimeout(1000)
    await page.click('#main >> text=Appointment')

    await page.waitForSelector(`css=#config__appointment div:nth-child(3) div > input`)
    await page.$eval('css=#config__appointment div:nth-child(3) div > input', (e) => {
      while (e.checked !== true) {
        e.click()
      }
    })

    await page.click('button:has-text("Save Details")')
    await page.isVisible('text=Configuration Updated Successfully')
    await page.click('text=Appointment')
    await page.isVisible('text=Appointment Waitlist Scheduler')

    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/scheduler/templates/list' }*/),
      page.click('text=Scheduler'),
    ])
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/scheduler/templates/edit' }*/),
      page.click('text=Create New Template'),
    ])

    await page.click('[placeholder="Enter template name here..."]')
    await page.fill('[placeholder="Enter template name here..."]', 'template name 1')
    // await page.press('[placeholder="Enter template name here..."]', 'End');
    // await page.press('[placeholder="Enter template name here..."]', 'Shift+Home');
    // await page.fill('[placeholder="Enter template name here..."]', 'template name 1');
    await page.click('tr:nth-child(3) td:nth-child(2)')
    await page.click('text=Select option')
    await page.click('span:has-text("Service 1")')
    await page.click('label:has-text("Monday")')
    await page.click('label:has-text("Tuesday")')

    await page.click('[placeholder="Pick Time Slot"]')
    await page.click('text=08:30')
    await page.click(':nth-match([placeholder="Pick Time Slot"], 2)')
    await page.waitForTimeout(500)
    await page.click('text=09:30')

    await page.click('text=Save')

    await page.isVisible('text=8:30 - 09:30Untitled Schedule Template')
    await page.isVisible(':nth-match(a:has-text("8:30 - 09:30Untitled Schedule Template"), 2)')

    await page.click('[placeholder="Enter template name here..."]')
    await page.fill('[placeholder="Enter template name here..."]', 'test template 1')

    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/scheduler/templates/list' }*/),
      page.click('button:has-text("Create")'),
    ])
    await page.click('text=Duplicate')
    await page.click('[placeholder="Enter template name here..."]')
    await page.fill('[placeholder="Enter template name here..."]', 'dup-tt-1')

    await page.click('a:has-text("8:30 - 9:30dup-tt-1")')
    await page.click('[placeholder="Pick Time Slot"]')
    await page.click('div[role="document"] >> :nth-match(div:has-text("Select option"), 5)')
    await page.click('span:has-text("Service 1")')
    await page.click('[placeholder="Pick Time Slot"]')
    await page.click('text=08:00')
    await page.click(':nth-match([placeholder="Pick Time Slot"], 2)')
    await page.click('text=10:00')

    await page.click('text=Save')
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/scheduler/templates/list' }*/),
      page.click('button:has-text("Create")'),
    ])

    await page.isVisible('text=dup-tt-1')
    await page.isVisible('text=test template 1')
    await page.isVisible('text=Wednesday, Monday, Tuesday')
    await page.isVisible(':nth-match(td:has-text("Wednesday, Monday, Tuesday"), 2)')

    await page.click('[placeholder="Search Templates"]')
    await page.fill('[placeholder="Search Templates"]', 'dup-tt')
    await page.isVisible('text=dup-tt-1')
    await page.click('text=Rows per page 10 30 50 100 Prev 1 - 1 of 1 Next')
    await page.click('[placeholder="Search Templates"]')
    await page.fill('[placeholder="Search Templates"]', 'test')
    await page.isVisible('text=test template 1')
    await page.click('text=Rows per page 10 30 50 100 Prev 1 - 1 of 1 Next')

    await page.click('[placeholder="Search Templates"]')
    await page.fill('[placeholder="Search Templates"]', '')
    await page.click('text=Rows per page 10 30 50 100 Prev 1 - 2 of 2 Next')

    await page.click(':nth-match(:text("Roll Out"), 2)')
    await page.click('[placeholder="Enter schedule name here..."]')
    // Fill [placeholder="Enter schedule name here..."]
    await page.fill('[placeholder="Enter schedule name here..."]', 'test template 1 roll-out')

    await page.click('[placeholder="Start date"]')
    await page.click('tr:nth-child(3) td:nth-child(2) div') // 7
    await page.click('tr:nth-child(3) td:nth-child(6) div') // 11
    await page.selectOption('text=Provider:Please select a providerDoctor One >> select', '60924291252b8800127aaeff')
    await page.selectOption('text=Therapist:Please select a therapistTherapist One >> select', '609242a8252b8800127aaf01')
    await page.click('text=Ok')
    await page.click('text=Rolled-out Schedule')
    await page.click('[placeholder="Search Templates"]')
    await page.fill('[placeholder="Search Templates"]', 'roll-out')
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/scheduler/rollout/view/60b5c006f85ca00013bb6d18' }*/),
      page.click('text=test template 1 roll-out'),
    ])

    await page.click('text=Appointment')
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/appointment/list' }*/),
      page.click('a[role="menuitem"]:has-text("Appointment")'),
    ])
    await page.isVisible('a:has-text("8:30a test template 1 roll-out")')
    await page.isVisible(':nth-match(a:has-text("8:30a test template 1 roll-out"), 2)')

    await page.click(':nth-match(a:has-text("8:30a test template 1 roll-out"), 3)')

    await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]')
    await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'Virgie')
    await page.click('text=Virgie Goodman: ZKK8DUE1VD (2 Tel: +6559372842)')
    await page.click('textarea')
    await page.fill('textarea', 'test booking appt from scheduler')
    await page.waitForTimeout(1000)
    await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/appointment/list' }*/), page.click('text=Save')])
    await page.isVisible('text=Appointment Created Successfully')
    await page.waitForTimeout(3000)

    await page.click('text=Virgie Goodman | test booking appt from scheduler')
    await page.click('button:has-text("Cancel")')
    await page.click('text=Cancellation Reason× Confirm >> textarea')
    await page.fill('text=Cancellation Reason× Confirm >> textarea', 'test booking appt cancel')
    await page.click('div[role="document"] >> text=Confirm')
    await page.click('text=Virgie Goodman | test booking appt from scheduler')
    await page.click('text=Appointment Details (Status: Cancelled)')
    await page.click('#delete-appointment')

    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/appointment/new?date=2021-06-09' }*/),
      page.click('tbody >> text=9'),
    ])

    await page.click('text=Create Available Slot')
    await page.selectOption('text=Provider:Please select a provider >> select', '60924291252b8800127aaeff')
    await page.selectOption('text=Therapist:Please select a therapist >> select', '609242a8252b8800127aaf01')
    // await page.click('text=Select option Service 1 No elements found. Consider changing the search query. L >> :nth-match(div, 2)')
    await page.click('text=Select option Service 1  >> :nth-match(div, 2)')
    await page.click('span:has-text("Service 1")')

    await page.waitForTimeout(1000)
    await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/appointment/list' }*/), page.click('text=Save')])
    await page.waitForTimeout(1500)

    await page.isVisible('text=Available Slot Created Successfully')
    await page.click('a:has-text("8a Available - Ad hoc")')
    await page.waitForTimeout(1500)
    await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/appointment/list' }*/), page.click('text=Delete Slots')])
    await page.waitForTimeout(3000)

    await page.click('text=Appointment')
    await page.click('text=Scheduler')
    await page.click('text=Rolled-out Schedule')
    await page.waitForTimeout(4000)

    await page.click('text=Delete')
    await page.isVisible("text=Confirm deletion of schedule 'Available - Ad hoc'?")
    await page.click('text=OK')
    await page.isVisible('text=Deleted schedule successfully')

    await page.click('button:has-text("Delete")')
    await page.isVisible("text=Confirm deletion of schedule 'test template 1 roll-out'?")
    await page.click('text=OK')
    await page.isVisible('text=Deleted schedule successfully')
    await page.click('text=No data for table')

    await page.click('text=Templates')
    await page.click('button:has-text("Delete")')
    await page.isVisible("text=You will be deleting 'dup-tt-1'. This action is irreversible, please confirm")
    await page.click('text=Proceed')
    await page.isVisible('text=Deleted Template successfully')

    await page.click('button:has-text("Delete")')
    await page.isVisible("text=You will be deleting 'test template 1'. This action is irreversible, please conf")
    await page.click('text=Proceed')
    await page.isVisible('text=Deleted Template successfully')

    await page.click('text=No data for table')

    await page.click('#settingsbutton__BV_toggle_')
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/config' }*/),
      page.click('#settingsbutton >> text=System Preferences'),
    ])

    await page.waitForTimeout(1000)
    await page.click('#main >> text=Appointment')

    await page.waitForSelector(`css=#config__appointment div:nth-child(3) div > input`)
    await page.$eval('css=#config__appointment div:nth-child(3) div > input', (e) => {
      while (e.checked === true) {
        e.click()
      }
    })

    await page.click('button:has-text("Save Details")')
    await page.isVisible('text=Configuration Updated Successfully')
    await page.click('text=Appointment')
    await page.isVisible('text=Appointment Waitlist')
    failing = false
  })
})
