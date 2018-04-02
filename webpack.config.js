const clientBaseConfig = require('./webpack.client.common.js');
const serverBaseConfig = require('./webpack.server.common.js');

module.exports = [
  clientBaseConfig,
  serverBaseConfig
];
