/**
 * Example code for the systemd journal node extension.
 *
 * (C) 2012 Mark Theunissen
 * MIT (EXPAT) LICENCE
 *
 */

var winston = require('winston'),
    journald = require('./lib/journald').Log,
    journald_transport = require('./lib/journald').WinstonTransport;

// Log using Winston, first add the journald transport and then send.
// This will also print to the console as that is the default winston
// log transport.
winston.add(journald_transport.Journald);
winston.info('Simple message format');
winston.info('CUSTOMKEY=Specified a key');

winston.log('error', 'MESSAGE=Multiple messages can be sent', {
  STATE: 'System crashing',
  BECAUSE: 'Someone unplugged it'
});


// Or, create a winston logger instance, passing in options, i.e.
// default SYSLOG_IDENTIFIER field, or level-to-priority map.
var transport_instance = new (journald_transport.Journald)({
  "default_meta": {"SYSLOG_IDENTIFIER": "test"},
  "priority_map": {"debug": 7, "fatal": 1}
});
var log = new (winston.Logger)({transports: [ transport_instance ]});
log.debug("Something trivial", {ANOTHER_KEY: "ANOTHER_VALUE"});
log.error("This is bad news", {PRIORITY: "3"});
log.error("This is a warning", {PRIORITY: "5"});


// Now log directly using the journald log, you can pass as many string
// parameters as you like.
journald.log('MESSAGE=strings sent individually', 'ARG1=as arguments');

// Or pass as an object and optionally end with a callback function. This
// one outputs the result of the call to the console, this is taken directly
// from the C call to systemd, so will be 0 (pass) or 1 (fail).
var callback = function(err, result) {
  console.warn(result);
}
journald.log({
    MESSAGE: 'hello world',
    ARG1: 'first argument here',
    ARG2: 'second argument here',
    ARG3: 'another one'
  },
  callback
);
