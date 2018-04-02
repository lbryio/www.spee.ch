# billbitt.spee.ch

## about
`billbitt.spee.ch` is an implementation of the [spee.ch package](https://github.com/lbryio/spee.ch#speech-as-a-package).
The goal of this project is to provide an example of how you can import and configure spee.ch to quickly and easily create your own spee.ch-like website.  

## installation

0. configure config files in `config/`

  * create `mysqlConfig.js` from `mysqlConfig.js.example` 
  * create `siteConfig.js` from `siteConfig.js.example` 
  * create `slackConfig.js` from `slackConfig.js.example`

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
