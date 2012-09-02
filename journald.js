var journald_lib = require('./build/Release/journald_lib')

module.exports = {

	send: function() {
    if (arguments.length < 1) {
    	throw {
        name: 'ArgumentsError',
        message: 'No arguments given'
      }
    }

    // Send log messages by passing an object as the first argument,
    // in the form:
    //
    // journald.send({
    //   MSG: 'Hello',
    //   MSG2: 'World'
    // });
    //
    if (typeof arguments[0] == 'object') {
      var strings = [];
      for (key in arguments[0]) {
        if (arguments[0].hasOwnProperty(key)) {
          if (typeof arguments[0][key] == 'string') {
            strings.push(key + '=' + arguments[0][key]);
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
        journald_lib.send.apply(this, strings);
      }
      return;
    }

    // Arguments given as individual strings:
    //
    // journald.send('MSG=Hello', 'MSG2=World')
    //
    for (i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] != 'string') {
        throw {
          name: 'ArgumentsError',
          message: 'Non-string arguments given'
        }
      }
    }
    journald_lib.send.apply(this, arguments);
    return;
	}
}
