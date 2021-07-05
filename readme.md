# Vault Dragon Playwright End to End Tests

## Installation and Usage

`npm install`

Run all tests: `npm test`

Run individual groups: `npm run test:prod1`

Run individual test: `npm run jest /path/to/someTestName.test.js`

Usage requirements:
.env file with email account details the Slack token.
AWS credentails configured

### How to Record tests (For creating tests)

Run `npm run rec` to open the recorder. A tester can also use testim.io's recorder if they aren't a developer to record a test. Simply copy and paste the code generated into a testName.test.js file.

Run `npm run emrec` to open the recorder in zoho.

Run `npm run reset` to clear and reset the data in vaultdragon.com (INCOMPLETED)

## How tests how designed and structured

/scripts runs scripts interacting with s3.

/steps contains the most reusable parts of tests, including creating invoices, patients, etc.

/steps/main/init.js contains some of the options for running skipping initial login, recordings flags, etc.

/steps/main/teardown.js specifies where screenshots should be saved to. Only tests that fail will have a screenshot (unless also written somehwere else in the test to take a screenshot). Each tests ends with a `failing = false` which if not hit, will cause a screenshot to be taken.

/tests contains tests grouped in /tests/prodx to run in parallel. There is a higher liklihood of failure upon running too many tests in parallel, keep to 2-4 tests when running in parallel. /test/last runs serially with the --runInBand option as those tests are much longer and failure prone.

## Important

Ensure that .env uses the zoho email ashton@vaultdragon.com for the daily deployment. invAutoEmail.test.js relies on Maurice's email which is ashton@vaultdragon.com. Change patient's email if .env email is changed.

### Reporter - jest_html_reporters

The name of the folder in /tests determines the name of the generated html report in /report. Logic for this is specified in `tests/prodx/jest.config.js`.

## Settings

g.js contains all the global settings. Read the playwright docs to see options for settings.

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
