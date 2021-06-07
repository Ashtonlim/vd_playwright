module.exports.delPatient = async (page, { id, pName, nric, num }) => {
    console.log(await page.isVisible(`text=${id} ${nric} ${pName} +65${num} Active Preview >> button`))
    if ((await page.isVisible(`text=${id} ${nric} ${pName} +65${num} Active Preview >> button`)) === false) {
        await page.goto('https://hub-staging.vaultdragon.com/patient/list')
        await page.waitForTimeout(1000)
    }

    await page.click(`text=${id} ${nric} ${pName} +65${num} Active Preview >> button`)
    await page.click(`text=${pName}`)
    await page.click('#edit-patient-profile')
    await page.click('text=Personal Information')
    await page.click('text=Delete')
    await page.click(`[placeholder='${id}']`)

    await page.fill(`[placeholder='${id}']`, `${id}`)
    await page.click('button:has-text("Ok")')
    await page.isVisible('Patient deleted successfully')
    await page.waitForTimeout(2000)
}
