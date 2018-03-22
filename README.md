# www.spee.ch

## about
`www.spee.ch` is an implementation of the [spee.ch package](https://github.com/lbryio/spee.ch#speech-as-a-package).
This is the code base that is running on [staging.spee.ch](https://staging.spee.ch).  You can run your own version of spee.ch by importing the [spee.ch package](https://github.com/lbryio/spee.ch#speech-as-a-package) and passing it your own custom components.

## installation
0. create files in `config/`

  * create `mysqlConfig.js` from `mysqlConfig.js.example` and fill in the variables
  * create `siteConfig.js` from `siteConfig.js.example` and fill in the variables
  * create `slackConfig.js` from `slackConfig.js.example` and fill in the variables

1. install dependencies
```
npm install
```
2. build the server
```
npm run build
```
3. start the server
```
npm run start
```
