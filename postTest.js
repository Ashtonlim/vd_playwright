require('dotenv').config()
const fs = require('fs')
const AWS = require('aws-sdk')
const path = require('path')
const { WebClient } = require('@slack/web-api')
const dayjs = require('dayjs')

const s3 = new AWS.S3()
const web = new WebClient(process.env.SLACK_TOKEN)
const r = Math.random().toString(36).substring(8)
const folderName = `${dayjs().format('YY-MM-DD')}-${r}`
const bucketName = 'vd-e2e-tests-1'
const s3Link = `https://s3.console.aws.amazon.com/s3/buckets/${bucketName}?region=ap-southeast-1&prefix=${folderName}/&showversions=false`
const failedTests = []

const publishMessage = async (channel, text, blocks) => {
  try {
    // Call the chat.postMessage method using the built-in WebClient
    const result = await web.chat.postMessage({
      channel,
      text,
      blocks,
    })
    // Print result, which includes information about the message (like TS)
    // console.log(result)
  } catch (err) {
    console.error(err)
  }
}

const uploadDir = (s3Path, bucketName) => {
  const filePaths = []
  function walkSync(currentDirPath) {
    fs.readdirSync(currentDirPath).forEach((name) => {
      let filePath = path.join(currentDirPath, name)
      let stat = fs.statSync(filePath)
      if (stat.isFile()) {
        if (s3Path === 'screenshots') {
          failedTests.push(filePath.split('_')[1])
        }
        // callback(filePath, stat)
        filePaths.push(filePath)
      } else if (stat.isDirectory()) {
        walkSync(filePath)
      }
    })
  }

  walkSync(s3Path)

  filePaths.forEach((filePath) => {
    let bucketPath = filePath.substring(s3Path.length + 1).replace('\\', '/')
    let params = { Bucket: bucketName, Key: `${folderName}/${bucketPath}`, Body: fs.readFileSync(filePath), ACL: 'public-read' }
    // console.log(bucketPath)
    // console.log(params)
    s3.putObject(params, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Successfully uploaded ' + bucketPath + ' to ' + bucketName)
      }
    })
  })
}

uploadDir('recordings', bucketName)
uploadDir('screenshots', bucketName)
uploadDir('report', bucketName)

publishMessage('# automated-testing', `Failed tests: ${failedTests.length}\nView reports and recordings at: ${s3Link}`, [
  {
    type: 'header',
    text: {
      type: 'plain_text',
      text: `Failed tests: ${failedTests.length}`,
      emoji: true,
    },
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `<${s3Link}|Link to test reports, recordings and screenshots>\n`,
    },
  },
])
