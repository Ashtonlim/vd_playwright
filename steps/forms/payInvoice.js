module.exports.payInvoice = async (page, { label = 'Cash', amt = '20' } = {}) => {
    await page.selectOption(
        'text=Payment Methods PayPal(Online)-Offset $0.00 Offset $0.00 Cash Offset - Credit No >> select',
        { label }
    )
    await page.click('[aria-label="Payment Method Amount"]')
    await page.fill('[aria-label="Payment Method Amount"]', `${amt}`)
    await page.press('[aria-label="Payment Method Amount"]', 'Enter')

    // Need to wait, clicking make payment too fast doesn't save payment.
    // Could be that Vue has not triggered
    await page.waitForTimeout(3000)

    await page.click('text=Make Payment')
    await page.waitForTimeout(500)
}
