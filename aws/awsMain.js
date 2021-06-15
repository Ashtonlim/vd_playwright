const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-southeast-1' })
const s3bucket = new AWS.S3({ apiVersion: '2006-03-01' })

// Create the parameters for calling listObjects
var bucketParams = {
  Bucket: 'vd-e2e-tests-1',
}

// let listOfKeys

class AWSS3 {
  constructor(s3, bucketParams) {
    this.s3 = s3
    this.bucketParams = bucketParams
    this.listOfKeys = []
  }

  listObjs() {
    this.s3.listObjects(bucketParams, function (err, data) {
      if (err) {
        console.log('Error', err)
        return
      }
      console.log('Success', data.Contents)
      for (let i = 0; i < data.Contents.length; i++) {
        console.log(data.Contents[i].Key)
      }
    })
  }

  getObjKeys() {
    this.s3.listObjects(bucketParams, function (err, data) {
      if (err) {
        console.log('Error', err)
        return
      }
      //   console.log('Success', data.Contents)
      this.listOfKeys = data.Contents.map((x) => x.Key)
      //   for (let i = 0; i < data.Contents.length; i++) {
      //     console.log(data.Contents[i].Key)
      //   }
    })
  }
}

const s3 = new AWSS3(s3bucket, bucketParams)
s3.getObjKeys()
console.log('return ar', s3.listOfKeys)
