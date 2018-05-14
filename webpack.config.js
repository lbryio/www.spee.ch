const Path = require('path');
const DEFAULT_ROOT = 'node_modules/spee.ch-components/lib/';
const CUSTOM_ROOT = 'custom/views/';
const fs = require('fs');

function returnFullPath (shortPath) {
  // path === e.g. 'components/Logo/'
  const localPath = Path.join(__dirname, CUSTOM_ROOT, shortPath);
  if (fs.existsSync(localPath)) {
    console.log('using local path', localPath);
    return localPath;
  }
  const defaultPath = Path.join(__dirname, DEFAULT_ROOT, shortPath);
  console.log('using default path:', defaultPath);
  return defaultPath
}

module.exports = {
  target: 'web',
  entry : ['babel-polyfill', 'whatwg-fetch', './lib/client.js'],
  output: {
    path      : Path.join(__dirname, 'public/bundle/'),
    publicPath: 'public/bundle/',
    filename  : 'bundle.js',
  },
  module: {
    // loaders: [
    //   {
    //     test   : /.jsx?$/,
    //     loader : 'babel-loader',
    //     exclude: /node_modules/,
    //     query  : {
    //       presets: ['es2015', 'react', 'stage-2'],
    //     },
    //   },
    // ],
  },
  resolve: {
    modules: [
      'node_modules',
      __dirname,
    ],
    alias: {
      '@pages': Path.resolve('lib/views/pages'),
      '@containers': Path.resolve('node_modules/spee.ch-components/lib/containers'),
      '@components': Path.resolve('node_modules/spee.ch-components/lib/components'),
    },
    extensions: ['.js', '.jsx', '.scss'],
  },
};
