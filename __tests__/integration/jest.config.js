const Path = require('path')

const { defaults } = require('jest-config')
const klawSync = require('klaw-sync')
const mm = require('micromatch')

// Note: rootDir is relative to the directory containing this file.
const rootDir = './src'
const { testMatch } = defaults

// TODO: Add the paths to the test suites that need to be run
// sequentially to this array.
const sequentialTestPathMatchPatterns = [
  '<rootDir>/addPricingScheme.test.js',
  '<rootDir>/addProfilePic.test.js',
  '<rootDir>/bookAppointment.test.js',
  '<rootDir>/buyAPkg.test.js',
  '<rootDir>/changeLang.test.js',
  '<rootDir>/charting.test.js',
  '<rootDir>/consultNotes.test.js',
  '<rootDir>/createInv.test.js',
  '<rootDir>/createPatient.test.js',
  '<rootDir>/invAutoEmail.test.js',
  '<rootDir>/membership.test.js',
  '<rootDir>/membershipAndTrf.test.js',
  '<rootDir>/newInvAndVoid.test.js',
  '<rootDir>/patientSummary.test.js',
  '<rootDir>/payInvWCredit.test.js',
  '<rootDir>/paypal1_2.test.js',
  '<rootDir>/paypal3.test.js',
  '<rootDir>/pharmacy.test.js',
  '<rootDir>/printAllInvTemplates.test.js',
  '<rootDir>/qHistory.test.js',
  '<rootDir>/scheduler.test.js',
  '<rootDir>/searchAndAdd.test.js',
  '<rootDir>/selfReg.test.js',
  '<rootDir>/selfRegCancel.test.js',
  '<rootDir>/toggleQCols.test.js',
  '<rootDir>/transferCredits.test.js',
  '<rootDir>/transferPkg.test.js',
  '<rootDir>/transferPoints.test.js',
]

const parallelTestPathIgnorePatterns = []

let testPathIgnorePatterns = [...parallelTestPathIgnorePatterns, ...sequentialTestPathMatchPatterns]

const sequential = process.argv.includes('--runInBand')
if (sequential) {
  const absRootDir = Path.resolve(__dirname, rootDir)
  let filenames = klawSync(absRootDir, { nodir: true })
    .map((file) => file.path)
    .map((file) => file.replace(absRootDir, ''))
    .map((file) => file.replace(/\\/g, '/'))
    .map((file) => '<rootDir>' + file)
  filenames = mm(filenames, testMatch)
  testPathIgnorePatterns = mm.not(filenames, sequentialTestPathMatchPatterns)
}

module.exports = {
  preset: 'jest-playwright-preset',
  setupFilesAfterEnv: [`${process.cwd()}/jest.setup.js`],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './',
        filename: 'report.html',
        expand: true,
        // "openReport": true
      },
    ],
  ],
  rootDir,
  // setupFiles: ['../setup.js'],
  testMatch,
  testPathIgnorePatterns,
}
