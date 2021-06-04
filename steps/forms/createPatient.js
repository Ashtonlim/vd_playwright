module.exports.createPatient = async (
    page,
    { id = +Math.random().toString().substring(2), pName = 'Avacado Was', nric = 's12345', num = 12341234 } = {}
) => {
    await page.click('text=Personal Information')
    await page.click('button:has-text("Create Patient")')
    await page.click('text=Personal Information')

    await page.selectOption('text=DoctorDoctor One >> select', '60924291252b8800127aaeff')
    await page.click('text=Personal Information')
    await page.click('button:has-text("Create Patient")')
    await page.click('text=Patient name is required×')
    await page.click('text=Nationality is required')
    await page.click('text=Personal Information')

    await page.click('text=DoctorDoctor One Patient ID * >> input[type="text"]')
    await page.fill('text=DoctorDoctor One Patient ID * >> input[type="text"]', `${id}`)

    await page.selectOption('text=Title - Mr. Mrs. Ms. Mdm MISS Dr Prof Master Field Marshall General Lieutenant G >> select', 'Mr.')
    await page.selectOption('text=Gender -MaleFemaleOther >> select', 'M')
    await page.click('input[name="patientDOB"]')
    await page.click('span:has-text("<")')
    await page.click('text=27')

    await page.selectOption('text=Nationality *Select nationalityBangladeshiCambodianChineseFilipinoIndianIndonesi >> select', 'Singaporean')
    await page.selectOption('text=Country Of Birth Select country of birthBangladeshCambodiaChinaIndiaIndonesiaMal >> select', 'Singapore')
    await page.fill('#patientName', `${pName}`)
    await page.fill('text=NRIC/Passport *Local Name >> input[type="text"]', `${nric}`)
    await page.click('a:has-text("Contact")')
    await page.click('input[type="email"]')
    await page.fill('input[type="email"]', `${pName}@vd.com`)
    await page.click('text=Mobile Number *Select region Singapore Indonesia China Cambodia Thailand >> input[type="text"]')
    await page.fill('text=Mobile Number *Select region Singapore Indonesia China Cambodia Thailand >> input[type="text"]', `+65${num}`)
    await page.click('text=Emergency Contact')
    await page.click('text=Medication')

    await page.selectOption('text=Drug Allergies *Select an answer No Known Allergies Yes >> select', 'No Known Allergies')
    await page.selectOption('text=Food Allergies *Select an answer No Known Allergies Yes >> select', 'No Known Allergies')
    await page.click('text=Questionnaire')
    await page.click('canvas')
    await page.click('text=Clear')
    await page.click('canvas')
    await page.click('text=Accept')
    await page.click('button:has-text("Create Patient")')
    await Promise.all([
        page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/patient/list' }*/),
        page.click('button:has-text("Create Patient")'),
    ])
    return { id, pName, nric, num }
}
