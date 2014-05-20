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
  default_meta: {"SYSLOG_IDENTIFIER": "test"},
  priority_map: winston.config.syslog.levels,
  level: "emerg",
});
var log = new (winston.Logger)({
  transports: [ transport_instance ]
});
log.setLevels(winston.config.syslog.levels)

log.debug("debug message", {ANOTHER_KEY: "ANOTHER_VALUE"});
log.info("info message");
log.notice("notice message");
log.warning("warning message");
log.error("error message");
log.crit("crit message");
log.alert("alert message");
log.emerg("emerg message");

// Log non-string data. Will call JSON.stringify() on the non-string
// properties. The following results in:
// "DATA" : "1"
// "VARS" : "{\"a\":33,\"b\":[3,4,5,6]}"
// "MYFUNC" : "undefined"
log.error("Non string data", {
  'data': 1,
  vars: {
    a: 33,
    b: [3,4,5,6]
  },
  myfunc: function() {
    return;
  }
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
