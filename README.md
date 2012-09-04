node-systemd
------------

Node.js module for native access to the journald facilities in recent
versions of systemd. In particular, this capability includes passing
key/value pairs as fields that journald can use for filtering.

Also includes a plugin for [winston][0]

Usage
=====

Very basic (see test.js for more detailed example):

``` js
  var journald = require('journald').Log;
  journald.log('MESSAGE=hello world', 'ARG1=first_argument', 'ARG2=second_argument');
```

Developing
==========

Install node-gyp to build the extension:

    sudo npm install -g node-gyp

Use npm to build the extension:

    npm install

Or, build the C++ extension manually:

    node-gyp configure && node-gyp build

Run test app:

    node test.js

Viewing Output
==============

Quick way to view output with all fields as it comes in:

    sudo journalctl -f --output=json

[0]: https://github.com/flatiron/winston

LICENSE
-------

(c) 2012 Mark Theunissen

MIT (EXPAT)
