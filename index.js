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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dateFormat = __webpack_require__(4);
// https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script
var reset = '\x1b[0m';
var colorCursor = 1;
var colors = [
    "\x1b[31m",
    "\x1b[32m",
    "\x1b[33m",
    "\x1b[34m",
    "\x1b[35m",
    "\x1b[36m",
    "\x1b[37m",
];
function debug(namespace) {
    var ns = namespace;
    while (ns.length < 30) {
        ns = ' ' + ns;
    }
    var color = colors[colorCursor++ % colors.length];
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = new Date();
        var date = dateFormat(now, 'yyyy-mm-dd hh:MM:ss TT l');
        var consoleArgs = ['\x1b[2m', date, reset, color, ns, reset];
        consoleArgs = consoleArgs.concat(args);
        console.log.apply(null, consoleArgs);
    };
}
exports.default = function (namespace) {
    return debug(namespace);
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var condition_1 = __webpack_require__(2);
var logger_1 = __webpack_require__(0);
var midi = __webpack_require__(5);
var log = logger_1.default('app');
var express = __webpack_require__(6);
var app = express();
var server = __webpack_require__(7).createServer(app);
var io = __webpack_require__(8)(server);
app.use(express.static('public'));
var connectedCondition = new condition_1.default('connected', false);
connectedCondition.on('change', function (val) {
    io.emit('set-connection', val);
});
var socket = __webpack_require__(9)('http://192.168.1.113:3000');
// Set up a new output. 
var output = new midi.output();
function openMidiPort() {
    try {
        output.openPort(0);
        log('Opened midi port');
    }
    catch (er) {
        log('Failed to open midi port. Trying again in 5 seconds...');
        setTimeout(function () {
            openMidiPort();
        }, 5000);
    }
}
;
socket
    .on('connect', function () {
    connectedCondition.set(true);
})
    .on('disconnect', function () {
    connectedCondition.set(false);
})
    .on('midi', function (data) {
    var msg = [
        data.type,
        data.channel,
        data.velocity,
    ];
    output.sendMessage(msg);
    log("output: " + msg.join(', '));
    io.emit('note-received', data);
});
var port = 3002;
server.listen(port);
var os = __webpack_require__(10);
var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}
var ip = addresses[0];
log("Listening on http://" + ip + ":" + port);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var emitter_1 = __webpack_require__(3);
var logger_1 = __webpack_require__(0);
var Condition = /** @class */ (function (_super) {
    __extends(Condition, _super);
    function Condition(label, initialState, rules) {
        var _this = _super.call(this) || this;
        _this.label = label;
        _this.state = initialState;
        _this.log = logger_1.default("app.condition." + label);
        _this.log('initial: ', _this.state);
        _this.on('change', function (state) {
            _this.log("changed to " + state);
        });
        if (rules !== undefined) {
            rules.call(null, _this);
        }
        return _this;
    }
    Condition.prototype.set = function (state) {
        if (state !== this.state) {
            this.state = state;
            this.emit('change', this.state);
            this.emit(this.state ? 'activate' : 'deactivate');
        }
        return this;
    };
    Condition.prototype.get = function () {
        return this.state;
    };
    Condition.prototype.toggle = function () {
        return this.set(!this.state);
    };
    Condition.prototype.on = function (event, cb) {
        return _super.prototype.on.call(this, event, cb);
    };
    Condition.prototype.off = function (event) {
        return _super.prototype.off.call(this, event);
    };
    return Condition;
}(emitter_1.default));
exports.default = Condition;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Emiter = /** @class */ (function () {
    function Emiter() {
        this._callbacks = {};
    }
    Emiter.prototype.on = function (ev, cb) {
        if (!(ev in this._callbacks)) {
            this._callbacks[ev] = [];
        }
        this._callbacks[ev].push(cb);
        return this;
    };
    Emiter.prototype.off = function (ev) {
        if (ev === undefined) {
            this._callbacks = {};
        }
        else {
            if (ev in this._callbacks) {
                delete this._callbacks[ev];
            }
        }
        return this;
    };
    Emiter.prototype.emit = function (ev) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (ev in this._callbacks) {
            this._callbacks[ev].forEach(function (cb) {
                cb.apply(_this, args);
            });
        }
        return this;
    };
    return Emiter;
}());
exports.default = Emiter;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("dateformat");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("midi");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("socket.io-client");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ })
/******/ ]);