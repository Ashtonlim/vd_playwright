const { chromium } = require('playwright');
const { init, teardown, createInvoice } = require(process.cwd() + '/steps');
const { browserSettings } = require(process.cwd() + '/g');
const { get_D_MMM_YYYY } = require(process.cwd() + '/api');

let browser, context, page;

beforeAll(async () => {
  browser = await chromium.launch(browserSettings);
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  ({ context, page } = await init(browser));
});

afterEach(async () => {
  await teardown(page, path = require('path').basename(__filename))
});

describe("patient invoice", () => {

  it('create and void an invoice and payment', async () => {
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/),
      page.click('text=Patient')
    ]);

    // Click text=Maurice Hamilton
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd53d37feb000126fba10' }*/),
      page.click('text=Maurice Hamilton')
    ]);

    await page.click('a[role="tab"]:has-text("INVOICE")');
    await page.click('text=Create Invoice');
    await page.selectOption('text=Provider-Doctor One >> select', '60924291252b8800127aaeff');
    await page.selectOption('text=Therapist-Therapist One >> select', '609242a8252b8800127aaf01');
    await page.click('[placeholder="Search inventory items"]');
    await page.fill('[placeholder="Search inventory items"]', 'meds1');
    await page.click('text=meds1');
    await page.click('button:has-text("Payment")');

    await page.selectOption('text=Payment Methods PayPal(Online)-Offset $0.00 Offset $0.00 Cash Offset - Credit No >> select', { label: 'Cash' });
    await page.click('[aria-label="Payment Method Amount"]');
    await page.fill('[aria-label="Payment Method Amount"]', '20');
    await page.press('[aria-label="Payment Method Amount"]', 'Enter');

    const invNum = (await page.innerText('css=div.card-header.collapsed span.mx-3 > small')).replace('(Draft)', '').replace('#', '').replace(/\s\s+/g, '');

    // Need to wait, clicking make payment too fast doesn't save payment.
    // Could be that Vue has not triggered
    await page.waitForTimeout(3000);

    await page.click('text=Make Payment');
    await page.waitForTimeout(500);

    const paymentRef = (await page.innerText('div.vgt-responsive > table td:nth-child(2)'));
    console.log(`${invNum}|${paymentRef}`)

    await page.isVisible(`text=#${invNum} (Closed)`);
    await page.isVisible(`text=${paymentRef}`);
    await page.click('text=Cash $20.00 >> td');
    await page.click('td:has-text("Void")');
    await page.click('.vgt-table tbody tr td:nth-child(8)');

    await page.selectOption('text=Create Credit/Debit Credit >> select', 'Credit');
    await page.selectOption('text=Mode*OffsetRefund >> select', 'Refund');
    await page.selectOption('text=Payment Type Payment type is required for Refund Cash Offset-Credit Note Offset  >> select', 'cash');
    await page.click('text=Mode*OffsetRefundPayment Type Payment type is required for Refund Cash Offset-Cr >> input[type="text"]');
    await page.fill('text=Mode*OffsetRefundPayment Type Payment type is required for Refund Cash Offset-Cr >> input[type="text"]', 'testing credit');
    await page.selectOption('text=Returning* meds1 >> select', { label: 'meds1' });
    await page.fill('text=Qty* Invalid Qty >> input[type="number"]', '1');
    await page.click('text=Amount* >> input[type="text"]');
    await page.click('text=You are recording credit total of $ 20.00');
    await page.click('button:has-text("Record")');
    await page.click('#accordion >> text=Credit Recorded Successfully');
    await page.isVisible('text=Refund');


    await page.click('text=PAYMENT');
    await page.click('[placeholder="Search Table"]');
    await page.fill('[placeholder="Search Table"]', `${paymentRef}`);
    await page.click('button:has-text("Void")');
    await page.click('textarea');
    await page.fill('textarea', 'void payment test');

    await page.click('text=Confirm');
    await page.waitForTimeout(1500)

    // await page.reload() // time for payment summary to change status
    // await page.click('a[role="tab"]:has-text("PAYMENT")');

    await page.click(`text=${paymentRef}`);
    console.log(`Invoice No.: ${invNum}`)
    await page.isVisible(`text=Invoice No.: ${invNum}`);
    await page.isVisible('text=Payment Summary (Voided)');
    await page.click('text=Close Preview');


    await page.click('a[role="tab"]:has-text("INVOICE")');

    await page.waitForTimeout(250)

    await page.click('td:has-text("void payment test")');
    await page.click('td:has-text("Voided")');

    await page.click('button:has-text("Void Invoice")');
    await page.click('text=Void Invoice× Confirm >> textarea');
    await page.fill('text=Void Invoice× Confirm >> textarea', 'void invoice test');
    await page.click('text=Confirm');

    // Press r with modifiers
    await page.reload();
    // Go to https://hub-staging.vaultdragon.com/patient/detail/608bd53d37feb000126fba10
    // await page.goto('https://hub-staging.vaultdragon.com/patient/detail/608bd53d37feb000126fba10');
    await page.click('a[role="tab"]:has-text("INVOICE")');
    await page.isVisible(`text=#${invNum} (Voided)`);

  })

  // it('should create multiple invoices; and make multiple and single corporate invoice payments for patient', async () => {
  //   await Promise.all([
  //     page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/),
  //     page.click('text=Patient')
  //   ]);


  //   await Promise.all([
  //     page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608bd53d37feb000126fba10' }*/),
  //     page.click('text=Maurice Hamilton')
  //   ]);

  //   const invNums = []

  //   for (let i = 0; i < 3; i++) {
  //     invNums.push(await createInvoice(page))

  //     await page.click('text=PAYMENT');
  //     await page.click('text=Add Payment');
  //     await page.selectOption('text=Corporate Payment Giant Corp 1 >> select', { label: 'Giant Corp 1' });
  //     await page.click('[aria-label="Payment Method Amount"]');
  //     await page.fill('[aria-label="Payment Method Amount"]', '20');

  //     await page.waitForTimeout(1000);
  //     await page.click('text=Make Payment');

  //   }


  //   await page.click('text=Invoice');
  //   await Promise.all([
  //     page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/corporate-invoice/list' }*/),
  //     page.click('text=Corporate Invoice')
  //   ]);

  //   await page.selectOption('text=Status--- Select ---Fully PaidOutstanding >> select', 'Outstanding');
  //   await page.click('text=Generate Report');
  //   await page.waitForTimeout(1000);

  //   // For some reason search does not work, so commented out.
  //   // await page.click(`td:has-text("${invNum}")`);
  //   // await page.click('[placeholder="Search Table"]');    
  //   // await page.fill('[placeholder="Search Table"]', `${invNum}`);
  //   // await page.press('[placeholder="Search Table"]', 'Enter');
  //   // await page.click(`td:has-text("${invNum}")`);

  //   await page.click('text=Settlement');
  //   await page.selectOption('select[name="perPageSelect"]', '100');
  //   await page.selectOption('text=ModeCashOffset-Credit NoteOffset - DepositCredit RedeemPayPal (Online) - OffsetB >> select', 'Cash');
  //   await page.click('text=Batch Payments×ModeCashOffset-Credit NoteOffset - DepositCredit RedeemPayPal (On >> input[type="text"]');
  //   await page.fill('text=Batch Payments×ModeCashOffset-Credit NoteOffset - DepositCredit RedeemPayPal (On >> input[type="text"]', 'Paying for my employees');
  //   await page.click('input[type="number"]');
  //   await page.fill('input[type="number"]', '20');
  //   await page.click(`text=${get_D_MMM_YYYY()} ${invNums.slice(-1)} Maurice Hamilton - 1Giant Corp 1 $ 20.00 $ 20.00 Outstanding >> input[type="number"]`);
  //   await page.click('text=Record Batch');

  //   await page.click('text=Settlement');
  //   await page.selectOption('text=ModeCashOffset-Credit NoteOffset - DepositCredit RedeemPayPal (Online) - OffsetB >> select', 'Cash');
  //   await page.click('text=Batch Payments×ModeCashOffset-Credit NoteOffset - DepositCredit RedeemPayPal (On >> input[type="text"]');
  //   await page.fill('text=Batch Payments×ModeCashOffset-Credit NoteOffset - DepositCredit RedeemPayPal (On >> input[type="text"]', 'Paying for my employees');
  //   await page.click('input[type="number"]');
  //   await page.fill('input[type="number"]', `${(invNums.length - 1) * 20}`);

  //   for (let i = 0; i < invNums.length - 1; i++) {
  //     await page.click(`text=${get_D_MMM_YYYY()} ${invNums[i]} Maurice Hamilton - 1Giant Corp 1 $ 20.00 $ 20.00 Outstanding >> input[type="number"]`);
  //   }


  //   await page.click('text=Amount Remaining: 0.00');
  //   await page.click('text=Record Batch');

  //   await page.selectOption('text=Status--- Select ---Fully PaidOutstanding >> select', 'Fully Paid');

  //   for (let i = 0; i < invNums.length - 1; i++) {
  //     await page.click(`text=${get_D_MMM_YYYY()} ${invNums[i]} Maurice Hamilton - 1Giant Corp 1 $ 20.00 $ 0.00 Fully Paid >> td`);
  //   }

  // })

})
