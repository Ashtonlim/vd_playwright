// Load the AWS SDK for Node.js
const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-southeast-1' })
const s3 = new AWS.S3()

s3.listBuckets(function (err, data) {
  if (err) {
    console.log('Error', err)
  } else {
    console.log('Success', data.Buckets)
  }
})
