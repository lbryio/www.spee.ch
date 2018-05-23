const { statSync, existsSync, readdirSync } = require('fs');
const { join, resolve } = require('path');

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
  moduleAliases['@pages'] = resolve('node_modules/spee.ch/client/build/pages');
  moduleAliases['@containers'] = resolve('node_modules/spee.ch/client/build/containers');
  moduleAliases['@components'] = resolve('node_modules/spee.ch/client/build/components');
  moduleAliases['@actions'] = resolve('node_modules/spee.ch/client/build/actions');
  moduleAliases['@reducers'] = resolve('node_modules/spee.ch/client/build/reducers');
  moduleAliases['@sagas'] = resolve('node_modules/spee.ch/client/build/sagas');
  moduleAliases['@app'] = resolve('node_modules/spee.ch/client/build/app.js');
  // return finished aliases
  return moduleAliases;
};
