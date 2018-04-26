// require the spee.ch package
const Server = require('spee.ch');
// get the local configs
const loggerConfig = require('./config/loggerConfig.js'); // make these direct
const mysqlConfig = require('./config/mysqlConfig.js');
const siteConfig = require('./config/siteConfig.js');
const slackConfig = require('./config/slackConfig.js');

try {
    // create a new spee.ch server
    const server = new Server();
    // configure the server
    server.configureLogger(loggerConfig);
    server.configureMysql(mysqlConfig);
    server.configureSite(siteConfig);
    server.configureSlack(slackConfig);
    server.configureModels();
    server.configureRoutes();
    // create the express app and configure it
    server.initialize();
    // sync the db and start express app listening on the configured port
    server.start();
} catch (error) {
    console.log('server startup error:', error);
}
