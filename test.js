var winston = require('winston'),
    journald = require('./lib/journald').Log,
    journald_transport = require('./lib/journald').WinstonTransport;

// Log using Winston, first add the transport and then send.
winston.add(journald_transport.Journald);
winston.info('MSG=Hello again distributed logs');

// Now log directly using the journald log.
var callback = function(err, result) {
  console.warn(result);
}

// You can pass as many string parameters as you like, and optionally end
// with a callback function.
journald.log('MESSAGE=strings sent individually', 'ARG1=as arguments');

// Or pass as an object.
journald.log({
    MESSAGE: 'hello world',
    ARG1: 'first argument here',
    ARG2: 'second argument here',
    ARG3: 'another one'
  },
  callback
);
