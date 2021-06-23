const axios = require('axios')
const slack = 'https://hooks.slack.com/services/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'

// Make a request for a user with a given ID
axios
  .post(slack, { text: 'This is a line of text in a channel.\nAnd this is another line of text.' })
  .then(function (res) {
    console.log(res.statusText)
  })
  .catch(function (error) {
    console.log(error)
  })
