/**
 *
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

var Journald = exports.Journald = function (options) {
  options = options || {};

  this.name = 'journald';
};

//
// Inherit from `winston.Transport`.
//
util.inherits(Journald, Transport);

//
// Expose the name of this Transport on the prototype
//
Journald.prototype.name = 'journald';

Journald.prototype.log = function (level, msg, meta, callback) {
  journald.log(msg);

  callback(null, true);
};
