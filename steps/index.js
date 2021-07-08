const fns = {
  ...require('./main/init'),
  ...require('./main/teardown'),
  ...require('./main/login'),
  ...require('./main/logout'),
  ...require('./main/pausedSS'),
  ...require('./data/clearQueue'),
  ...require('./forms/createInvoice'),
  ...require('./forms/createPatient'),
  ...require('./forms/delPatient'),
  ...require('./forms/payInvoice'),
  ...require('./forms/togglePatientFields'),
}

module.exports = fns
