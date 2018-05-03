const inquirer = require('inquirer');
const fs = require('fs');
const Path = require('path');

const loggerQuestions = require(Path.resolve(__dirname, 'questions/loggerQuestions.js'));
const mysqlQuestions = require(Path.resolve(__dirname, 'questions/mysqlQuestions.js'));
const siteQuestions = require(Path.resolve(__dirname, 'questions/siteQuestions.js'));
const slackQuestions = require(Path.resolve(__dirname, 'questions/slackQuestions.js'));

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
                primaryClaimAddress     : results.primaryClaimAddress,
                uploadDirectory         : results.uploadDirectory,
                thumbnailChannel        : results.thumbnailChannel,
                thumbnailChannelId      : results.thumbnailChannelId,
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
