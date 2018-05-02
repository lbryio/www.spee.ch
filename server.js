const fs = require('fs');

// require the spee.ch package
const Server = require('spee.ch');

// get the local configs
loggerConfigJSON = fs.readFileSync('./cli/output/loggerConfig.json');
const loggerConfig = JSON.parse(loggerConfigJSON);

mysqlConfigJSON = fs.readFileSync('./cli/output/mysqlConfig.json');
const mysqlConfig = JSON.parse(mysqlConfigJSON);

siteConfigJSON = fs.readFileSync('./cli/output/siteConfig.json');
const siteConfig = JSON.parse(siteConfigJSON);

slackConfigJSON = fs.readFileSync('./cli/output/slackConfig.json');
const slackConfig = JSON.parse(slackConfigJSON);

// get custom pages
const viewsConfig = require('./custom/views');

try {
    // create a new spee.ch server
    const server = new Server();
    // configure the server
    server.configureLogger(loggerConfig);
    server.configureMysql(mysqlConfig);
    server.configureSite(siteConfig);
    server.configureSlack(slackConfig);
    server.configureViews(viewsConfig);
    // create the express app and configure it
    server.initialize();
    // sync the db and start express app listening on the configured port
    server.start();
} catch (error) {
    console.log('server startup error:', error);
}
