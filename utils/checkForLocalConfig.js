const { existsSync, readFileSync } = require('fs');

module.exports = (path) => {
    if (!existsSync(path)){
        throw new Error(`No config file found at ${path}.  Please run \'npm run configure\' to build your config files.`);
    }
    const JSONfile = readFileSync(path);
    return JSON.parse(JSONfile);
};
