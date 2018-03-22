// require the spee.ch package
const Speech = require('spee.ch');

// get the local configs
const { mysqlConfig, siteConfig, slackConfig } = require('../config/');

try {
    // create a new spee.ch server
    const server = new Speech.Server();
    // configure server
    server.configureMysql(mysqlConfig);
    server.configureSite(siteConfig);
    server.configureSlack(slackConfig);
    // initialize (creates the express app and configures it)
    server.initialize();
    // start the server (syncs db and starts server listening on configured port)
    server.start();
} catch (error) {
    console.log('spee.ch server startup error:', error);
}
