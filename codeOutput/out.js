const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext({
    viewport: {
      width: 1920,
      height: 1080
    },
    storageState: 'creds.json'
  });

  // Open new page
  const page = await context.newPage();

  // Go to https://hub-staging.vaultdragon.com/
  await page.goto('https://hub-staging.vaultdragon.com/');

  // Click text=Queue
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/queue/list' }*/),
    page.click('text=Queue')
  ]);

  // Click button:has-text("✓")
  await page.click('button:has-text("✓")');

  // Click text=Delete
  await page.click('text=Delete');

  // Click [placeholder="3"]
  await page.click('[placeholder="3"]');

  // Fill [placeholder="3"]
  await page.fill('[placeholder="3"]', '3');

  // Click text=Ok
  await page.click('text=Ok');

  // Click [placeholder="Search by Patient's Name, NRIC, ID, Mobile Number"]
  await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]');

  // Fill [placeholder="Search by Patient's Name, NRIC, ID, Mobile Number"]
  await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'mau');

  // Click text=Maurice Hamilton: ETZ8DAZOJV (1) Tel: +6596080926
  await page.click('text=Maurice Hamilton: ETZ8DAZOJV (1) Tel: +6596080926');

  // Click [placeholder="Search by Patient's Name, NRIC, ID, Mobile Number"]
  await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]');

  // Click [placeholder="Search by Patient's Name, NRIC, ID, Mobile Number"]
  await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]');

  // Fill [placeholder="Search by Patient's Name, NRIC, ID, Mobile Number"]
  await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'vir');

  // Click text=Virgie Goodman: ZKK8DUE1VD (2) Tel: +6559372842
  await page.click('text=Virgie Goodman: ZKK8DUE1VD (2) Tel: +6559372842');

  // Click [placeholder="Search by Patient's Name, NRIC, ID, Mobile Number"]
  await page.click('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]');

  // Fill [placeholder="Search by Patient's Name, NRIC, ID, Mobile Number"]
  await page.fill('[placeholder="Search by Patient\'s Name, NRIC, ID, Mobile Number"]', 'ste');

  // Click text=Steve Marsh: KPNEPZX5NR (3) Tel: +6558986059
  await page.click('text=Steve Marsh: KPNEPZX5NR (3) Tel: +6558986059');

  // Select 60924291252b8800127aaeff
  await page.selectOption('text=⇅ 5 10005 Steve Marsh - KPNEPZX5NR - 3 - Doctor One - Therapist One - Room 1 - S >> select', '60924291252b8800127aaeff');

  // Select 609242a8252b8800127aaf01
  await page.selectOption('text=⇅ 5 10005 Steve Marsh - KPNEPZX5NR - 3 - Doctor One - Therapist One - Room 1 - S >> :nth-match(select, 2)', '609242a8252b8800127aaf01');

  // Select 609242ca95e14e0012915202
  await page.selectOption('text=⇅ 5 10005 Steve Marsh - KPNEPZX5NR - 3 - Doctor One - Therapist One - Room 1 - S >> :nth-match(select, 3)', '609242ca95e14e0012915202');

  // Select 609243b9252b8800127aaf13
  await page.selectOption('text=⇅ 5 10005 Steve Marsh - KPNEPZX5NR - 3 - Doctor One - Therapist One - Room 1 - S >> :nth-match(select, 4)', '609243b9252b8800127aaf13');

  // Click :nth-match(span:has-text("No Notes Yet"), 5)
  await page.click(':nth-match(span:has-text("No Notes Yet"), 5)');

  // Click text=No Notes YetSubmitCancel >> textarea[name="textarea_notes"]
  await page.click('text=No Notes YetSubmitCancel >> textarea[name="textarea_notes"]');

  // Fill text=No Notes YetSubmitCancel >> textarea[name="textarea_notes"]
  await page.fill('text=No Notes YetSubmitCancel >> textarea[name="textarea_notes"]', 'testing');

  // Click text=Submit
  await page.click('text=Submit');

  // Go to https://hub-staging.vaultdragon.com/queue/list
  await page.goto('https://hub-staging.vaultdragon.com/queue/list');

  // Click text=Steve Marsh - KPNEPZX5NR - 3
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/608ee95795e14e00129150d3' }*/),
    page.click('text=Steve Marsh - KPNEPZX5NR - 3')
  ]);

  // Click text=Queue
  await page.click('text=Queue');
  // assert.equal(page.url(), 'https://hub-staging.vaultdragon.com/queue/list');

  // Click text=Steve Marsh -
  await page.click('text=Steve Marsh -');
  // assert.equal(page.url(), 'https://hub-staging.vaultdragon.com/patient/detail/608ee95795e14e00129150d3');

  // Click text=Steve Marsh
  await page.click('text=Steve Marsh');

  // Click text=Queue
  await page.click('text=Queue');
  // assert.equal(page.url(), 'https://hub-staging.vaultdragon.com/queue/list');

  // Click button:has-text("Dashboard")
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('button:has-text("Dashboard")')
  ]);

  // Close page
  await page1.close();

  // Click :nth-match(button:has-text("Call"), 5)
  await page.click(':nth-match(button:has-text("Call"), 5)');

  // Click :nth-match(button:has-text("Call"), 5)
  await page.click(':nth-match(button:has-text("Call"), 5)');

  // Click :nth-match(button:has-text("Call"), 5)
  await page.click(':nth-match(button:has-text("Call"), 5)');

  // Click :nth-match(button:has-text("Call"), 5)
  await page.click(':nth-match(button:has-text("Call"), 5)');

  // Click button:has-text("Dashboard")
  const [page2] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('button:has-text("Dashboard")')
  ]);

  // Click text=10005
  await page2.click('text=10005');

  // Click text=Room 1
  await page2.click('text=Room 1');

  // Click text=Therapist: Therapist One
  await page2.click('text=Therapist: Therapist One');

  // Close page
  await page2.close();

  // Click text=⇅ 5 10005 Steve Marsh - KPNEPZX5NR - 3 - Doctor One - Therapist One - Room 1 - S >> [aria-label="printPatientLabel"]
  const [page3] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('text=⇅ 5 10005 Steve Marsh - KPNEPZX5NR - 3 - Doctor One - Therapist One - Room 1 - S >> [aria-label="printPatientLabel"]')
  ]);

  // Click text=Steve Marsh
  await page3.click('text=Steve Marsh');

  // Close page
  await page3.close();

  // Select 609242ca95e14e0012915202
  await page.selectOption('text=-- All Rooms --Room 1-- All Services --Service 1-- All Providers --Doctor One--  >> select', '609242ca95e14e0012915202');

  // Click text=Steve Marsh -
  await page.click('text=Steve Marsh -');
  // assert.equal(page.url(), 'https://hub-staging.vaultdragon.com/patient/detail/608ee95795e14e00129150d3');

  // Click text=Steve Marsh
  await page.click('text=Steve Marsh');

  // Click text=Queue
  await page.click('text=Queue');
  // assert.equal(page.url(), 'https://hub-staging.vaultdragon.com/queue/list');

  // Select
  await page.selectOption('text=-- All Rooms --Room 1-- All Services --Service 1-- All Providers --Doctor One--  >> select', '');

  // Select 609243b9252b8800127aaf13
  await page.selectOption('[id="__BVID__684"]', '609243b9252b8800127aaf13');

  // Select
  await page.selectOption('[id="__BVID__684"]', '');

  // Select 60924291252b8800127aaeff
  await page.selectOption('[id="__BVID__685"]', '60924291252b8800127aaeff');

  // Select
  await page.selectOption('[id="__BVID__685"]', '');

  // Click button:has-text("✓")
  await page.click('button:has-text("✓")');

  // Click text=Delete
  await page.click('text=Delete');

  // Click [placeholder="3"]
  await page.click('[placeholder="3"]');

  // Fill [placeholder="3"]
  await page.fill('[placeholder="3"]', '3');

  // Click text=Ok
  await page.click('text=Ok');

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();