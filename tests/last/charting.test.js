const { chromium } = require('playwright')
const { init, teardown, createPatient, delPatient, logout, login, pausedSS } = require(process.cwd() + '/steps')
const { browserSettings } = require(process.cwd() + '/g')

let browser, context, page
const id = 22
const pName = 'QwaseeDee'
const nric = 's12345'
const num = 12341234
const r = Math.random().toString(36).substring(2)
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

const delChartCat = async (page, r) => {
  await page.click('#settingsbutton__BV_toggle_')
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/chartingbuilder/list' }*/),
    page.click('#settingsbutton >> text=Charting Template Builder'),
  ])

  await page.waitForSelector(`text=testChart${r}`)
  await page.click(`text=testChart${r}`)

  await page.click('.trash path')
  page.once('dialog', (dialog) => {
    dialog.accept().catch(() => {})
  })

  await page.hover(`text=testChart${r}`)
  await page.waitForTimeout(1000)
  await page.click('text=x')
  page.once('dialog', (dialog) => {
    dialog.accept().catch(() => {})
  })

  await page.click('text=Charting category deleted successfully')
}

describe('removes data', () => {
  it('clear queue in queue list', async () => {
    await page.click('#settingsbutton__BV_toggle_')
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/chartingbuilder/list' }*/),
      page.click('#settingsbutton >> text=Charting Template Builder'),
    ])

    await page.waitForTimeout(1000)

    // delete all charting categories
    const chartTemplates = await page.$$('css=ul > div > li')
    for (let i = chartTemplates.length - 1; 0 < i; i--) {
      await page.hover(`css=ul > div > li:nth-child(${i})`)
      await page.click(`css=ul > div > li:nth-child(${i}) > span.cursor-pointer`)
      page.once('dialog', (dialog) => {
        dialog.accept().catch(() => {})
      })

      await page.isVisible('text=Charting category deleted successfully')
      await page.waitForTimeout(200)
    }
    // repeat here because i am not sure why the above loop does not del all the cats. seems to cancel diaglog for 1st iteration

    if (chartTemplates.length > 1) {
      await page.hover(`css=ul > div > li`)
      await page.click(`css=ul > div > li > span.cursor-pointer`)
      page.once('dialog', (dialog) => {
        dialog.accept().catch(() => {})
      })
      await page.isVisible('text=Charting category deleted successfully')
    }

    await page.waitForTimeout(1000)

    await page.click('text=Create New Charting Category')
    await page.click('input[type="text"]')
    await page.fill('input[type="text"]', `testChart${r}`)
    await page.click('text=OK')
    await page.click('text=Charting template added successfully')
    await page.waitForSelector(`text=testChart${r}`)
    await page.click(`text=testChart${r}`)
    await page.waitForTimeout(1500)
    await page.click('input[type="file"]')
    // await page.setInputFiles('input[type="file"]', `${process.cwd()} + /tests/doing/baby_yoda.jpg`)
    await page.setInputFiles('input[type="file"]', `baby_yoda.jpg`)
    await page.waitForTimeout(3000)

    await page.click('#left-pencil svg')
    await page.click(':nth-match(canvas, 2)')

    await page.click('div:nth-child(11) .color-picker .vue-swatches div .vue-swatches__trigger')
    await page.click(
      'div:nth-child(11) .color-picker .vue-swatches .vue-swatches__container .vue-swatches__wrapper div:nth-child(2) div:nth-child(5)'
    )

    // can't change size bc input button is disabled. c
    // await page.click('css=input[type="number"]', { force: true })
    // await page.waitForTimeout(1000)
    // await page.fill('css=input[type="number"]', '22')

    const _udx = ~~(1480 / 2) - 400
    const _udy = ~~(750 / 2) - 250

    await page.mouse.move(_udx, _udy)
    await page.mouse.down()
    await page.mouse.move(_udx + 800, _udy + 50)
    await page.mouse.move(_udx, _udy + 100)
    await page.mouse.move(_udx + 800, _udy + 150)
    await page.mouse.move(_udx, _udy + 200)
    await page.mouse.move(_udx + 800, _udy + 250)
    await page.mouse.move(_udx, _udy + 300)
    await page.mouse.move(_udx + 800, _udy + 350)
    await page.mouse.move(_udx, _udy + 400)
    await page.mouse.move(_udx + 800, _udy + 450)
    await page.mouse.up()

    await page.waitForTimeout(1500)
    await page.click('#editing-canvas >> text=Untitled Template')
    await page.fill('input[type="text"]', 'baby_yodaaa')
    await page.click('.save-icon-wrapper .fa-icon path')
    await page.waitForTimeout(1500)
    while ((await page.$$('css=.fa-icon.fa-pulse')).length > 0) {
      await page.waitForTimeout(1000)
    }
    await page.click('#editing-canvas div div path')
    await page.waitForTimeout(2000)
    // await page.click('text=Charting updates saved successfully');

    await page.click('text=baby_yodaaa')
    await page.click('text=Patient')

    await page.waitForTimeout(1500)
    let patientExists = await page.isVisible(`text=${pName}`)

    if (patientExists) {
      await delPatient(page, { id, pName, nric, num })
    }
    await page.waitForTimeout(2000)
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/new' }*/),
      page.click('button:has-text("Create Patient")'),
    ])
    await createPatient(page, { id, pName, nric, num })

    await logout(page)
    await page.waitForTimeout(1000)
    await login(page)

    await Promise.all([page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/queue/list' }*/), page.click('text=Queue')])

    await page.waitForTimeout(1500)
    let patientInQ = await page.isVisible(`text=${pName} -`)
    if (patientInQ === false) {
      await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]')
      await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'Qwasee')
      await page.click(`text=${pName}: ${nric} (${id}) Tel: +65${num}`)
    }
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/60b98362fb05690013d57b03' }*/),
      page.click('text=QwaseeDee -'),
    ])
    await page.click('text=CONSULTATION')

    await page.selectOption('text=SortCreated - Newest to OldestCreated - Oldest to NewestEdited - Newest to Oldes >> select', 'updatedAt.-1')

    await page.waitForTimeout(1500)
    if (await page.isVisible(`text=Open a note for`)) {
      await page.click('text=Open a note for')
    }

    // await page.selectOption('text=Notessoap (Category: testChartzdc2rw66fqk)Notes (Category: Uncategorized)Notes >> select', {label: })
    await page.click('button:has-text("Add Charting")')
    await page.click(`css=div:nth-child(2) > div.col-sm-12 > div > span > span:nth-child(2) > button > span.icon-text`)
    await page.click('text=baby_yodaaa')
    // '.charting-card-body.d-flex.justify-content-center.align-items-center'
    // await page.click(`css=.charting-card-body.d-flex.justify-content-center.align-items-center`)

    await page.click(`css=.charting-card-label-after.space-between.absolute > span.charting-card-icons.cursor-pointer`)
    await page.waitForTimeout(1500)
    while ((await page.$$('css=.fa-icon.fa-pulse')).length > 0) {
      await page.waitForTimeout(800)
    }

    await page.waitForTimeout(500)

    await page.click('#left-pencil svg')
    await page.click(':nth-match(canvas, 2)')

    await page.click('.vue-swatches__trigger')
    await page.click('.vue-swatches__wrapper div:nth-child(2) div:nth-child(4)')

    const centerX = ~~(1480 / 2) - 150
    const centerY = ~~(750 / 2) - 50

    await page.mouse.move(centerX, centerY)
    await page.mouse.down()
    await page.mouse.move(centerX + 0, centerY + 100)
    await page.mouse.move(centerX + 100, centerY + 100)
    await page.mouse.move(centerX + 100, centerY + 0)
    await page.mouse.move(centerX + 0, centerY + 0)
    await page.mouse.up()

    await page.click('.helpers div:nth-child(4) .fa-icon path')
    await page.waitForTimeout(500)
    await page.mouse.move(centerX, centerY)
    await page.mouse.down()
    await page.mouse.move(centerX + 0, centerY + 100)
    await page.mouse.move(centerX + 100, centerY + 100)
    await page.mouse.up()

    await page.waitForTimeout(500)

    await page.click('.save-icon-wrapper .fa-icon path')
    await page.waitForTimeout(500)
    while ((await page.$$('css=.fa-icon.fa-pulse')).length > 0) {
      await page.waitForTimeout(1500)
    }

    await page.click('span:nth-child(3) .fa-icon path')
    await page.click('text=baby_yodaaa')

    await page.click('css=.dropdown.btn-group.b-dropdown.more-icons > button')
    // await page.click('a[role="menuitem"]:has-text("Print")')

    const imgURL = await page.getAttribute('div.charting-card-body > img', 'src')
    const page1 = await context.newPage()
    await page1.goto(`${imgURL}`)
    await pausedSS(page1, { fileName: 'chartDrawing', path })
    await page1.close()

    await page.waitForTimeout(1000)
    await page.click('text=Save Draft')
    await page.waitForSelector('#main >> text=Note draft saved successfully')
    await page.waitForTimeout(500)
    while ((await page.$$('css=.fa-icon.fa-pulse')).length > 0) {
      await page.waitForTimeout(1500)
    }

    failing = false
  })
})
