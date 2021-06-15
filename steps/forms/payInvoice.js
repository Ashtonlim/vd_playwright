module.exports.payInvoice = async (page, { label = 'Cash', index = -1, amt = '20', paymentType = 'text=Payment Methods PayPal >> select' } = {}) => {
  await page.waitForTimeout(1200)
  //   if (index >= 0) {
  //     await page.selectOption(`${paymentType}`, { index })
  //   }

  await page.selectOption(`${paymentType}`, { label })
  await page.click('[aria-label="Payment Method Amount"]')
  await page.fill('[aria-label="Payment Method Amount"]', `${amt}`)
  await page.press('[aria-label="Payment Method Amount"]', 'Enter')

  const invNum = (await page.innerText('css=div.card-header.collapsed span.mx-3 > small')).replace('(Draft)', '').replace('#', '').replace(/\s+/g, '')

  // Need to wait, clicking make payment too fast doesn't save payment.
  // Could be that Vue has not triggered
  await page.waitForTimeout(2000)

  await page.click('text=Make Payment')
  await page.waitForTimeout(500)
  return invNum
}
