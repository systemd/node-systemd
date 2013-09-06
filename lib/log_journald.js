/**
 * Logging to the systemd journal.
 *
 * (C) 2012 Mark Theunissen
 * MIT (EXPAT) LICENCE
 *
 */

var journald_cpp = require('../build/Release/journald_cpp');

var noop = function() {};

/**
 * Exported functionality of the log module.
 */
module.exports = {
  log: function() {
    if (arguments.length < 1) {
       throw {
        name: 'ArgumentsError',
        message: 'No arguments given'
      }
    }
    var args = [];
    for (i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    // If no callback is provided, add an empty one.
    if (typeof arguments[arguments.length-1] !== 'function') {
      args.push(noop);
    }
    journald.send(args);
  }
}

var journald = {
  send: function(args) {
    // Send log messages by passing an object as the first argument,
    // in the form:
    //
    // journald.send({
    //   MSG: 'Hello',
    //   MSG2: 'World'
    // });
    //
    if (typeof args[0] == 'object') {
      var strings = [];
      for (key in args[0]) {
        if (args[0].hasOwnProperty(key)) {
          if (typeof args[0][key] == 'string') {
            strings.push(key.toUpperCase() + '=' + args[0][key]);
          }
          else {
            throw {
              name: 'ArgumentsError',
              message: 'Object has non-string properties'
            }
          }
        }
      }
      if (strings.length > 1) {
        if (typeof args[1] == 'function') {
          strings.push(args[1]);
        }
        journald_cpp.send.apply(this, strings);
      }
      return;
    }

    // Arguments given as individual strings:
    //
    // journald.send('MSG=Hello', 'MSG2=World')
    //
    for (i = 0; i < args.length; i++) {
      if (typeof args[i] != 'string' && typeof args[i] != 'function') {
        throw {
          name: 'ArgumentsError',
          message: 'Non-string arguments given'
        }
      }
    }
    journald_cpp.send.apply(this, args);
    return;
  }
};
