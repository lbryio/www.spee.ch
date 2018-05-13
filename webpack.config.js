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
  entry : ['babel-polyfill', 'whatwg-fetch', './client.js'],
  output: {
    path      : Path.join(__dirname, 'public/bundle/'),
    publicPath: 'public/bundle/',
    filename  : 'bundle.js',
  },
  module: {
    loaders: [
      {
        test   : /.jsx?$/,
        loader : 'babel-loader',
        exclude: /node_modules/,
        query  : {
          presets: ['es2015', 'react', 'stage-2'],
        },
      },
    ],
  },
  resolve: {
    modules: [
      // Path.join(__dirname, 'custom/views'),
      // Path.join(__dirname, 'custom/views/components'),
      'node_modules',
      __dirname,
    ],
    alias: {
      '@pages/AboutPage': Path.resolve('custom/views/pages/AboutPage'),
      // '@components/Logo': Path.resolve('custom/views/components/Logo'),
      // '@components': Path.resolve('custom/views/components'),
      // 'test/TestTest': Path.resolve('custom/views/test/TestTest'),
    },
    extensions: ['.js', '.jsx', '.scss'],
  },
};
