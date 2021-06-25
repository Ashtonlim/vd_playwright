const fs = require('fs')
const secs = 10
jest.setTimeout(secs * 1000)
jest.retryTimes(3)
