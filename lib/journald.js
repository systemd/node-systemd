/**
 * Wraps the two plugins provided, the winston plugin and the native logger.
 *
 * (C) 2012 Mark Theunissen
 * MIT (EXPAT) LICENCE
 *
 */

var log_journald = require('./log_journald'),
    winston_journald = require('./winston_journald');

module.exports = {
  Log: log_journald,
  WinstonTransport: winston_journald
}
