const googleId = {
    type: 'input',
    message: 'Enter a Google Analytics ID to enable analytics.',
    default: false,
    name: 'googleId',
};

const defaultAssetTitle = {
    type: 'input',
    message: 'Enter a default title for content shared from your site.',
    default: 'Default Content Title',
    name: 'defaultAssetTitle',
};

const defaultAssetDescription = {
    type: 'input',
    message: 'Enter a default title for content shared from your site.',
    default: 'Default Content Description',
    name: 'defaultAssetDescription',
};

const defaultAssetThumbnail = {
    type: 'input',
    message: 'Enter a url for a default thumbnail for videos shared from your site.',
    default: 'https://spee.ch/0e5d4e8f4086e13f5b9ca3f9648f518e5f524402/speechflag.png',
    name: 'defaultAssetThumbnail',
};

const sessionKey = {
    type: 'input',
    message: 'Enter a secret key which will be used to secure user authentication.',
    name: 'sessionKey',
    validate: (input) => {
        if (input.length >= 1) {
            return true;
        }
        return "You must enter a sessionKey";
    },
};

const port = {
    type: 'input',
    message: 'Enter a PORT for your server to run on.',
    default: 3000,
    name: 'port',
};

const title = {
    type: 'input',
    message: 'Enter a title for your site.',
    default: 'My Site',
    name: 'title',
};

const host = {
    type: 'input',
    message: 'Enter your site\'s domain.',
    default: 'https://www.example.com',
    name: 'host',
};

const description = {
    type: 'input',
    message: 'Enter a short description for your site.',
    default: 'A decentralized hosting platform built on LBRY',
    name: 'description',
};

const twitter = {
    type: 'input',
    message: 'Enter your site\'s twitter handle.',
    default: false,
    name: 'twitter',
};

const uploadDirectory = {
    type: 'input',
    message: 'Enter a directory where uploads should be stored.',
    default: '/home/lbry/Uploads',
    name: 'uploadDirectory',
};

module.exports = [
  googleId,
  defaultAssetTitle,
  defaultAssetDescription,
  defaultAssetThumbnail,
  sessionKey,
  port,
  title,
  host,
  description,
  twitter,
  uploadDirectory,
];
