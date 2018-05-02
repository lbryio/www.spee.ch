const slackWebHook = {
    type: 'input',
    message: 'Enter a slack web hook if you wish to push logs to slack.',
    default: false,
    name: 'slackWebHook',
};

const slackErrorChannel = {
    type: 'input',
    message: 'Enter a slack channel (#example) for errors to be sent to.',
    default: false,
    name: 'slackErrorChannel',
};

const slackInfoChannel = {
    type: 'password',
    message: 'Enter a slack channel (#info) for info level logs to be sent to.',
    default: false,
    name: 'slackInfoChannel',
};

module.exports = [
    slackWebHook,
    slackErrorChannel,
    slackInfoChannel,
];
