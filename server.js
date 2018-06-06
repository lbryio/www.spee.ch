// module imports
const moduleAlias = require('module-alias');
require('babel-polyfill');
const Speech = require('spee.ch');

// local imports
const createModuleAliases = require('./utils/createModuleAliases.js');
const checkForLocalConfig = require('./utils/checkForLocalConfig.js');

moduleAlias.addAliases(createModuleAliases());

try {
  checkForLocalConfig('@config/loggerConfig.json');
  checkForLocalConfig('@config/mysqlConfig.json');
  checkForLocalConfig('@config/siteConfig.json');
  checkForLocalConfig('@config/slackConfig.json');
} catch (error) {
  console.log('local config error:', error);
  process.exit(1);
}

try {
  Speech.startServer();
} catch (error) {
  console.log('server startup error:', error);
  process.exit(1);
}
