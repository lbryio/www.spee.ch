// require the spee.ch package
const speech = require('spee.ch');

// get config files
const config = require('./config')

console.log('creating speech server');
// create a new spee.ch server
server = new speech(config);

// run speech
try {
    console.log('starting speech server');
    server.start();
} catch (error) {
    console.log('spee.ch server error:', error);
}
