const Path = require('path');
const fs = require('fs');
const createModuleAliases = require('./utils/createModuleAliases.js');

const customAliases = createModuleAliases();

module.exports = {
  target: 'web',
  entry : ['babel-polyfill', 'whatwg-fetch', './lib/client.js'],
  output: {
    path      : Path.join(__dirname, 'public/bundle/'),
    publicPath: 'public/bundle/',
    filename  : 'bundle.js',
  },
  module: {},
  resolve: {
    modules: [
      'node_modules',
      __dirname,
    ],
    alias: customAliases,
    extensions: ['.js', '.jsx', '.scss'],
  },
};
