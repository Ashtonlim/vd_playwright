module.exports.createInvoice = async (page, { invItem = 'meds1' } = {}) => {
  // must be on patient page.
  await page.click('a[role="tab"]:has-text("INVOICE")')
  // invoice does not always seem work, added timeout to imrpove reliability
  await page.waitForTimeout(800)
  await page.click('text=Create Invoice')
  await page.waitForSelector('text=Invoice Created')
  await page.waitForTimeout(400)
  await page.selectOption('text=Provider-Doctor One >> select', '60924291252b8800127aaeff')
  await page.selectOption('text=Therapist-Therapist One >> select', '609242a8252b8800127aaf01')
  await page.click('[placeholder="Search inventory items"]')
  // search must be exactly what is typed in.
  await page.fill('[placeholder="Search inventory items"]', `${invItem}`)
  await page.click(`text=${invItem}`)
  await page.click('button:has-text("Payment")')
}
