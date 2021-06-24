const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-southeast-1' })
s3 = new AWS.S3()

let bucketParams = {
  Bucket: 'vd-e2e-tests-1',
}
const Delete = { Objects: [] }

// Call S3 to obtain a list of the objects in the bucket
s3.listObjects(bucketParams, (err, data) => {
  if (err) {
    console.log('Error', err)
  } else {
    console.log('Success')
    for (e of data.Contents) {
      //   console.log(e.Key)
      Delete['Objects'].push({ Key: e.Key })
    }
    bucketParams = { ...bucketParams, Delete }
    console.log(bucketParams)
    s3.deleteObjects(bucketParams, function (err, data) {
      if (err) console.log(err, err.stack)
      else console.log('success')
    })
  }
})
