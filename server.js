const findAndLoadConfig = require('./utils/findAndLoadConfig.js');

// require the spee.ch package
const Server = require('spee.ch');

// get custom pages
// const customViews = require('./custom/views');

try {
    // create a new spee.ch server
    const server = new Server();
    // get the local configs
    const loggerConfig = findAndLoadConfig('./config/loggerConfig.json');
    const mysqlConfig = findAndLoadConfig('./config/mysqlConfig.json');
    const siteConfig = findAndLoadConfig('./config/siteConfig.json');
    const slackConfig = findAndLoadConfig('./config/slackConfig.json');
    // configure the server
    server.configureLogger(loggerConfig);
    server.configureMysql(mysqlConfig);
    server.configureSite(siteConfig);
    server.configureSlack(slackConfig);
    // server.configureViews(customViews);
    // create the express app and configure it
    server.initialize();
    // sync the db and start express app listening on the configured port
    server.start();
} catch (error) {
    console.log('server startup error:', error);
    process.exit(1);
}
