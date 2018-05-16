const port = (defaultAnswer) => {
  return {
    type: 'input',
    message: 'Enter a PORT for your server to run on.',
    default: defaultAnswer,
    name: 'port',
  }
};

const title = (defaultAnswer) => {
  return {
    type: 'input',
    message: 'Enter a title for your site.',
    default: defaultAnswer,
    name: 'title',
  };
};


const host = (defaultAnswer) => {
  return {
    type: 'input',
    message: 'Enter your site\'s domain.',
    default: defaultAnswer,
    name: 'host',
  };
};

const uploadDirectory = (defaultAnswer) => {
 return {
   type: 'input',
   message: 'Enter a directory where uploads should be stored.',
   default: defaultAnswer,
   name: 'uploadDirectory',
 };
};

module.exports = (defaultPort, defaultTitle, defaultHost, defaultUploadDirectory) => {
  return [
    port(defaultPort),
    title(defaultTitle),
    host(defaultHost),
    uploadDirectory(defaultUploadDirectory),
  ]
};
