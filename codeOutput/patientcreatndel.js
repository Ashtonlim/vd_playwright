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

  // Click text=Patient
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/),
    page.click('text=Patient')
  ]);

  // Click button:has-text("Create Patient")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/new' }*/),
    page.click('button:has-text("Create Patient")')
  ]);

  // Click text=DoctorDoctor One Patient ID * >> input[type="text"]
  await page.click('text=DoctorDoctor One Patient ID * >> input[type="text"]');

  // Click text=Questionnaire
  await page.click('text=Questionnaire');

  // Click text=Personal
  await page.click('text=Personal');

  // Click text=Questionnaire
  await page.click('text=Questionnaire');

  // Click button:has-text("Create Patient")
  await page.click('button:has-text("Create Patient")');

  // Click canvas
  await page.click('canvas');

  // Click canvas
  await page.click('canvas');

  // Click canvas
  await page.click('canvas');

  // Click text=Accept
  await page.click('text=Accept');

  // Click text=Personal
  await page.click('text=Personal');

  // Select 60924291252b8800127aaeff
  await page.selectOption('text=DoctorDoctor One >> select', '60924291252b8800127aaeff');

  // Select Mr.
  await page.selectOption('text=Title - Mr. Mrs. Ms. Mdm MISS Dr Prof Master Field Marshall General Lieutenant G >> select', 'Mr.');

  // Click #patientName
  await page.click('#patientName');

  // Click #patientName
  await page.click('#patientName');

  // Fill #patientName
  await page.fill('#patientName', 'randomename');

  // Click text=NRIC/Passport *Local Name >> input[type="text"]
  await page.click('text=NRIC/Passport *Local Name >> input[type="text"]');

  // Fill text=NRIC/Passport *Local Name >> input[type="text"]
  await page.fill('text=NRIC/Passport *Local Name >> input[type="text"]', 's1203839');

  // Select Singapore
  await page.selectOption('text=Country Of Birth Select country of birthBangladeshCambodiaChinaIndiaIndonesiaMal >> select', 'Singapore');

  // Select M
  await page.selectOption('text=Gender -MaleFemaleOther >> select', 'M');

  // Select Married
  await page.selectOption('text=Marital Status - Single Married Divorced Separated Widowed Priest >> select', 'Married');

  // Click input[name="patientDOB"]
  await page.click('input[name="patientDOB"]');

  // Click input[name="patientDOB"]
  await page.click('input[name="patientDOB"]');

  // Click input[name="patientDOB"]
  await page.click('input[name="patientDOB"]');

  // Click .cell.day.weekend
  await page.click('.cell.day.weekend');

  // Select Singaporean
  await page.selectOption('text=Nationality *Select nationalityBangladeshiCambodianChineseFilipinoIndianIndonesi >> select', 'Singaporean');

  // Select Chinese
  await page.selectOption('text=Race - Chinese Malay Indian Caucasian Eurasian Others >> select', 'Chinese');

  // Click a:has-text("Contact")
  await page.click('a:has-text("Contact")');

  // Click text=Emergency Contact
  await page.click('text=Emergency Contact');

  // Click button:has-text("Create Patient")
  await page.click('button:has-text("Create Patient")');

  // Click a:has-text("Contact")
  await page.click('a:has-text("Contact")');

  // Click input[type="email"]
  await page.click('input[type="email"]');

  // Fill input[type="email"]
  await page.fill('input[type="email"]', 'randomemail@testmail.com');

  // Click text=Mobile Number *Select region Singapore Indonesia China Cambodia Thailand start w >> input[type="text"]
  await page.click('text=Mobile Number *Select region Singapore Indonesia China Cambodia Thailand start w >> input[type="text"]');

  // Fill text=Mobile Number *Select region Singapore Indonesia China Cambodia Thailand start w >> input[type="text"]
  await page.fill('text=Mobile Number *Select region Singapore Indonesia China Cambodia Thailand start w >> input[type="text"]', '+6593841999');

  // Click #postal
  await page.click('#postal');

  // Fill #postal
  await page.fill('#postal', '123');

  // Click text=Medication
  await page.click('text=Medication');

  // Select No Known Allergies
  await page.selectOption('text=Food Allergies *Select an answer No Known Allergies Yes >> select', 'No Known Allergies');

  // Select No Known Allergies
  await page.selectOption('text=Drug Allergies *Select an answer No Known Allergies Yes >> select', 'No Known Allergies');

  // Click text=Medication
  await page.click('text=Medication');

  // Click button:has-text("Create Patient")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/),
    page.click('button:has-text("Create Patient")')
  ]);

  // Click td:has-text("randomename")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/detail/60a617b7419a5500121364ee' }*/),
    page.click('td:has-text("randomename")')
  ]);

  // Click text=randomename
  await page.click('text=randomename');

  // Click text=randomename
  await page.click('text=randomename');

  // Click text=Patient
  await page.click('text=Patient');
  // assert.equal(page.url(), 'https://hub-staging.vaultdragon.com/patient/list');

  // Click text=4 S1203839 randomename +6593841999 Active Preview >> button
  await page.click('text=4 S1203839 randomename +6593841999 Active Preview >> button');

  // Click #edit-patient-profile
  await page.click('#edit-patient-profile');

  // Click text=Personal Information
  await page.click('text=Personal Information');

  // Click text=Delete
  await page.click('text=Delete');

  // Click [placeholder="4"]
  await page.click('[placeholder="4"]');

  // Fill [placeholder="4"]
  await page.fill('[placeholder="4"]', '4');

  // Click button:has-text("Ok")
  await page.click('button:has-text("Ok")');

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();