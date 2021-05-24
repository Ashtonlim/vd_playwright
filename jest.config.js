module.exports = {
    preset: "jest-playwright-preset",
    setupFilesAfterEnv: ['./jest.setup.js'],
    "reporters": [
        "default",
        "jest-html-reporters"
    ],
    // reporters: [
    //     "default",
    //     ["./node_modules/jest-html-reporter", {
    //         "pageTitle": "Test Report"
    //     }]
    // ]
}