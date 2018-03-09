// require the spee.ch package
const speech = require('spee.ch');

// get config files
const config = require('./config.js')

// run speech
server = new speech(config);
server.speak('hello world');
server.start();
