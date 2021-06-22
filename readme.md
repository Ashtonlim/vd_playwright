# Vault Dragon Playwright End to End Tests

### Installation

npm install

Requires .env file. Please contact Shashi if Ashton has left the company for zoho account information.

### Important

Ensure that zoho email ashton@vaultdragon.com is used when running daily deployment. invAutoEmail relies on Maurice's email which is that.

### Reporters

jest_html_reporters

### Settings

all settings in g.js
credentials should be in a file called creds.json, ommited due to sensitive info. Use env vars instead.

### Refactoring TODOs

In steps, for any actions that requires being on a certain page, ensure is on page, else, go to page

Ensure tests can run is //

Figure out print label issues

Break up most commonly used parts into steps, e.g. appts. 