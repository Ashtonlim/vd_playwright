const axios = require('axios')
const slack = 'https://hooks.slack.com/services/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'

// Make a request for a user with a given ID
axios
  .post(slack, { text: 'This is a line of text in a channel.\nAnd this is another line of text.' })
  .then(function (res) {
    // handle success
    // console.log(res)
  })
  .catch(function (error) {
    // handle error
    console.log(error)
  })
