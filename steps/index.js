const fns = {
    ...require('./main/init'),
    ...require('./main/teardown'),
    ...require('./main/login'),
    ...require('./main/logout'),
    ...require('./data/clearQueue'),
    ...require('./forms/createInvoice'),
}

module.exports = fns