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
    type: 'password',
    message: 'What is the PASSWORD for your MySQL database?',
    name: 'password',
    validate: (input) => {
        if (input.length >= 1) {
            return true;
        }
        return "You must enter a password";
    },
};

module.exports = [database, username, password];
