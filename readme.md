# Vault Dragon Playwright End to End Tests

### Installation and Usage

`npm install`

Requires .env file. Please contact Shashi if Ashton has left the company for zoho account information.

Run all tests: `npm test`

Run individual groups: `npm run test:prod1`

### Important

Ensure that .env uses the zoho email ashton@vaultdragon.com for the daily deployment. invAutoEmail.test.js relies on Maurice's email which is ashton@vaultdragon.com. Change patient's email if .env email is changed.

test

### Reporters

jest_html_reporters

### Settings

All settings in g.js

Credentials should be in a file called creds.json, SHOULD BE ommited due to sensitive info but is included for my convenience.

### Refactoring TODOs

In steps, for any actions that requires being on a certain page, ensure is on page, else, go to page

Figure out print label issues

Break up most commonly used parts into steps, e.g. appts.
