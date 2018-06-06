const { statSync, existsSync, readdirSync } = require('fs');
const { join, resolve } = require('path');
const BUILD_ROOT = 'node_modules/spee.ch/client/build';

const getFolders = path => {
  if (existsSync(path)) {
    return readdirSync(path).filter(file => statSync(join(path, file)).isDirectory());
  }
  return [];
};

const addAlliasesForFolder = (name, aliasObject) => { // components
  const folderPath = resolve(`lib/views/${name}`);
  const components = getFolders(folderPath);
  for (let i = 0; i < components.length; i++) {
    let folderName = components[i];
    let aliasName = `@${name}/${folderName}`;
    let aliasPath = resolve(`lib/views/${name}/${folderName}/index.js`);
    aliasObject[aliasName] = aliasPath;
  }
  return aliasObject;
};

module.exports = () => {
  let moduleAliases = {};
  // create specific aliases for locally defined components
  moduleAliases = addAlliasesForFolder('containers', moduleAliases);
  moduleAliases = addAlliasesForFolder('components', moduleAliases);
  moduleAliases = addAlliasesForFolder('pages', moduleAliases);
// default aliases
  moduleAliases['@config'] = resolve(`config`);
  moduleAliases['@pages'] = resolve(`${BUILD_ROOT}/pages`);
  moduleAliases['@containers'] = resolve(`${BUILD_ROOT}/containers`);
  moduleAliases['@components'] = resolve(`${BUILD_ROOT}/components`);
  moduleAliases['@actions'] = resolve(`${BUILD_ROOT}/actions`);
  moduleAliases['@reducers'] = resolve(`${BUILD_ROOT}/reducers`);
  moduleAliases['@sagas'] = resolve(`${BUILD_ROOT}/sagas`);
  moduleAliases['@app'] = resolve(`${BUILD_ROOT}/app.js`);
  // return finished aliases
  return moduleAliases;
};
