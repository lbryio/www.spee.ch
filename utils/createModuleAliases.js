const { statSync, readdirSync } = require('fs');
const { join, resolve } = require('path');

const getDirectories = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());

const addAlliasesForFolder = (name, aliasObject) => { // components
  const folderPath = resolve(`lib/views/${name}`);
  const components = getDirectories(folderPath);
  for (let i = 0; i < components.length; i++) {
    let folderName = components[i];
    let aliasName = `@${name}/${folderName}`;
    let aliasPath = resolve(`lib/views/${name}/${folderName}/index.js`);
    aliasObject[aliasName] = aliasPath;
  }
  return aliasObject;
};

module.exports = () => {
  // default aliases
  let moduleAliases = {};

  // create specific aliases for locally defined components
  moduleAliases = addAlliasesForFolder('containers', moduleAliases);
  moduleAliases = addAlliasesForFolder('components', moduleAliases);
  moduleAliases = addAlliasesForFolder('pages', moduleAliases);

  moduleAliases['@pages'] = resolve('node_modules/spee.ch-components/lib/pages');
  moduleAliases['@containers'] = resolve('node_modules/spee.ch-components/lib/containers');
  moduleAliases['@components'] = resolve('node_modules/spee.ch-components/lib/components');

  // return finished aliases
  return moduleAliases;
};
