var journald = require('./journald')

journald.send('MESSAGE=strings sent individually', 'ARG1=as arguments');

journald.send({
  MESSAGE: 'hello world',
  ARG1: 'first argument here',
  ARG2: 'second argument here'
});
