 // Click text=Add
 await page.click('text=Add');
 // Click input[type="number"]
 await page.click('input[type="number"]');
 // Fill input[type="number"]
 await page.fill('input[type="number"]', '8');
 // Press Tab
 await page.press('input[type="number"]', 'Tab');
 // Fill text=Weight kg >> input[type="number"]
 await page.fill('text=Weight kg >> input[type="number"]', '9');
 // Press Tab
 await page.press('text=Weight kg >> input[type="number"]', 'Tab');
 // Fill text=LMP date >> input[type="text"]
 await page.fill('text=LMP date >> input[type="text"]', '2021-05-05');
 // Click text=LMP date >> input[type="text"]
 await page.click('text=LMP date >> input[type="text"]');
 // Press Enter
 await page.press('text=LMP date >> input[type="text"]', 'Enter');
 // Click text=Waist Circumference inch >> input[type="text"]
 await page.click('text=Waist Circumference inch >> input[type="text"]');
 // Fill text=Waist Circumference inch >> input[type="text"]
 await page.fill('text=Waist Circumference inch >> input[type="text"]', '5');
 // Press Tab
 await page.press('text=Waist Circumference inch >> input[type="text"]', 'Tab');
 // Fill text=Pulse bpm >> input[type="text"]
 await page.fill('text=Pulse bpm >> input[type="text"]', '5');
 // Press Tab
 await page.press('text=Pulse bpm >> input[type="text"]', 'Tab');
 // Fill text=Systolic mmHg >> input[type="text"]
 await page.fill('text=Systolic mmHg >> input[type="text"]', '5');
 // Press Tab
 await page.press('text=Systolic mmHg >> input[type="text"]', 'Tab');
 // Fill text=Diastolic mmHg >> input[type="text"]
 await page.fill('text=Diastolic mmHg >> input[type="text"]', '5');
 // Click text=Add
 await page.click('text=Add');
 // Click button:has-text("✓")
 await page.click('button:has-text("✓")');
 // Click text=Delete
 await page.click('text=Delete');
 // Click [placeholder="11"]
 await page.click('[placeholder="11"]');
 // Double click [placeholder="11"]
 await page.dblclick('[placeholder="11"]');
 // Fill [placeholder="11"]
 await page.fill('[placeholder="11"]', '11');
 // Click text=Ok
 await page.click('text=Ok');
 // Click td:has-text("No data for table")
 await page.click('td:has-text("No data for table")');
