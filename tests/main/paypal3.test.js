require('dotenv').config()
const { chromium } = require('playwright')
const { init, teardown, delPatient, pausedSS, createInvoice, payInvoice } = require(process.cwd() + '/steps')
const { browserSettings } = require(process.cwd() + '/g')

let browser, context, page

const id = 32
const pName = 'tempPatient'
const nric = 's1111'
const num = 12312312
const path = require('path').basename(__filename)
beforeAll(async () => {
    browser = await chromium.launch(browserSettings)
})

afterAll(async () => {
    await browser.close()
})

beforeEach(async () => {
    ;({ context, page } = await init(browser))
})

afterEach(async () => {
    await teardown(page, path)
})

describe('removes data', () => {
    it('clear queue in queue list', async () => {
        await page.click('#settingsbutton__BV_toggle_')
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/medservice/list' }*/),
            page.click('#settingsbutton >> text=Medical Services'),
        ])

        await page.waitForTimeout(1500)
        let medServiceExists = await page.isVisible(`text=self-reg1-paypal1`)

        console.log(medServiceExists)

        if (medServiceExists === false) {
            await Promise.all([
                page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/medservice/upsert' }*/),
                page.click('button:has-text("New")'),
            ])
            await page.click('input[type="text"]')
            await page.fill('input[type="text"]', 'self-reg1-paypal1')
            await page.selectOption('text=Category *Consultation >> select', { label: 'Consultation' })

            await page.click(':nth-match(:text("Add Template"), 4)')
            await page.click('textarea')
            await page.fill('textarea', 'Dear ')
            await page.click('text=Patient Name')
            await page.click('textarea')
            await page.fill(
                'textarea',
                'Dear {patient.name} email here is the link to self-reg {appointment.confirmPaymentLink}, repeat same link again ->>>'
            )
            await page.click('text=Appointment Confirmation & Payment Link')
            await page.click('text=Appointment Confirmation TemplateEmail Add Template SMS Add Template Template 1  >> button')
            await page.click('textarea')
            await page.fill(
                'textarea',
                'Dear {patient.name} sms here is the link to self-reg {appointment.confirmPaymentLink}, repeat same link again ->>>'
            )
            await page.click('text=SMS Add Template >> button')
            await page.click('textarea')
            await page.fill('textarea', 'Dear ')
            await page.click('text=Patient Name')
            await page.click('textarea')
            await page.fill('textarea', 'Dear {patient.name} yr appt w paypal1 payment for {appointment.confirmPaymentLink} --- ')
            await page.click('text=Appointment Service')
            await page.click('text=Add Template')
            await page.click('textarea')
            await page.fill(
                'textarea',
                'Dear {patient.name} yr appt w paypal1 payment for {appointment.confirmPaymentLink} --- {appointment.service} '
            )

            page.waitForTimeout(1000)
            await Promise.all([
                page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/medservice/list' }*/),
                page.click('button:has-text("Save Details")'),
            ])
            await page.click('text=Medical Service self-reg1-paypal1 Created Successfully')
        }

        await page.click('text=Patient')
        await page.waitForTimeout(1500)
        let patientExists = await page.isVisible(`text=${pName}`)

        console.log(patientExists)

        if (patientExists) {
            await delPatient(page, { id, pName, nric, num })
            await page.waitForTimeout(2200)
        }

        await page.click('text=Appointment')
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/appointment/list' }*/),
            page.click('a[role="menuitem"]:has-text("Appointment")'),
        ])
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://hub-staging.vaultdragon.com/appointment/new?date=2021-06-22' }*/),
            page.click('tbody >> text=22'),
        ])

        await page.click('button:has-text("Create")')
        await page.click('text=DoctorDoctor One Patient ID * >> input[type="text"]')
        await page.fill('text=DoctorDoctor One Patient ID * >> input[type="text"]', `${id}`)
        await page.fill('text=NRIC/Passport Local Name >> input[type="text"]', `${nric}`)
        await page.click('#patientName')
        await page.fill('#patientName', pName)
        await page.click('input[type="number"]')
        await page.fill('input[type="number"]', '20')

        await page.click('input[type="email"]')
        await page.fill('input[type="email"]', `${process.env.ZOHOUSR}`)
        await page.click('text=Mobile Number *Select region Singapore Indonesia China Cambodia Thailand Taiwan  >> input[type="text"]')
        await page.fill('text=Mobile Number *Select region Singapore Indonesia China Cambodia Thailand Taiwan  >> input[type="text"]', `+65${num}`)
        await page.selectOption('text=*Please select a medical service Service 1 self-reg1-paypal1 >> select', { label: 'self-reg1-paypal1' })
        await page.click('text=Save & Send Self-Registration')

        const page1 = await context.newPage()
        await page1.goto('https://mail.zoho.com/zm/#mail/folder/inbox')
        await page1.click('[placeholder="Email address or mobile number"]')

        await page1.fill('[placeholder="Email address or mobile number"]', `${process.env.ZOHOUSR}`)
        await page1.click('button:has-text("Next")')
        await page1.click('[placeholder="Enter password"]')
        await page1.fill('[placeholder="Enter password"]', `${process.env.ZOHOPWD}`)
        await Promise.all([
            page1.waitForNavigation(/*{ url: 'https://accounts.zoho.com/home#profile/personal' }*/),
            page1.click('button:has-text("Sign in")'),
        ])

        await page1.waitForTimeout(1000)
        await Promise.all([
            page1.waitForNavigation(/*{ url: 'https://mail.zoho.com/zm/#mail/folder/inbox' }*/),
            page1.click('text=no-reply@vaultdragon.com'),
        ])
        await page1.waitForTimeout(1000)

        const regLink = await page1.getAttribute('css=.zmPCnt > div > div > a', 'href')
        console.log(regLink)
        await page1.close()

        const page3 = await context.newPage()
        await page3.goto(`${regLink}`)

        await page3.fill('[placeholder="Date of Birth"]', '2021-05-11')
        await page3.click('textarea[name="address"]')
        await page3.fill('textarea[name="address"]', 'test addr')

        await page3.check('input[name="questionnaireFormData[prefer_to_contacted][]"]')
        await page3.check('#checkSMS')
        await page3.click(':nth-match(:text("Email"), 3)')
        await page3.click(':nth-match(:text("Email"), 3)')
        await page3.click('[placeholder="Name"]')
        await page3.fill('[placeholder="Name"]', 'testyecn')
        await page3.click('[placeholder="Contact No."]')
        await page3.fill('[placeholder="Contact No."]', '12341234')
        await page3.click('[placeholder="Relationship to You"]')
        await page3.fill('[placeholder="Relationship to You"]', 'grandma')
        await page3.click('text=* I agree to the above assumption of risk and limits of confidentiality and unde')
        await page3.check('input[name="questionnaireFormData[dataProtectionActText][]"]')
        await page3.check('input[name="questionnaireFormData[agree_acknowledge][]"]')
        await page3.click('text=* I acknowledge the cancellation policy.')
        await page3.click('text=* I acknowledge the cancellation policy.')
        await page3.dblclick('text=* I accept the terms stated above with respect to the Personal Data Protection A')
        await page3.fill('[placeholder="signatureDate"]', '2021-05-19')
        await page3.click('#signature-pad')
        await page3.click('text=Save')

        await page3.click('text=Confirm & Pay')
        await page3.click('text=Bank Transfer')
        await page3.click('text=Please contact the clinic to show proof of payment.')
        await page3.close()

        await page.click('text=Appointment')
        await page.click('a[role="menuitem"]:has-text("Appointment")')
        await page.click(`text=8a ${pName}`)
        await page.click('text=Appointment Details (Status: Scheduled)')
        await page.click('#delete-appointment')

        if ((await page.isVisible(`text=${id} ${nric} ${pName} +65${num} Active Preview >> button`)) === false) {
            await page.goto('https://hub-staging.vaultdragon.com/patient/list')
            await page.waitForTimeout(1000)
        }

        await page.click(`text=${id} ${nric} ${pName} +65${num} Active Preview >> button`)
        await page.click(`text=${pName}`)
        await page.click('#edit-patient-profile')

        await page.click('a:has-text("Contact")')
        await page.click('text=Emergency Contact')
        await page.click('text=Personal Information')
        await page.click('div[role="dialog"]:has-text("Edit Patient Details×PersonalQuestionnaireCorporate / InsuranceMarketingPersonal")')
        await page.click('text=×')
        await page.click(`text=${id} ${nric} ${pName} +65${num} Active Preview >> button`)
        await page.click('#edit-patient-profile')
        await page.click('text=NRIC/Passport *Local Name >> input[type="text"]')
        await page.click('a:has-text("Contact")')
        await page.click('textarea')
        await page.click('text=Emergency Contact')
        await page.click('text=Medication')
        await page.click('text=Delete')

        await page.click(`[placeholder='${id}']`)
        await page.fill(`[placeholder='${id}']`, `${id}`)
        await page.click('button:has-text("Ok")')
        await page.isVisible('Patient deleted successfully')
        await page.waitForTimeout(2000)

        await page.click('#settingsbutton__BV_toggle_')
        await page.click('#settingsbutton >> text=Medical Services')
        await page.click('text=self-reg1-paypal1')
        await page.click('button:has-text("Delete")')
        await page.click('[placeholder="self-reg1-paypal1"]')
        await page.fill('[placeholder="self-reg1-paypal1"]', 'self-reg1-paypal1')
        await page.click('text=ok')
        await page.click('text=Medical Service self-reg1-paypal1 Deleted Successfully')
    })
})
