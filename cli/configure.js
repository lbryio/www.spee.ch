const inquirer = require('inquirer');
const fs = require('fs');
const Path = require('path');
const axios = require('axios');

const mysqlQuestions = require(Path.resolve(__dirname, 'questions/mysqlQuestions.js'));
const siteQuestions = require(Path.resolve(__dirname, 'questions/siteQuestions.js'));

let primaryClaimAddress = '';
let thumbnailChannel = '@thumbnails';
let thumbnailChannelId = '';

let mysqlConfig = require('../config/mysqlConfig.json');
const { database: mysqlDatabase, username: mysqlUsername, password: mysqlPassword } = mysqlConfig;
console.log('starting mysql config:', mysqlConfig);

let siteConfig = require('../config/siteConfig.json');
const { details : { port, title, host}, publishing: { uploadDirectory }} = siteConfig;
console.log('starting site config:', siteConfig);

inquirer
  .prompt(mysqlQuestions(mysqlDatabase, mysqlUsername, mysqlPassword))
  .then(results => {
      console.log('\nCreating mysql config file...');
      const fileLocation = Path.resolve(__dirname, '../config/mysqlConfig.json');
      const fileContents = JSON.stringify(results, null, 2);
      fs.writeFileSync(fileLocation, fileContents, 'utf-8');
      console.log('Successfully created /config/mysqlConfig.json!\n');
  })
  .then(() => {
    // check for lbrynet connection & retrieve a default address
    console.log('\nRetrieving your primary claim address from LBRY...');
    return axios
      .post('http://localhost:5279', {
        method: 'wallet_list',
      })
      .then(response => {
        if (response.data) {

          if (response.data.error){
            throw new Error(response.data.error.message);
          }

          primaryClaimAddress = response.data.result[0];
          console.log('Primary claim address:', primaryClaimAddress, '!\n');
          return;
        }
        throw new Error('No data received from lbrynet');
      }).catch(error => {
        throw error;
      })
  })
  .then(() => {
    console.log('\nCreating a LBRY channel to publish your thumbnails to...');
    // exit if a channel already exists
    const { publishing } = siteConfig;
    if (publishing.thumbnailChannel) {
      console.log(`Found existing channel ${publishing.thumbnailChannel}#${publishing.thumbnailChannelId}\n`);
      return;
    }
    // create thumbnail address
    return axios
      .post('http://localhost:5279', {
        method: 'channel_new',
        params: {
          channel_name : thumbnailChannel,
          amount       : 0.1,
        },
      })
      .then(response => {
        if (response.data) {

          if (response.data.error){
            throw new Error(response.data.error.message);
          }

          thumbnailChannelId = response.data.result.claim_id;
          siteConfig['publishing']['thumbnailChannel'] = thumbnailChannel;
          siteConfig['publishing']['thumbnailChannelId'] = thumbnailChannelId;
          console.log(`Created channel: ${thumbnailChannel}#${thumbnailChannelId}\n`);
          return;
        }
        throw new Error('No data received from lbrynet');
      }).catch(error => {
        throw error
      })
  })
  .then(() => {
      return inquirer.prompt(siteQuestions(port, title, host, uploadDirectory));
  })
  .then(results => {
    console.log('\nCreating site config file...');
    siteConfig['details']['port'] = results.port;
    siteConfig['details']['title'] = results.title;
    siteConfig['details']['host'] = results.host;
    siteConfig['publishing']['uploadDirectory'] = results.uploadDirectory;
    const fileLocation = Path.resolve(__dirname, '../config/siteConfig.json');
    const fileContents = JSON.stringify(siteConfig, null, 2);
    fs.writeFileSync(fileLocation, fileContents, 'utf-8');
    console.log('Successfully created /config/siteConfig.json\n');
  })
  .then(() => {
      console.log('\nYou\'re all done!  Next step: run "npm run start:dev" to start your server!');
      console.log('If you want to change any settings, you can edit the files in the "/config" folder.\n');
      process.exit(0);
  })
  .catch(error => {
      console.log(error);
      process.exit(1);
  });
