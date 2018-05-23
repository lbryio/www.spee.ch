Create Your Own Spee.ch!
========================

 **__1. Prerequisites__**
* You will need the following tools installed:
	* Node (v8 LTS).
Make sure you install from the **Node** website [link](https://nodejs.org/en/download/).
	* npm (should come installed with Node).
	* Git
	* Curl
	* Tmux
	* Unzip

* Make sure **npm** is up-to-date.
`$ npm update`
* Setup a Webserver to serve **Spee.ch** from Port **3000**.
	* If you are using a server provided by **lbry**, we will have **caddy** installed already.
	* If you are using your own server, make sure to have a web server installed and set up to serve from port **3000**.
		* Nginx instructions (recommended).
				* Insert directions for certbot before installing.
				* Install [Nginx](http://nginx.org/en/docs/install.html).
				* Create a config file called `spee.ch` in */etc/nginx/sites-available*
					* Example [config file](https://github.com/lbryio/www.spee.ch/blob/master/nginx_example_config).
				* Rename all mentions of *sub.domain.com* with your subdomain name.

		* Run this command to link the sites-available.
`$ ln -s /etc/nginx/sites-available/speech /etc/nginx/sites-enabled/speech`
		* Restart Nginx.
`$ sudo service nginx restart`
		* Try visiting your website.  
				* If Nginx is working, you should get a **502** error because there is nothing running on **3000** yet.  
				* If you get the default Nginx greeting, you have not properly configured it to serve from port **3000**.
				* You can find logs in */var/log/nginx/* too.
	*  Caddy tutorial: [https://caddyserver.com/tutorial](https://caddyserver.com/tutorial)
* MySql.
	* Install MySql - [Instructions](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en).
	* Create user **root**.
		* Note: We are going to access **mysql** as **root** for this setup, but you may want to create a separate user in the future.
		* Keep your password somewhere handy!
	* Create a database called **lbry** and make sure you can use it.
	`CREATE DATABASE lbry;`
	`$ USE lbry;`
	`$ exit; (or press ‘ctl + d’)`

	* Try logging into mysql.
	`$ mysql -u username -p`
		* If you are using a **LBRY** server, your **password** is the one provided for **ssh**.
		* Note: If it fails, try using `sudo`.
**__2.  Install & Run the LBRY Daemon__**
* Install **lbrynet** (note: if you have a server from LBRY, lbrynet is already installed, you can skip to 2.4.
`$ wget --quiet -O ~/latest_daemon.zip https://lbry.io/get/lbrynet.linux.zip`
`$ unzip -o -u "~/latest_daemon.zip"`
* Start lbrynet
`$ tmux`
`$ ./lbrynet-daemon`
* Detach (exit) the tmux session and leave **lbrynet** running in the background.
	* press **ctrl + b** then **d** to detach.
* Make sure lbrynet is running.
	* On one of the LBRY servers:
	`$ sudo service lbrynet status`
	
* Get LBC!
	* Get a list of your wallets.
`$ /opt/lbry/lbrynet-cli wallet_list`

		Or use the following command, if you installed lbrynet yourself.
`$ ~/lbrynet-cli wallet_list`
	* Put one of the addresses into chat and we will send you some **LBC**.
	* Check your balance again.
	`$ /opt/lbry/lbrynet-cli wallet_balance`

		Or use the following command, if you installed **lbrynet** yourself.
	`$ ~/lbrynet-cli wallet_balance`
	
* You should have **LBC**!

**__3.  Set up Spee.ch__**

* Clone the [www.spee.ch](http://www.spee.ch) repo with a name of your choosing.
`$ git clone https://github.com/lbryio/www.spee.ch.git <name-of-your-folder>`
or
`$ git clone https://github.com/lbryio/www.spee.ch.git`
* Change directory into your site’s folder.
`$ cd <name-of-your-site>` or `$ cd www.spee.ch`

* Install dependencies.
`$ npm install`

* Run the config cli.
Note: make sure lbrynet is running.
`$ npm run configure`

Note: If you are using a **LBRY** server, your mysql **username** is `root` and your **password** is the one provided for **SSH**.

* Check your site configs .
`$ cd config/`
`$ nano siteConfig.json`

	* Under publishing, make sure there is a **value** in `primaryClaimAddress` other than `null`,
```json
"publishing": {
"primaryClaimAddress": "xxxxxxxxxxxxxxxx",
"uploadDirectory": "/home/lbry/Uploads",
"thumbnailChannel": "@thumbnails",
"thumbnailChannelId": "xxxxxxxxxxxxxxxx",
"additionalClaimAddresses": [],
"disabled": false,
"disabledMessage": "Default publishing disabled message"
}
``` 	
* 
	*  If you want to make any other changes to your site, you can do so here, or in the other **.json config files** in this folder!

* Build & run

	* Run the below command to transpile, build, and start your server.
`$ npm run start:dev`
**Note:** if you had to use `sudo` to login to **mysql** above, you may have issues with this step.

	* Spee.ch should now be running.* 
	* Visit your site in the browser. Try publishing an image!

* Change some **css**

	* Navigate to *public/assets/css* folder and open **general.css** for editing.
`$ cd public/assets/css`
`$ nano general.css`

	* Add `background-color: yellow;` to the `html, body` declaration.
```css
html, body {
margin: 0;
padding: 0;
height: 100%;
word-wrap: break-word;
background-color: yellow;
}
```
* 
	* Restart the server, and you should see your site with a yellow background!    
`$ npm run start:dev`

* Update the custom **About** Page component
	* Most of the components used by [www.spee.ch](http://www.spee.ch) are taken from the spee.ch-components repo, but you can override those components by defining your own locally. As part of the [www.spee.ch](http://www.spee.ch) repo, a local custom **About** page is already included. You can edit the contents of this component in the *src/views/pages/* folder.
	`$ cd src/views/pages/AboutPage`
	`$ nano index.jsx`

	* Change the text, or edit the **HTML** however you like.
	* Restart the server, and you should see your site with an updated **About** page!
	`$ npm run start:dev`

* Add a new custom Logo component.

	* To create your own custom component to override the defaults, create a folder and **index.jsx** file for the component in the *src/views/components* folder.
	
		`$ cd src/views/components`
		`$ mkdir Logo`
		`$ cd Logo`
		`$ touch index.jsx`
		`$ nano index.jsx`

	* Create a simple react component in **index.jsx**.
```js
import React from 'react';
function Logo () {
return (
<p>My Logo</p>
);
};
export default Logo;
```
* 
	* Restart the server, and you should see your site with a new Logo in the top left corner!
`$ npm run start:dev`

**__4. Bonus:__**
    
* [Install PM2](http://pm2.keymetrics.io/docs/usage/quick-start/) and run your server with PM2.
    
* Install PM2.
`$ sudo npm i -g pm2`

* From inside your project’s folder, start your server with PM2.
`$ pm2 start server.js`
	* Visit your site and see if it is running!

* Sync Your Spee.ch Instance with the full **Blockchain**

	* Install **lbrycrdd**.
	*  Install **lbry-decoder**.
	* Start **lbry-decoder**.
	* Install & run [spee.ch-sync](https://github.com/billbitt/spee.ch-sync)
	* Configure **spee.ch-sync**.
