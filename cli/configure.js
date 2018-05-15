const inquirer = require('inquirer');
const fs = require('fs');
const Path = require('path');
const axios = require('axios');

const loggerQuestions = require(Path.resolve(__dirname, 'questions/loggerQuestions.js'));
const mysqlQuestions = require(Path.resolve(__dirname, 'questions/mysqlQuestions.js'));
const siteQuestions = require(Path.resolve(__dirname, 'questions/siteQuestions.js'));
const slackQuestions = require(Path.resolve(__dirname, 'questions/slackQuestions.js'));

let primaryClaimAddress = '';
let thumbnailChannel = '@thumbnails';
let thumbnailChannelId = '';

inquirer
  .prompt(loggerQuestions)
  .then(results => {
      const fileLocation = Path.resolve(__dirname, '../config/loggerConfig.json');
      const fileContents = JSON.stringify(results, null, 2);
      fs.writeFileSync(fileLocation, fileContents, 'utf-8');
  })
  .then(() => {
      return inquirer.prompt(mysqlQuestions);
  })
  .then(results => {
      const fileLocation = Path.resolve(__dirname, '../config/mysqlConfig.json');
      const fileContents = JSON.stringify(results, null, 2);
      fs.writeFileSync(fileLocation, fileContents, 'utf-8');
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
          primaryClaimAddress = response.data.result[0];
          console.log('Primary claim address:', primaryClaimAddress);
          return;
        }
        throw new Error('No data received from lbrynet');
      }).catch(error => {
        throw new Error(`Error received from lbrynet.  Please start lbry and try again. Error: ${error}`);
      })
  })
  .then(() => {
    // create thumbnail address
    console.log('\nCreating a LBRY channel to publish your thumbnails to (this may take a minute)...');
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
          thumbnailChannelId = response.data.result.claim_id;
          console.log(`Created channel: ${thumbnailChannel}#${thumbnailChannelId}\n`);
          return;
        }
        throw new Error('No data received from lbrynet');
      }).catch(error => {
        throw new Error(`Error received from lbrynet.  Please start lbry and try again. Error: ${error}`);
      })
  })
  .then(() => {
      return inquirer.prompt(siteQuestions);
  })
  .then(results => {
      let siteResponses;
      siteResponses = {
          analytics: {
              googleId: results.googleId,
          },
          assetDefaults: {
              title      : results.defaultAssetTitle,
              description: results.defaultAssetDescription,
              thumbnail  : results.defaultAssetThumbnail,
          },
          auth: {
              sessionKey: results.sessionKey,
          },
          details: {
              port       : results.port,
              title      : results.title,
              host       : results.host,
              description: results.description,
              twitter    : results.twitter,
          },
          publishing: {
              primaryClaimAddress,
              uploadDirectory         : results.uploadDirectory,
              thumbnailChannel,
              thumbnailChannelId,
              additionalClaimAddresses: [],
              disabled                : false,
              disabledMessage         : 'Please check back soon',
          },
      };
      const fileLocation = Path.resolve(__dirname, '../config/siteConfig.json');
      const fileContents = JSON.stringify(siteResponses, null, 2);
      fs.writeFileSync(fileLocation, fileContents, 'utf-8');
  })
  .then(() => {
      return inquirer.prompt(slackQuestions);
  })
  .then(results => {
      const fileLocation = Path.resolve(__dirname, '../config/slackConfig.json');
      const fileContents = JSON.stringify(results, null, 2);
      fs.writeFileSync(fileLocation, fileContents, 'utf-8');
  })
  .then(() => {
      console.log('All done!');
      process.exit(0);
  })
  .catch(error => {
      console.log(error);
      process.exit(1);
  });
