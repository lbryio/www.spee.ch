const logLevel = {
    type: 'list',
    message: 'What level of logs do you want displayed?',
    choices: ['error', 'warn', 'info', 'verbose', 'debug' , 'silly'],
    name: 'logLevel',
};

module.exports = [logLevel];
