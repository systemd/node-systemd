/**
 * Winston Transport for outputting to the systemd journal.
 *
 * (C) 2012 Mark Theunissen
 * MIT (EXPAT) LICENCE
 *
 */

var util = require('util'),
    winston = require('winston'),
    Transport = require('winston').Transport,
    journald = require('./log_journald');

/**
 * The module's exports.
 */
var Journald = exports.Journald = function (options) {
  options = options || {};
  this.name = 'journald';
};

/**
 * Inherit from `winston.Transport`.
 */
util.inherits(Journald, Transport);

/**
 * Expose the name of this Transport on the prototype
 */
Journald.prototype.name = 'journald';

/**
 * Write to the log. The priority and level are added to the log message.
 *
 * Any additional fields can be passed in the 'meta' parameter, and are added
 * to the message.
 */
Journald.prototype.log = function (level, msg, meta, callback) {
  meta = meta || {};
  meta.LEVEL = level;

  msg_split = msg.split('=', 2);
  if (msg_split.length > 1) {
    meta[msg_split[0]] = msg_split[1];
  }
  else {
    meta.MSG = msg_split[0];
  }

  journald.log(meta, callback);
};
