module.exports = {
  preset: 'jest-playwright-preset',
  setupFilesAfterEnv: ['./jest.setup.js'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './reportForOtherTests',
        filename: 'report.html',
        expand: true,
        // "openReport": true
      },
    ],
  ],
}
