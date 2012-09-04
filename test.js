var journald = require('./lib/journald')

var callback = function(err, result) {
  console.warn(result);
}

journald.log('MESSAGE=strings sent individually', 'ARG1=as arguments');

journald.log({
    MESSAGE: 'hello world',
    ARG1: 'first argument here',
    ARG2: 'second argument here',
    ARG3: 'another one'
  },
  callback
);
