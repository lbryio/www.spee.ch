# www.spee.ch

## About
`www.spee.ch` is an implementation of the [spee.ch-server](https://github.com/lbryio/spee.ch#speech-as-a-package).
The goal of this project is to provide an example of how you can import and configure spee.ch to quickly and easily create your own spee.ch-like website.  

## Installation

0.a. configure config files in `config/`

  * create `mysqlConfig.js` from `mysqlConfig.js.example` 
  * create `siteConfig.js` from `siteConfig.js.example` 
  * create `slackConfig.js` from `slackConfig.js.example`
  
0.b. update the site defaults (optional)

  * create custom components by creating React components in `custom/` (instructions tbd)
  * update the css by changing the files in `public/assets/css/` 

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
