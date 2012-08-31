node-systemd
============

Node.js module for native access to the journald facilities in recent versions of systemd. In particular, this capability includes passing key/value pairs as fields that journald can use for filtering.

Usage
=====

var journald = require('journald')
journald.send('MESSAGE=hello world', 'ARG1=first_argument', 'ARG2=second_argument');

Developing
==========

Install node-gyp to build the extension:

    sudo npm install -g node-gyp

Build:

    node-gyp configure && node-gyp build

Run test app:

    node test.js

Viewing Output
==============

Quick way to view output with all fields as it comes in:

    sudo journalctl -f --output=json
