const Path = require('path');
const nodeExternals = require('webpack-node-externals');

const DEFAULT_ROOT = 'node_modules/spee.ch-components/lib/';
const CUSTOM_ROOT = 'custom/views/';
const fs = require('fs');

function returnFullPath (shortPath) {
  // path === e.g. 'components/Logo/'
  const localPath = Path.join(__dirname, CUSTOM_ROOT, shortPath);
  if (fs.existsSync(localPath)) {
    return localPath;
  }
  return Path.join(__dirname, DEFAULT_ROOT, shortPath);
}

module.exports = {
  target: 'node',
  node  : {
    __dirname: false,
  },
  externals: [nodeExternals({
    // whitelist: ['spee.ch','spee.ch-components'],
  })],
  entry    : ['babel-polyfill', 'whatwg-fetch', './server.js'],
  output   : {
    path         : Path.join(__dirname, '/'),
    publicPath   : '/',
    filename     : 'index.js',
    library      : '',
    libraryTarget: 'commonjs-module',
  },
  module: {
    rules: [
      {
        test   : /.jsx?$/,
        exclude: /node_modules/,
        loader : 'babel-loader',
        options: {
          presets: ['es2015',  'react', 'stage-2'],
        },
      },
      {
        test  : /.css$/,
        loader: 'css-loader',
      },
    ],
  },
  resolve: {
    modules: [
      // Path.join(__dirname, 'custom/views/'),
      'node_modules',
      __dirname,
    ],
    alias: {
      // '@components/Logo': Path.resolve('custom/views/components/Logo'),
      // '@components': Path.resolve('custom/views/components'),
      // 'test/TestTest': Path.resolve('custom/views/test/TestTest'),
    },
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
};
