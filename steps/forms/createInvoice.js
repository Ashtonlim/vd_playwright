module.exports.createInvoice = async (page) => {
    // must be on patient page.
    await page.click('a[role="tab"]:has-text("INVOICE")');
    await page.click('text=Create Invoice');
    await page.selectOption('text=Provider-Doctor One >> select', '60924291252b8800127aaeff');
    await page.selectOption('text=Therapist-Therapist One >> select', '609242a8252b8800127aaf01');
    await page.click('[placeholder="Search inventory items"]');
    await page.fill('[placeholder="Search inventory items"]', 'meds1');
    await page.click('text=meds1');
    await page.click('button:has-text("Payment")');
    return  (await page.innerText('css=div.card-header.collapsed span.mx-3 > small')).replace('(Draft)', '').replace('#', '').replace(/\s\s+/g, '');
    
}

