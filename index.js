// require the spee.ch package
const speech = require('spee.ch');

// get config files
const config = require('./config.js')

// run speech
speech.speak('hello world');
speech.start(config);
