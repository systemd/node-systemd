var journald = require('./build/Release/journald')

journald.send('MESSAGE=hello world', 'ARG1=first_argument', 'ARG2=second_argument');
