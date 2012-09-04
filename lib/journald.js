var log_journald = require('./log_journald'),
    winston_journald = require('./winston_journald');

module.exports = {
  Log: log_journald,
  WinstonTransport: winston_journald
}
