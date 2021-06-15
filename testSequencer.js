// testSequencer.js
const Sequencer = require('@jest/test-sequencer').default

class CustomSequencer extends Sequencer {
  sort(tests) {
    // Test structure information
    // https://github.com/facebook/jest/blob/6b8b1404a1d9254e7d5d90a8934087a9c9899dab/packages/jest-runner/src/types.ts#L17-L21
    const copyTests = Array.from(tests)
    return copyTests.sort((testA, testB) => (testA.path > testB.path ? 1 : -1))
  }
}

module.exports = CustomSequencer

// const x = (tests) => {
//   // Test structure information
//   // https://github.com/facebook/jest/blob/6b8b1404a1d9254e7d5d90a8934087a9c9899dab/packages/jest-runner/src/types.ts#L17-L21
//   const copyTests = Array.from(tests)
//   return copyTests.sort((testA, testB) => (testA.path > testB.path ? 1 : -1))
// }

// console.log(
//   x([
//     '<rootDir>/addPricingScheme.test.js',
//     '<rootDir>/addProfilePic.test.js',
//     '<rootDir>/bookAppointment.test.js',
//     '<rootDir>/buyAPkg.test.js',
//     '<rootDir>/changeLang.test.js',
//     '<rootDir>/charting.test.js',
//     '<rootDir>/consultNotes.test.js',
//     '<rootDir>/createInv.test.js',
//     '<rootDir>/createPatient.test.js',
//     '<rootDir>/invAutoEmail.test.js',
//     '<rootDir>/membership.test.js',
//     '<rootDir>/membershipAndTrf.test.js',
//     '<rootDir>/newInvAndVoid.test.js',
//     '<rootDir>/patientSummary.test.js',
//     '<rootDir>/payInvWCredit.test.js',
//     '<rootDir>/paypal1_2.test.js',
//     '<rootDir>/paypal3.test.js',
//     '<rootDir>/pharmacy.test.js',
//     '<rootDir>/printAllInvTemplates.test.js',
//     '<rootDir>/qHistory.test.js',
//     '<rootDir>/scheduler.test.js',
//     '<rootDir>/searchAndAdd.test.js',
//     '<rootDir>/selfReg.test.js',
//     '<rootDir>/selfRegCancel.test.js',
//     '<rootDir>/toggleQCols.test.js',
//     '<rootDir>/transferCredits.test.js',
//     '<rootDir>/transferPkg.test.js',
//     '<rootDir>/transferPoints.test.js',
//   ])
// )
