// Load the AWS SDK for Node.js
var AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-southeast-1' })
let s3 = new AWS.S3()

const bucketParams = {
  Bucket: 'vd-e2e-tests-1',
}

s3.createBucket(bucketParams, function (err, data) {
  if (err) {
    console.log('Error', err)
  } else {
    console.log('Success', data.Location)
  }
})
