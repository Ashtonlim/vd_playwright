const fns = {
    ...require('./main/login'),
    ...require('./main/init'),
    ...require('./data/clearQueue'),
}

module.exports = fns