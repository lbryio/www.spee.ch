const fs = require('fs');

module.exports = (path) => {
    if (!fs.existsSync(path)){
        throw new Error(`No config file found at ${path}.  Please run \'npm run configure\' to build your config files.`);
    }
    const JSONfile = fs.readFileSync(path);
    return JSON.parse(JSONfile);
};
