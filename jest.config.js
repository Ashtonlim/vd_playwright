module.exports = {
  preset: 'jest-playwright-preset',
  setupFilesAfterEnv: ['./jest.setup.js'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './app/src/views',
        filename: 'report.ejs',
        expand: true,
        // "openReport": true
      },
    ],
  ],
  testSequencer: 'testSequencer.js',
  // reporters: [
  //     "default",
  //     ["./node_modules/jest-html-reporter", {
  //         "pageTitle": "Test Report"
  //     }]
  // ]
}
