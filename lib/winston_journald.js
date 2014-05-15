/**
 * Winston Transport for outputting to the systemd journal.
 *
 * See http://www.freedesktop.org/software/systemd/man/systemd.journal-fields.html
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
  Transport.call(this, options);
  options = options || {};

  this.name = 'journald';
  this.priority_map = options.priority_map || {};
  this.default_meta = options.default_meta || {};
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
 * Write to the log. The level is added to the log message, along with
 * the numerical priority, if there is a valid level-to-priority map entry.
 *
 * Any additional fields can be passed in the 'event_meta' parameter, which
 * are added to the message, overriding any fields defined as default_meta.
 */
Journald.prototype.log = function (level, msg, event_meta, callback) {
  var meta = {};
  // Set default meta data.
  for (var key in this.default_meta || {}) {
    meta[key] = this.default_meta[key];
  }
  // Merge in event_meta key/value pairs (if any)
  for (var key in event_meta || {}) {
    meta[key] = event_meta[key];
  }

  // Set level
  meta.LEVEL = level;

  // Map level to named PRIORITY field
  if (this.priority_map[level] >= 0) {
    meta.PRIORITY = this.priority_map[level] + '';
  }

  // Split or use message
  msg_split = (msg || '').split('=', 2);
  if (msg_split.length > 1) {
    meta[msg_split[0]] = msg_split[1];
  }
  else {
    meta.MESSAGE = msg_split[0];
  }

  journald.log(meta, callback);
};
