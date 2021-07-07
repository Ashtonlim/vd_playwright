# Vault Dragon Playwright End to End Tests

## Installation and Usage

`npm install`

Run all tests: `npm test`

Run individual groups: `npm run test:prod1`

Run individual test: `npm run jest /path/to/someTestName.test.js`

Usage requirements:
.env file with email account details the Slack token.
AWS credentails configured

When running on different builds (staging, dev, prod) or org codes, a few things need to be changed:

1. All the page.goto(URLHereHasCorrectPrefix) is correct. Should change to a variable so that it can be changed from one place instead.
2. Use the correct creds.json
3. orgCode specified in ./steps/main/login.js

### How to Record tests (For creating tests)

Run `npm run rec` to open the recorder. A tester can also use testim.io's recorder if they aren't a developer to record a test. Simply copy and paste the code generated into a testName.test.js file.

Run `npm run emrec` to open the recorder in zoho.

Run `npm run reset` to clear and reset the data in vaultdragon.com (INCOMPLETED)

## How tests how designed and structured

./creds.json contains the localstorage info in json (string escaped). When testing on another url (i.e hub.vauldragon.com, hub-dev.vauldragon.com, hub-staging.vauldragon.com), and/or another org code (i.e. uilicicious, e2etesting, demo clinic) please ensure the fields are changed. If unsure, just extract localstorage directly from the browser to get the same behaviour.

./scripts runs scripts interacting with s3.

./steps contains the most reusable parts of tests, including creating invoices, patients, etc.

./steps/main/init.js contains some of the options for running skipping initial login, recordings flags, etc.

./steps/main/teardown.js specifies where screenshots should be saved to. Only tests that fail will have a screenshot (unless also written somehwere else in the test to take a screenshot). Each tests ends with a `failing = false` which if not hit, will cause a screenshot to be taken.

./tests contains tests grouped in ./tests/prodx to run in parallel. There is a higher liklihood of failure upon running too many tests in parallel, keep to 2-4 tests when running in parallel. ./test/last runs serially with the --runInBand option as those tests are much longer and failure prone.

## Important

Usage requirements:
.env file with email account details the Slack token.
AWS credentails configured

### How to Record tests (For creating tests)

Run `npm run rec` to open the recorder. A tester can also use testim.io's recorder if they aren't a developer to record a test. Simply copy and paste the code generated into a testName.test.js file.

### Reporter - jest_html_reporters

The name of the folder in /tests determines the name of the generated html report in /report. Logic for this is specified in `tests/prodx/jest.config.js`.

## Settings

g.js contains all the global settings such as resolution, output directories, etc. Read the playwright docs to see options for settings.

creds.json containts the credentials which SHOULD BE ommited in .gitignore as it includes sensitive info. creds.json contains the localstorage objects when a user logs into VD.

postTest.js uploads assets to S3 and notifies slack.

### Now

1. Deploy to hub-dev
2. Ensure data on dev is the same as staging
3. For dev/staging/production, ensure .env, g.js and creds.json is appropriate.
4. Run tests
5. If any fails
6. Either fix the test or the code
7. Repeat from step 3
8. If all pass, good!

### Future

- Explore how to scale e2e testing properly
- Better slack and AWS integration
  - Clears old assets in S3
  - Slack notifies number of failing tests, etc. Try to hook into console/report to get more granular info
- Try to update tests often/whenever it fails. Frontend changes often
- Decide the approach of test creation. Likely 2
  - Have non-dev work on it
  - Mostly devs
- Can look at sauce labs, applitools integration.
- Better reporting

### HOTO

- Able to setup codebase and environment
- Able to run tests
- Required Env file/variables

### Notes and Todos

1. How to clear print PDF popups.
2. Break up most commonly used parts into steps, e.g. appts.
3. addProfilePic.test.js will probably not work on a server.
4. For tests w/ email, each login is tracked by zoho as a session. If you do not logout, zoho will continue to include your session and there are only a limited number of sessions (note that this is different from the logins allowed per day). Active sessions need to be regularly cleared @ https://accounts.zoho.com/home#sessions/useractivesessions. The other alternative is to:
   1. logout of zoho in the test
   2. Do something like creds.json, save the login state and inject to cookies/localstorage upon browser instantiation. This way, I think it _MIGHT_ be able to bypass the daily login limit too.
5. -
