/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// require the spee.ch package
var Speech = __webpack_require__(3);

// get the local configs

var _require = __webpack_require__(4),
    mysqlConfig = _require.mysqlConfig,
    siteConfig = _require.siteConfig,
    slackConfig = _require.slackConfig;

try {
    // create a new spee.ch server
    var server = new Speech.Server();
    // configure server
    server.configureMysql(mysqlConfig);
    server.configureSite(siteConfig);
    server.configureSlack(slackConfig);
    // initialize (creates the express app and configures it)
    server.initialize();
    // start the server (syncs db and starts server listening on configured port)
    server.start();
} catch (error) {
    console.log('spee.ch server startup error:', error);
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("spee.ch");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mysqlConfig = __webpack_require__(5);
var siteConfig = __webpack_require__(6);
var slackConfig = __webpack_require__(7);

module.exports = {
    mysqlConfig: mysqlConfig,
    siteConfig: siteConfig,
    slackConfig: slackConfig
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    database: 'lbry',
    username: 'lbry',
    password: 'yYa5B6f7WuGq1613q9D7UWP3HT'
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    analytics: {
        googleId: 'UA-60403362-6'
    },
    assetDefaults: {
        title: 'something cool',
        thumbnail: 'https://spee.ch/assets/img/video_thumb_default.png',
        description: 'this cool thing is brought to you by www.spee.ch'
    },
    auth: {
        sessionKey: 'n$a1n#sl1jas1df23'
    },
    details: {
        port: 3000,
        title: 'www.Spee.ch',
        host: 'https://dev1.spee.ch',
        description: 'www.spee.ch running on dev1.spee.ch'
    },
    componentsConfig: {
        components: {},
        containers: {},
        pages: {}
    },
    publishing: {
        additionalClaimAddresses: ['banpwixPosfVDWnGvXqU2af36Qpsd7buGd'],
        disabled: false,
        disabledMessage: 'Please check back soon or join our discord channel for updates.',
        primaryClaimAddress: 'bDZ2wPwtULUGxT7GXuNLpQhXmdPRUTUkcL',
        thumbnailChannel: '@stuffff',
        thumbnailChannelId: 'idk',
        uploadDirectory: '/home/lbry/Uploads'
    }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  slackWebHook: null,
  slackErrorChannel: null,
  slackInfoChannel: null
};

/***/ })
/******/ ]);