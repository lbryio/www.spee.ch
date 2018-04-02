# www.spee.ch

## About

Spee.ch is a web app that reads and publishes images and videos to and from the [LBRY](https://lbry.io/) blockchain.

`www.spee.ch` is an implementation of the [spee.ch-server](https://github.com/lbryio/spee.ch#speech-as-a-package).
The goal of this project is to provide an example of how you can import and configure spee.ch to quickly and easily create your own spee.ch-like website.  

## Installation

(0.0) configure config files in `config/`

  * create `mysqlConfig.js` from `mysqlConfig.js.example` 
  * create `siteConfig.js` from `siteConfig.js.example` 
  * create `slackConfig.js` from `slackConfig.js.example`
  
(0.1) update the site defaults (optional)

  * create custom components by creating React components in `custom/` (further instructions coming soon)
  * update the css by changing the files in `public/assets/css/` 

(0.2) start mysql

  * install mysql
  * create a database called `lbry`
  * save your connection `username` and `password` someplace handy

(0.3) start lbrynet daemon

  * install the [`lbry`](https://github.com/lbryio/lbry) daemon
  * start the `lbry` daemon

(1) install dependencies
```
npm install
```
(2) build the server
```
npm run build
```
(3) start the server
```
npm run start
```
(4) visit [localhost:3000](http://localhost:3000)

(5) have fun
