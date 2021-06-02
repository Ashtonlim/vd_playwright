module.exports.payInvoice = async (
    page,
    {
        label = 'Cash',
        amt = '20',
        paymentType = 'text=Payment Methods PayPal(Online)-Offset $0.00 Offset $0.00 Cash Offset - Credit No >> select',
    } = {}
) => {
    await page.selectOption(`${paymentType}`, { label })
    await page.click('[aria-label="Payment Method Amount"]')
    await page.fill('[aria-label="Payment Method Amount"]', `${amt}`)
    await page.press('[aria-label="Payment Method Amount"]', 'Enter')

    const invNum = (await page.innerText('css=div.card-header.collapsed span.mx-3 > small'))
        .replace('(Draft)', '')
        .replace('#', '')
        .replace(/\s\s+/g, '')

    // Need to wait, clicking make payment too fast doesn't save payment.
    // Could be that Vue has not triggered
    await page.waitForTimeout(2000)

    await page.click('text=Make Payment')
    await page.waitForTimeout(500)
    return invNum
}
