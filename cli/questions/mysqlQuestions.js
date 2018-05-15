const database = {
    type: 'input',
    message: 'What is the name of the MySQL DATABASE to be used?',
    default: 'lbry',
    name: 'database',
};

const username = {
    type: 'input',
    message: 'What is the USER NAME for your MySQL database?',
    default: 'root',
    name: 'username',
};

const password = {
    type: 'input',
    message: 'What is the PASSWORD for your MySQL database?',
    default: '',
    name: 'password',
};

module.exports = [database, username, password];
