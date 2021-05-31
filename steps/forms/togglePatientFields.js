

module.exports.togglePatientFields = async (page) => {
    await page.click('#settingsbutton__BV_toggle_');
    await page.click('#settingsbutton >> text=System Preferences');
    await page.waitForTimeout(1500);
    await page.click('#main >> text=Patient');
    await page.click('text=NRIC/Passport');
    await page.click('button:has-text("Save Details")');
    await page.click('text=Configuration Updated Successfully');
    return
}

