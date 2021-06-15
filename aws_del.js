const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-southeast-1' })
const s3 = new AWS.S3({ apiVersion: '2006-03-01' })

var bucketParams = {
  Bucket: 'vd-e2e-tests-1',
}

// Call S3 to delete the bucket
s3.deleteBucket(bucketParams, function (err, data) {
  if (err) {
    console.log('Error', err)
  } else {
    console.log('Success', data)
  }
})
