# www.spee.ch

## About

Spee.ch is a web app that reads and publishes images and videos to and from the [LBRY](https://lbry.io/) blockchain.

`www.spee.ch` uses the [spee.ch](https://github.com/lbryio/spee.ch) server codebase, and it also uses the [spee.ch-components](http://github.com/lbryio/spee.ch-components) library.
The goal of this project is to provide an example of how you can import and configure spee.ch to quickly and easily create your own spee.ch-like website.

## Stack

The spee.ch stack is MySQL, Express.js, Node.js, and React.js.  Spee.ch also runs `lbrynet` on its server, and it uses the `lbrynet` api to make requests -- such as `publish`, `create_channel`, and `get` -- on the `LBRY` network.
  
Spee.ch also runs a sync tool, which decodes blocks from the `LBRY` blockchain as they are mined, and stores the information in mysql.  It stores all claims in the `Claims` table, and all channel claims in the `Certificates` table.

## Quick start

### preparing your environment and app

start mysql

  * install mysql if needed
  * create a database
  * save the `database`, `username`, and `password` someplace handy
  
start lbry

  * install the [`lbry`](https://github.com/lbryio/lbry) daemon
  * start the `lbry` daemon

Clone this rep
```
git clone https://github.com/lbryio/www.spee.ch.git
```

configure config files in `config/`

  * create `mysqlConfig.js` from `mysqlConfig.js.example` 
      * enter the mysql database and credentials created above
  * create `siteConfig.js` from `siteConfig.js.example` 
      * note: you will need to enter a wallet address, which can be retried from your `lbry` daemon
  * create `slackConfig.js` from `slackConfig.js.example`
  
(optional) add custom components and styles

  * create custom components by creating React components in `custom/` (further instructions coming soon)
  * update the css by changing the files in `public/assets/css/` (further instructions and refactor coming soon) 

### starting the app

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
