const fs = require('fs');

// require the spee.ch package
const Server = require('spee.ch');

function findAndLoadConfig(path) {
    if (!fs.existsSync(path)){
        throw new Error(`No config file found at ${path}.  Please run \'npm run configure\' to build your config files.`);
    }
    const JSONfile = fs.readFileSync(path);
    return JSON.parse(JSONfile);
}

// get custom pages
const customViews = require('./custom/views');

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
    server.configureViews(customViews);
    // create the express app and configure it
    server.initialize();
    // sync the db and start express app listening on the configured port
    server.start();
} catch (error) {
    console.log('server startup error:', error);
    process.exit(1);
}
