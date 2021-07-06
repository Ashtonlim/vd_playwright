module.exports.createInvoice = async (page, { invItem = 'meds1' } = {}) => {
  // must be on patient page.
  await page.click('a[role="tab"]:has-text("INVOICE")')

  // invoice does not always seem work, added timeout to imrpove reliability
  await page.waitForTimeout(1800)
  await page.click('text=Create Invoice')
  await page.waitForSelector('text=Invoice Created')
  await page.waitForTimeout(1000)

  // uncomment if needed, is commented to reduce steps which increases prob of failure
  // await page.selectOption('text=Provider-Doctor One >> select', { label: 'Doctor One' })
  // await page.selectOption('text=Therapist-Therapist One >> select', { label: 'Therapist One' })
  await page.click('[placeholder="Search inventory items"]')

  // search must be exactly what is typed in.
  await page.fill('[placeholder="Search inventory items"]', `${invItem}`)
  await page.click(`text=${invItem}`)
  await page.click('button:has-text("Payment")')
}
