# www.spee.ch

## About

Spee.ch is a web app that reads and publishes images and videos to and from the [LBRY](https://lbry.io/) blockchain.

`www.spee.ch` uses the [spee.ch](https://github.com/lbryio/spee.ch) server codebase, and it also uses the [spee.ch-components](http://github.com/lbryio/spee.ch-components) library.
The goal of this project is to provide an example of how you can import and configure spee.ch to quickly and easily create your own spee.ch-like website.

## Stack

The spee.ch stack is MySQL, Express.js, Node.js, and React.js.  Spee.ch also runs `lbrynet` on its server, and it uses the `lbrynet` api to make requests -- such as `publish`, `create_channel`, and `get` -- on the `LBRY` network.
  
Spee.ch also runs a sync tool, which decodes blocks from the `LBRY` blockchain as they are mined, and stores the information in mysql.  It stores all claims in the `Claims` table, and all channel claims in the `Certificates` table.

## Quick start

### Preparing your environment

Start mysql

  * install mysql if needed
  * create a database
  * save the `database`, `username`, and `password` someplace handy
  
Start lbry

  * install the [`lbry`](https://github.com/lbryio/lbry) daemon
  * start the `lbry` daemon
  * retrieve an address from the daemon and send your wallet a couple credits (or join us in the [#speech discord channel](https://discord.gg/YjYbwhS) and we will send you a few)
  
Clone this repo
```
$ git clone https://github.com/lbryio/www.spee.ch.git <name of your project>
```

Configure your project

```
$ cd <name of your project>
$ npm run configure
```
  
(optional) add custom components and update the styles

  * create custom components by creating React components in `src/views/` (further instructions coming soon)
  * update the css by changing the files in `public/assets/css/` (further instructions and refactor coming soon) 

### Starting the app

install dependencies
```
npm install
```
build & start server
```
npm run start:dev
```
visit [localhost:3000](http://localhost:3000) in your browser

have fun

### Syncing the blockchain
Start the `spee.ch-sync` tool available at [billbitt/spee.ch-sync](https://github.com/billbitt/spee.ch-sync)

This is not necessary, but highly reccomended.  It will decode the blocks of the `LBRY` blockchain and add the claims information to your database's tables
