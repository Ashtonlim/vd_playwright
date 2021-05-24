module.exports = {
    preset: "jest-playwright-preset",
    setupFilesAfterEnv: ['./jest.setup.js'],
    "reporters": [
        "default",
        ["jest-html-reporters", {
            "publicPath": "./",
            "filename": "index.html",
            "expand": true,
            "openReport": true
        }],
    ],
    // reporters: [
    //     "default",
    //     ["./node_modules/jest-html-reporter", {
    //         "pageTitle": "Test Report"
    //     }]
    // ]
}