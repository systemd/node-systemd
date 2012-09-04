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

winston.log('error', 'MSG=Multiple messages can be sent', {
  STATE: 'System crashing',
  BECAUSE: 'Someone unplugged it'
});

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
