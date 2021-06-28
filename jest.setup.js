const fs = require('fs')
const secs = 150
jest.setTimeout(secs * 1000)
jest.retryTimes(4)
