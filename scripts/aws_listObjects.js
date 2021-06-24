var AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-southeast-1' })
s3 = new AWS.S3({ apiVersion: '2006-03-01' })

var bucketParams = {
  Bucket: 'vd-e2e-tests-1',
}

// Call S3 to obtain a list of the objects in the bucket
s3.listObjects(bucketParams, function (err, data) {
  if (err) {
    console.log('Error', err)
  } else {
    console.log('Success, List of Objects Now:')
    for (e of data.Contents) {
      console.log(e.Key)
    }
  }
})
