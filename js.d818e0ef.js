// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/lib/Utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Utils {
  constructor() {
    this.log = this.createLog();
  }

  *splitNParts(num, parts) {
    let sumParts = 0;

    for (let i = 0; i < parts - 1; i++) {
      const pn = Math.ceil(Math.random() * (num - sumParts));
      yield pn;
      sumParts += pn;
    }

    yield num - sumParts;
  }

  createLog() {
    let n = 0;
    return (msg, obj = {}, color = null) => {
      if (msg instanceof Error) {
        console.error("".concat(new Date().toISOString(), "-LOG-#").concat(++n, " => ").concat(msg), obj);
        return false;
      }

      console.log("%c".concat(new Date().toISOString(), "-LOG-#").concat(++n, " => ").concat(msg), "".concat(color ? 'color:' + color : ''), obj);
      return true;
    };
  }

  deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  deepClone() {}

  shallowClone() {}

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async wait(ms) {
    return await Promise.all([this.timeout(ms / 2)], [this.timeout(ms / 2)]);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  genRandomToken() {
    return function gen(n, tArr) {
      if (n === 5) return tArr;
      tArr.push(Math.random().toString(36).substring(2, 15));
      return gen(++n, tArr);
    }(0, []).join('');
  }

}

var _default = new Utils();

exports.default = _default;
},{}],"src/js/lib/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$colors = exports.$GBP = exports.$CRYPTO = exports.$x = exports.keys = exports.$a = exports.$q = exports.$i = void 0;

var _Utils = _interopRequireDefault(require("./Utils.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $i = element => document.getElementById(element);

exports.$i = $i;

const $q = element => document.querySelector(element);

exports.$q = $q;

const $a = element => document.querySelectorAll(element);

exports.$a = $a;
const $colors = {
  grey: '#696969',
  limegreen: '#bada55',
  lightblue: '#7fe5f0',
  brightred: '#ff0000',
  pink: '#ff80ed',
  seablue: '#407294',
  beige: '#cbcba9',
  white: '#ffffff',
  maroon: '#420420',
  grassgreen: '#065535',
  lightgrey: '#c0c0c0',
  yellow: '#ffd700',
  orange: '#ffa500',
  darkred: '#800000',
  limegreen: '#00ff00'
};
exports.$colors = $colors;
const $CRYPTO = {
  BTC: 'BTC',
  DIVI: 'DIVI',
  NANO: 'NANO',
  DOGE: 'DOGE',
  ETH: 'ETH',
  RIPPLE: 'RIPPLE'
};
exports.$CRYPTO = $CRYPTO;
const SATOSHI_BTC = 0.00000001;
const BTC_SATOSHI = 100000000;
const ETH_SATOSHI = 3457271.83;
const GBP_SATOSHI = 11467.22;
const DIVI_SATOSHI = 540.00;
const RIPPLE_SATOSHI = 2794.53;
const DOGE_SATOSHI = 29.78;
const NANO_SATOSHI = 9039.78; // 1 Satoshi in Crypto

const $SATOSHI = {
  BTC: 0.00000001,
  ETH: 0.00000033,
  GBP: 0.00007498,
  DIVI: 0.00186219739,
  RIPPLE: 0.00038700,
  DOGE: 0.03333,
  NANO: 0.00009557
};
const $GBP = {
  BTC: 0.00012,
  ETH: 0.0033,
  DIVI: 0.927533,
  RIPPLE: 4.432083,
  DOGE: 411.248727,
  NANO: 1.257049
};
exports.$GBP = $GBP;
let keys = {
  $eventKey: {
    STATE_CHANGE: 'stateChange',
    CRYPTO_BOUGHT: 'cryptoBought',
    STASH_CHANGED: 'stashChanged',
    TRENCH_COAT_CHANGED: 'trenchCoatChanged',
    WALLET_CHANGED: 'walletChanged'
  },
  $actionKey: {},
  $mutationKey: {}
};
exports.keys = keys;

(() => {
  let keysToMap = [];
  Object.keys(keys).forEach($keyType => {
    Object.keys(keys[$keyType]).map(k => {
      if (keysToMap.includes({
        [k]: keys[$keyType][k]
      })) return;
      return keysToMap.push(new Object({
        [k]: keys[$keyType][k]
      }));
    });
  });
  keysToMap.forEach((el, i, arr) => {
    keys.$actionKey[Object.keys(el)[0]] = Object.values(el)[0];
    keys.$mutationKey[Object.keys(el)[0]] = Object.values(el)[0];
  });
  return void 0;
})();

const $k = [];

(function gen(n) {
  if (n > 0) {
    $k.push(_Utils.default.genRandomToken());
    return gen(--n);
  }

  return false;
})(20);

const $x = (() => $k[_Utils.default.getRandomInt(0, Object.keys($k).length - 1)])();

exports.$x = $x;

_Utils.default.log('keys:', keys, $colors.orange);

_Utils.default.log('x-token:', $x, $colors.grassgreen);
},{"./Utils.js":"src/js/lib/Utils.js"}],"src/js/state/Store.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Store {
  constructor({
    actions,
    mutations,
    state,
    events
  }) {
    const self = this;
    self.actions = actions;
    self.mutations = mutations;
    self.events = events;
    self.previousStateCache = {};
    self.state = new Proxy(state || {}, {
      set: function (state, key, value) {
        state[key] = value;
        self.previousStateCache[key] = value;
        console.log("".concat($eventKey.STATE_CHANGE, ": ").concat(key, ":"), value);
        self.events.publish($eventKey.STATE_CHANGE);
        return true;
      }
    });
  }

  dispatch(actionKey, payload) {
    if (typeof this.actions[actionKey] !== 'function') {
      console.warn("".concat(actionKey, " is not a registered action"));
      return false;
    }

    console.groupCollapsed("ACTION: ".concat(actionKey, " ").concat(Date.now()));
    this.actions[actionKey](this, payload);
    console.groupEnd();
    return true;
  }

  commit(mutationKey, payload) {
    if (typeof this.mutations[mutationKey] !== 'function') {
      console.warn("".concat(this.mutations[mutationKey], " is not a registered mutation"));
      return false;
    }

    console.groupCollapsed("MUTATION: ".concat(mutationKey, " ").concat(Date.now()));
    const newState = this.mutations[mutationKey](this.state, payload);
    this.state = Object.assign(this.state, newState);
    console.groupEnd();
    return true;
  }

}

exports.default = Store;
},{}],"src/js/models/Crypto.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nano = exports.Ripple = exports.Doge = exports.Ethereum = exports.Divi = exports.BTC = exports.cryptoMaker = exports.walletMaker = exports.Crypto = exports.CryptoConverter = void 0;

var _Store = _interopRequireDefault(require("../state/Store.js"));

var _constants = require("../lib/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CryptoConverter {
  constructor() {
    _defineProperty(this, "fiatToCrypto", (val, crypto) => val * _constants.$GBP[crypto]);

    _defineProperty(this, "cryptoToFiat", (val, crypto) => val / _constants.$GBP[crypto]);
  }

}

exports.CryptoConverter = CryptoConverter;

class Crypto {
  constructor(props) {
    if (props.hasOwnProperty('name') && props.hasOwnProperty('fiatVal') && props.store instanceof _Store.default) {
      this.name = props.name;
      this.store = props.store;
      props.store.events.subscribe(_constants.keys.$eventKey.CRYPTO_BOUGHT, props => console.log("".concat(props.name, " bought!")));
    } else {
      throw new TypeError('Invalid Crypto constructor props');
    }

    this.convert = new CryptoConverter();
    this.cryptoValue = this.convert.fiatToCrypto(props.fiatVal, this.name);
    this.fiatValue = this.convert.cryptoToFiat(this.cryptoValue, this.name);
  }

  convertTo(crypto, previousCrypto) {
    setTimeout(() => this.destroyCryptoInstance(previousCrypto), 0);

    switch (crypto) {
      case _constants.$CRYPTO.BTC:
        return new BTC(this.fiatValue, this.store);

      case _constants.$CRYPTO.DIVI:
        return new Divi(this.fiatValue, this.store);

      case _constants.$CRYPTO.ETH:
        return new Ethereum(this.fiatValue, this.store);

      case _constants.$CRYPTO.DOGE:
        return new Doge(this.fiatValue, this.store);

      case _constants.$CRYPTO.RIPPLE:
        return new Ripple(this.fiatValue, this.store);

      case _constants.$CRYPTO.NANO:
        return new Nano(this.fiatValue, this.store);

      default:
        throw new Error('Invalid crypto type');
    }
  }

  destroyCryptoInstance(previousCrypto) {
    Object.keys(previousCrypto).forEach(key => delete previousCrypto[key]);
  }

}

exports.Crypto = Crypto;

const walletMaker = () => {
  return {
    [_constants.$CRYPTO.BTC]: null,
    [_constants.$CRYPTO.DIVI]: null,
    [_constants.$CRYPTO.DOGE]: null,
    [_constants.$CRYPTO.ETH]: null,
    [_constants.$CRYPTO.NANO]: null,
    [_constants.$CRYPTO.RIPPLE]: null
  };
};

exports.walletMaker = walletMaker;

const cryptoMaker = store => {
  return {
    [_constants.$CRYPTO.BTC]: amount => new BTC(amount, store),
    [_constants.$CRYPTO.DIVI]: amount => new Divi(amount, store),
    [_constants.$CRYPTO.DOGE]: amount => new Doge(amount, store),
    [_constants.$CRYPTO.ETH]: amount => new Ethereum(amount, store),
    [_constants.$CRYPTO.NANO]: amount => new Nano(amount, store),
    [_constants.$CRYPTO.RIPPLE]: amount => new Ripple(amount, store)
  };
};

exports.cryptoMaker = cryptoMaker;

class BTC extends Crypto {
  constructor(fiatVal, store) {
    super({
      name: _constants.$CRYPTO.BTC,
      store: store,
      fiatVal: fiatVal
    });
  }

}

exports.BTC = BTC;

class Divi extends Crypto {
  constructor(fiatVal, store) {
    super({
      name: _constants.$CRYPTO.DIVI,
      store: store,
      fiatVal: fiatVal
    });
  }

}

exports.Divi = Divi;

class Ethereum extends Crypto {
  constructor(fiatVal, store) {
    super({
      name: _constants.$CRYPTO.ETH,
      store: store,
      fiatVal: fiatVal
    });
  }

}

exports.Ethereum = Ethereum;

class Doge extends Crypto {
  constructor(fiatVal, store) {
    super({
      name: _constants.$CRYPTO.DOGE,
      store: store,
      fiatVal: fiatVal
    });
  }

}

exports.Doge = Doge;

class Ripple extends Crypto {
  constructor(fiatVal, store) {
    super({
      name: _constants.$CRYPTO.RIPPLE,
      store: store,
      fiatVal: fiatVal
    });
  }

}

exports.Ripple = Ripple;

class Nano extends Crypto {
  constructor(fiatVal, store) {
    super({
      name: _constants.$CRYPTO.NANO,
      store: store,
      fiatVal: fiatVal
    });
  }

}

exports.Nano = Nano;
},{"../state/Store.js":"src/js/state/Store.js","../lib/constants.js":"src/js/lib/constants.js"}],"src/js/lib/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Utils {
  constructor() {
    this.log = this.createLog();
  }

  *splitNParts(num, parts) {
    let sumParts = 0;

    for (let i = 0; i < parts - 1; i++) {
      const pn = Math.ceil(Math.random() * (num - sumParts));
      yield pn;
      sumParts += pn;
    }

    yield num - sumParts;
  }

  createLog() {
    let n = 0;
    return (msg, obj = {}, color = null) => {
      if (msg instanceof Error) {
        console.error("".concat(new Date().toISOString(), "-LOG-#").concat(++n, " => ").concat(msg), obj);
        return false;
      }

      console.log("%c".concat(new Date().toISOString(), "-LOG-#").concat(++n, " => ").concat(msg), "".concat(color ? 'color:' + color : ''), obj);
      return true;
    };
  }

  deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  deepClone() {}

  shallowClone() {}

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async wait(ms) {
    return await Promise.all([this.timeout(ms / 2)], [this.timeout(ms / 2)]);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  genRandomToken() {
    return function gen(n, tArr) {
      if (n === 5) return tArr;
      tArr.push(Math.random().toString(36).substring(2, 15));
      return gen(++n, tArr);
    }(0, []).join('');
  }

}

var _default = new Utils();

exports.default = _default;
},{}],"src/js/state/actions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Utils = _interopRequireDefault(require("../lib/Utils.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = _Utils.default.log;
var _default = {
  init: function (context, payload) {
    log('App initialising', 'lightblue'); // execute stuff
    // commit stuff

    context.commit('mutationKey', null);
  }
};
exports.default = _default;
},{"../lib/Utils.js":"src/js/lib/Utils.js"}],"src/js/state/mutations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Utils = _interopRequireDefault(require("../lib/Utils.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = _Utils.default.log;
var _default = {
  ex: (state, payload) => {
    // mutate state
    return state;
  }
};
exports.default = _default;
},{"../lib/Utils.js":"src/js/lib/Utils.js"}],"src/js/state/EventManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class EventManager {
  constructor() {
    this.events = [];
  }

  subscribe(event, callback) {
    if (!this.events.hasOwnProperty(event)) {
      this.events[event] = [];
    }

    return this.events[event].push(callback);
  }

  publish(event, data = {}) {
    if (!this.events.hasOwnProperty(event)) {
      throw new Error("EventManager does not have ".concat(event, " subscribed"));
    }

    return this.events[event].map(cb => cb(data));
  }

}

exports.default = EventManager;
},{}],"src/js/components/BaseComponent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Store = _interopRequireDefault(require("../state/Store.js"));

var _constants = require("../lib/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BaseComponent {
  constructor(props) {
    this.render = this.render || function noop() {};

    if (props.store instanceof _Store.default) {
      props.store.events.subscribe(_constants.keys.$eventKey.STATE_CHANGE, () => this.render());
    }

    if (props.hasOwnProperty('element')) {
      this.element = props.element;
    }

    if (props.hasOwnProperty('elements')) {
      this.elements = props.elements;
    }
  }

}

exports.default = BaseComponent;
},{"../state/Store.js":"src/js/state/Store.js","../lib/constants.js":"src/js/lib/constants.js"}],"src/js/components/ExampleComponent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseComponent = _interopRequireDefault(require("./BaseComponent.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ExampleComponent extends _BaseComponent.default {
  constructor(store) {
    super({
      store: store,
      elements: {}
    });
    this.render();
  }

  render() {}

}

exports.default = ExampleComponent;
},{"./BaseComponent.js":"src/js/components/BaseComponent.js"}],"src/js/lib/traders.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  "_id": "5f2929bc4787a62ac070cdd4",
  "index": 0,
  "guid": "edc9e012-34af-4e03-b613-b89867dc921f",
  "isActive": true,
  "balance": "$398,124.14",
  "picture": "http://placehold.it/32x32",
  "age": 35,
  "name": {
    "first": "Roxanne",
    "last": "Rhodes"
  },
  "company": "OVIUM",
  "email": "roxanne.rhodes@ovium.info",
  "phone": "+1 (842) 468-2291",
  "registered": "Saturday, October 10, 2015 12:19 PM",
  "latitude": "-33.274258",
  "longitude": "41.594611"
}, {
  "_id": "5f2929bc50b85990f7c7bf4a",
  "index": 1,
  "guid": "3999ff5a-b75a-4a50-9029-00d9d023bcce",
  "isActive": true,
  "balance": "$95,104.11",
  "picture": "http://placehold.it/32x32",
  "age": 21,
  "name": {
    "first": "Daphne",
    "last": "Cortez"
  },
  "company": "FUTURITY",
  "email": "daphne.cortez@futurity.ca",
  "phone": "+1 (802) 471-3683",
  "registered": "Sunday, February 8, 2015 7:27 PM",
  "latitude": "-51.289291",
  "longitude": "-104.351957"
}, {
  "_id": "5f2929bc6e66110e40a9a10c",
  "index": 2,
  "guid": "471baa75-2887-4e07-b087-c75db9db2da8",
  "isActive": true,
  "balance": "$344,547.47",
  "picture": "http://placehold.it/32x32",
  "age": 29,
  "name": {
    "first": "Rosanne",
    "last": "Bird"
  },
  "company": "HANDSHAKE",
  "email": "rosanne.bird@handshake.us",
  "phone": "+1 (864) 408-3530",
  "registered": "Sunday, May 29, 2016 10:48 PM",
  "latitude": "-20.61406",
  "longitude": "-14.331394"
}, {
  "_id": "5f2929bc475917e7607c1b73",
  "index": 3,
  "guid": "39b2f5d9-bbbe-46a9-8718-ac89d4a0de36",
  "isActive": true,
  "balance": "$338,164.91",
  "picture": "http://placehold.it/32x32",
  "age": 26,
  "name": {
    "first": "Deana",
    "last": "Ellis"
  },
  "company": "EXERTA",
  "email": "deana.ellis@exerta.biz",
  "phone": "+1 (870) 567-2723",
  "registered": "Monday, May 2, 2016 12:50 PM",
  "latitude": "12.452586",
  "longitude": "133.308421"
}, {
  "_id": "5f2929bcf32f0e5eeaa145d1",
  "index": 4,
  "guid": "82925a96-907f-4cd5-97bc-6b2a0ea9d987",
  "isActive": true,
  "balance": "$139,751.50",
  "picture": "http://placehold.it/32x32",
  "age": 23,
  "name": {
    "first": "Mosley",
    "last": "Chase"
  },
  "company": "SCHOOLIO",
  "email": "mosley.chase@schoolio.tv",
  "phone": "+1 (890) 412-3887",
  "registered": "Thursday, June 13, 2019 7:01 PM",
  "latitude": "45.796259",
  "longitude": "-54.830342"
}, {
  "_id": "5f2929bc47865efca446b9c4",
  "index": 5,
  "guid": "ca5d891d-0d9d-4e07-8e21-dfd674f92e3b",
  "isActive": true,
  "balance": "$82,765.60",
  "picture": "http://placehold.it/32x32",
  "age": 25,
  "name": {
    "first": "Addie",
    "last": "Santos"
  },
  "company": "DAYCORE",
  "email": "addie.santos@daycore.co.uk",
  "phone": "+1 (962) 600-3745",
  "registered": "Sunday, February 21, 2016 9:02 PM",
  "latitude": "-85.844672",
  "longitude": "-19.686933"
}, {
  "_id": "5f2929bc802ba257e503554b",
  "index": 6,
  "guid": "2c6ad52a-bc20-42dc-a269-76782b56a0a3",
  "isActive": true,
  "balance": "$348,878.00",
  "picture": "http://placehold.it/32x32",
  "age": 31,
  "name": {
    "first": "Deirdre",
    "last": "Kent"
  },
  "company": "GRUPOLI",
  "email": "deirdre.kent@grupoli.biz",
  "phone": "+1 (825) 495-3027",
  "registered": "Friday, June 10, 2016 6:20 AM",
  "latitude": "85.170664",
  "longitude": "-157.844034"
}, {
  "_id": "5f2929bc4b3e5b3c6c943a12",
  "index": 7,
  "guid": "d2636f64-6703-4dd4-90ea-93222d0333d3",
  "isActive": true,
  "balance": "$178,711.06",
  "picture": "http://placehold.it/32x32",
  "age": 31,
  "name": {
    "first": "Randi",
    "last": "Tate"
  },
  "company": "ORBALIX",
  "email": "randi.tate@orbalix.com",
  "phone": "+1 (982) 435-2449",
  "registered": "Monday, January 22, 2018 10:23 AM",
  "latitude": "77.890781",
  "longitude": "-150.22861"
}, {
  "_id": "5f2929bc8a33bed8a2914066",
  "index": 8,
  "guid": "72791682-6c29-40fa-83e6-13eb5d4ef982",
  "isActive": true,
  "balance": "$335,033.38",
  "picture": "http://placehold.it/32x32",
  "age": 38,
  "name": {
    "first": "Blanche",
    "last": "Short"
  },
  "company": "BEADZZA",
  "email": "blanche.short@beadzza.io",
  "phone": "+1 (863) 408-2957",
  "registered": "Saturday, November 29, 2014 8:15 AM",
  "latitude": "45.972733",
  "longitude": "73.012171"
}, {
  "_id": "5f2929bc7bcdbf1a7f7be373",
  "index": 9,
  "guid": "8076f0a1-b3b1-4a26-8db5-62d3ab2f4c57",
  "isActive": true,
  "balance": "$233,622.49",
  "picture": "http://placehold.it/32x32",
  "age": 25,
  "name": {
    "first": "Stout",
    "last": "Coleman"
  },
  "company": "CINCYR",
  "email": "stout.coleman@cincyr.me",
  "phone": "+1 (981) 479-3918",
  "registered": "Saturday, April 30, 2016 4:07 AM",
  "latitude": "-77.031193",
  "longitude": "178.928676"
}, {
  "_id": "5f2929bc99279c963e816e00",
  "index": 10,
  "guid": "aad17bf5-4e27-4de9-9ce3-6a0ccd20149e",
  "isActive": true,
  "balance": "$319,358.48",
  "picture": "http://placehold.it/32x32",
  "age": 33,
  "name": {
    "first": "Tammy",
    "last": "Soto"
  },
  "company": "MUSIX",
  "email": "tammy.soto@musix.net",
  "phone": "+1 (923) 504-2800",
  "registered": "Saturday, April 5, 2014 3:13 PM",
  "latitude": "55.207262",
  "longitude": "-47.312945"
}, {
  "_id": "5f2929bc97427d18d6d22068",
  "index": 11,
  "guid": "2290459d-17f5-45ff-b9f1-cffdb77e9da7",
  "isActive": true,
  "balance": "$210,327.67",
  "picture": "http://placehold.it/32x32",
  "age": 34,
  "name": {
    "first": "Jodie",
    "last": "Sullivan"
  },
  "company": "ROCKYARD",
  "email": "jodie.sullivan@rockyard.name",
  "phone": "+1 (823) 503-3717",
  "registered": "Sunday, September 6, 2015 3:47 PM",
  "latitude": "-84.936444",
  "longitude": "31.760878"
}, {
  "_id": "5f2929bc289c30457c112b53",
  "index": 12,
  "guid": "8aca72b5-5ba7-4d45-83ff-a9511925e3a3",
  "isActive": true,
  "balance": "$89,160.44",
  "picture": "http://placehold.it/32x32",
  "age": 31,
  "name": {
    "first": "Sheree",
    "last": "Myers"
  },
  "company": "NETILITY",
  "email": "sheree.myers@netility.info",
  "phone": "+1 (841) 558-2772",
  "registered": "Wednesday, May 27, 2015 7:12 PM",
  "latitude": "-56.317585",
  "longitude": "-150.810393"
}, {
  "_id": "5f2929bce1b894a126e25b9a",
  "index": 13,
  "guid": "2fb6dad0-826b-497f-b80f-2be6b135cd8f",
  "isActive": true,
  "balance": "$149,262.41",
  "picture": "http://placehold.it/32x32",
  "age": 31,
  "name": {
    "first": "Keisha",
    "last": "Mcgee"
  },
  "company": "FURNITECH",
  "email": "keisha.mcgee@furnitech.ca",
  "phone": "+1 (902) 421-3817",
  "registered": "Sunday, March 8, 2015 1:01 PM",
  "latitude": "-73.120071",
  "longitude": "-18.160464"
}, {
  "_id": "5f2929bc6766625d5ecc7764",
  "index": 14,
  "guid": "1930ce2f-f96d-4456-b98c-4a4a5884f11e",
  "isActive": true,
  "balance": "$89,400.65",
  "picture": "http://placehold.it/32x32",
  "age": 38,
  "name": {
    "first": "Blake",
    "last": "Barron"
  },
  "company": "SLOGANAUT",
  "email": "blake.barron@sloganaut.us",
  "phone": "+1 (842) 573-2535",
  "registered": "Wednesday, January 23, 2019 8:48 AM",
  "latitude": "-17.107668",
  "longitude": "130.539153"
}, {
  "_id": "5f2929bc004e3bd9952956d3",
  "index": 15,
  "guid": "0dd37b28-ced7-491e-bd42-d349dcbdc454",
  "isActive": true,
  "balance": "$117,027.27",
  "picture": "http://placehold.it/32x32",
  "age": 20,
  "name": {
    "first": "Janine",
    "last": "Briggs"
  },
  "company": "VIRVA",
  "email": "janine.briggs@virva.biz",
  "phone": "+1 (896) 419-3023",
  "registered": "Wednesday, April 30, 2014 4:21 PM",
  "latitude": "57.203254",
  "longitude": "-135.78482"
}, {
  "_id": "5f2929bc1006d25e43d962c7",
  "index": 16,
  "guid": "55464f8f-d6e4-4083-8077-7047a3df1ca3",
  "isActive": true,
  "balance": "$57,181.73",
  "picture": "http://placehold.it/32x32",
  "age": 23,
  "name": {
    "first": "Terry",
    "last": "Newton"
  },
  "company": "TALENDULA",
  "email": "terry.newton@talendula.tv",
  "phone": "+1 (926) 401-3963",
  "registered": "Friday, August 31, 2018 11:28 PM",
  "latitude": "78.521351",
  "longitude": "50.645282"
}, {
  "_id": "5f2929bc42a09d6b5221b3aa",
  "index": 17,
  "guid": "f44cb0b1-e93f-4750-90af-72c81b036f11",
  "isActive": true,
  "balance": "$196,514.92",
  "picture": "http://placehold.it/32x32",
  "age": 37,
  "name": {
    "first": "Mollie",
    "last": "Gallegos"
  },
  "company": "GEEKY",
  "email": "mollie.gallegos@geeky.co.uk",
  "phone": "+1 (811) 583-2276",
  "registered": "Thursday, July 25, 2019 5:45 PM",
  "latitude": "-88.361284",
  "longitude": "15.791456"
}, {
  "_id": "5f2929bcd860dab3c5b408e9",
  "index": 18,
  "guid": "ea239a79-5a8e-48e7-a8c3-03a9ec42c9e5",
  "isActive": true,
  "balance": "$16,262.95",
  "picture": "http://placehold.it/32x32",
  "age": 40,
  "name": {
    "first": "Cantrell",
    "last": "Simpson"
  },
  "company": "TROLLERY",
  "email": "cantrell.simpson@trollery.biz",
  "phone": "+1 (912) 581-3764",
  "registered": "Wednesday, March 22, 2017 8:27 AM",
  "latitude": "79.359027",
  "longitude": "29.052567"
}, {
  "_id": "5f2929bcc859ee3de9bc104b",
  "index": 19,
  "guid": "0720e817-14d6-441c-b447-adc442362c64",
  "isActive": true,
  "balance": "$489,969.52",
  "picture": "http://placehold.it/32x32",
  "age": 39,
  "name": {
    "first": "Veronica",
    "last": "Landry"
  },
  "company": "CYTREX",
  "email": "veronica.landry@cytrex.com",
  "phone": "+1 (843) 520-2800",
  "registered": "Saturday, October 6, 2018 11:28 AM",
  "latitude": "78.345429",
  "longitude": "-2.421796"
}, {
  "_id": "5f2929bcda918ae6db0c88ee",
  "index": 20,
  "guid": "1e98af3c-2607-4672-ab7e-c41c390e27f9",
  "isActive": true,
  "balance": "$174,188.46",
  "picture": "http://placehold.it/32x32",
  "age": 36,
  "name": {
    "first": "Natalie",
    "last": "Garrett"
  },
  "company": "GADTRON",
  "email": "natalie.garrett@gadtron.io",
  "phone": "+1 (897) 492-3848",
  "registered": "Friday, May 29, 2020 8:29 PM",
  "latitude": "89.702556",
  "longitude": "5.631072"
}, {
  "_id": "5f2929bcd5a9899efbef0798",
  "index": 21,
  "guid": "0654b0c1-7366-4966-922a-46ac0f12b4e3",
  "isActive": true,
  "balance": "$407,656.54",
  "picture": "http://placehold.it/32x32",
  "age": 24,
  "name": {
    "first": "Hinton",
    "last": "Lang"
  },
  "company": "NORSUP",
  "email": "hinton.lang@norsup.me",
  "phone": "+1 (911) 582-3438",
  "registered": "Thursday, June 22, 2017 6:12 AM",
  "latitude": "9.412058",
  "longitude": "-156.563156"
}, {
  "_id": "5f2929bc67867f97c6db509e",
  "index": 22,
  "guid": "bcf285a4-3ea1-4eea-987b-e4367ff0a7ce",
  "isActive": true,
  "balance": "$185,862.21",
  "picture": "http://placehold.it/32x32",
  "age": 25,
  "name": {
    "first": "Hogan",
    "last": "Curtis"
  },
  "company": "DANCITY",
  "email": "hogan.curtis@dancity.net",
  "phone": "+1 (948) 572-3248",
  "registered": "Monday, April 27, 2015 2:10 PM",
  "latitude": "54.289815",
  "longitude": "-112.744895"
}, {
  "_id": "5f2929bc983233a219dcbcfb",
  "index": 23,
  "guid": "bbef9a19-f7d4-4fc4-8d78-6c475536f62b",
  "isActive": true,
  "balance": "$286,788.24",
  "picture": "http://placehold.it/32x32",
  "age": 29,
  "name": {
    "first": "Adriana",
    "last": "Burks"
  },
  "company": "PARCOE",
  "email": "adriana.burks@parcoe.name",
  "phone": "+1 (840) 482-2977",
  "registered": "Saturday, March 22, 2014 9:09 AM",
  "latitude": "-89.207709",
  "longitude": "24.300744"
}, {
  "_id": "5f2929bc8b1d1a696858eec5",
  "index": 24,
  "guid": "9b29f450-2637-43cd-8727-516de17ef86f",
  "isActive": true,
  "balance": "$246,791.62",
  "picture": "http://placehold.it/32x32",
  "age": 35,
  "name": {
    "first": "Mclean",
    "last": "Barrera"
  },
  "company": "HOUSEDOWN",
  "email": "mclean.barrera@housedown.info",
  "phone": "+1 (862) 492-2975",
  "registered": "Sunday, June 17, 2018 2:37 AM",
  "latitude": "49.248857",
  "longitude": "103.168243"
}, {
  "_id": "5f2929bc68b8d74094babb61",
  "index": 25,
  "guid": "90fbb06b-f3ca-4ee5-a49b-6dd7d1092e40",
  "isActive": true,
  "balance": "$183,993.58",
  "picture": "http://placehold.it/32x32",
  "age": 20,
  "name": {
    "first": "Glenn",
    "last": "Glass"
  },
  "company": "EQUITAX",
  "email": "glenn.glass@equitax.ca",
  "phone": "+1 (856) 502-3755",
  "registered": "Thursday, October 12, 2017 2:17 AM",
  "latitude": "-8.765239",
  "longitude": "131.661204"
}, {
  "_id": "5f2929bc4c695f976cfab66f",
  "index": 26,
  "guid": "a4183994-5f8c-4167-aa93-a9863cab4fa2",
  "isActive": true,
  "balance": "$84,008.79",
  "picture": "http://placehold.it/32x32",
  "age": 29,
  "name": {
    "first": "Priscilla",
    "last": "Curry"
  },
  "company": "INRT",
  "email": "priscilla.curry@inrt.us",
  "phone": "+1 (809) 453-3902",
  "registered": "Friday, February 13, 2015 4:19 PM",
  "latitude": "28.405378",
  "longitude": "103.737943"
}, {
  "_id": "5f2929bc2ef3fa2ca92a0e61",
  "index": 27,
  "guid": "661a9826-085f-40c4-9e3b-4cba50771197",
  "isActive": true,
  "balance": "$327,546.26",
  "picture": "http://placehold.it/32x32",
  "age": 38,
  "name": {
    "first": "Vilma",
    "last": "Kinney"
  },
  "company": "ZOSIS",
  "email": "vilma.kinney@zosis.biz",
  "phone": "+1 (823) 415-3684",
  "registered": "Monday, January 11, 2016 3:11 AM",
  "latitude": "17.875836",
  "longitude": "10.812724"
}, {
  "_id": "5f2929bc73948c224388f3de",
  "index": 28,
  "guid": "ccd72dba-651b-45a5-a35c-16faf1c76307",
  "isActive": true,
  "balance": "$257,541.84",
  "picture": "http://placehold.it/32x32",
  "age": 30,
  "name": {
    "first": "Bartlett",
    "last": "Kidd"
  },
  "company": "GEEKUS",
  "email": "bartlett.kidd@geekus.tv",
  "phone": "+1 (815) 590-2374",
  "registered": "Friday, January 11, 2019 5:15 AM",
  "latitude": "45.310544",
  "longitude": "-143.756474"
}, {
  "_id": "5f2929bc3275867ec2c235f2",
  "index": 29,
  "guid": "5679c98f-bc1a-4230-8dd1-10d5c9d8cbe1",
  "isActive": true,
  "balance": "$288,030.96",
  "picture": "http://placehold.it/32x32",
  "age": 34,
  "name": {
    "first": "Dawn",
    "last": "Cunningham"
  },
  "company": "QUILITY",
  "email": "dawn.cunningham@quility.co.uk",
  "phone": "+1 (882) 467-3212",
  "registered": "Thursday, April 26, 2018 8:37 AM",
  "latitude": "-55.68116",
  "longitude": "96.59331"
}, {
  "_id": "5f2929bc042433baba433b22",
  "index": 30,
  "guid": "c752bc8f-4389-4513-9cb0-9dc0fe17f68b",
  "isActive": true,
  "balance": "$123,364.49",
  "picture": "http://placehold.it/32x32",
  "age": 20,
  "name": {
    "first": "Debora",
    "last": "Valentine"
  },
  "company": "TETAK",
  "email": "debora.valentine@tetak.biz",
  "phone": "+1 (804) 424-3413",
  "registered": "Friday, March 16, 2018 8:53 PM",
  "latitude": "73.623506",
  "longitude": "69.645318"
}, {
  "_id": "5f2929bc75d6ae7720229ddd",
  "index": 31,
  "guid": "8298adea-f7af-45ba-ae3c-9accb7aed23d",
  "isActive": true,
  "balance": "$180,352.12",
  "picture": "http://placehold.it/32x32",
  "age": 25,
  "name": {
    "first": "Pena",
    "last": "Haynes"
  },
  "company": "EQUICOM",
  "email": "pena.haynes@equicom.com",
  "phone": "+1 (911) 406-2073",
  "registered": "Friday, October 14, 2016 6:14 AM",
  "latitude": "29.684794",
  "longitude": "-154.35592"
}, {
  "_id": "5f2929bc18375fc498d3d847",
  "index": 32,
  "guid": "1a84c929-7f67-46af-a26c-ebdd16400cb1",
  "isActive": true,
  "balance": "$290,934.23",
  "picture": "http://placehold.it/32x32",
  "age": 34,
  "name": {
    "first": "Alejandra",
    "last": "Robbins"
  },
  "company": "EURON",
  "email": "alejandra.robbins@euron.io",
  "phone": "+1 (891) 557-2035",
  "registered": "Wednesday, October 8, 2014 6:31 PM",
  "latitude": "62.577787",
  "longitude": "165.410209"
}, {
  "_id": "5f2929bccd1793976e1a7a3e",
  "index": 33,
  "guid": "60027f7d-c47c-4c02-9307-8e8ebce90e09",
  "isActive": true,
  "balance": "$200,969.59",
  "picture": "http://placehold.it/32x32",
  "age": 40,
  "name": {
    "first": "Wiley",
    "last": "Simmons"
  },
  "company": "DENTREX",
  "email": "wiley.simmons@dentrex.me",
  "phone": "+1 (841) 427-3169",
  "registered": "Tuesday, November 24, 2015 1:16 AM",
  "latitude": "-13.896914",
  "longitude": "45.326864"
}, {
  "_id": "5f2929bc49c4c26162f723e1",
  "index": 34,
  "guid": "8207351a-0324-4c47-9ac4-db2f7dbf8594",
  "isActive": true,
  "balance": "$438,038.76",
  "picture": "http://placehold.it/32x32",
  "age": 23,
  "name": {
    "first": "Snider",
    "last": "Faulkner"
  },
  "company": "ZYPLE",
  "email": "snider.faulkner@zyple.net",
  "phone": "+1 (803) 551-2858",
  "registered": "Friday, February 12, 2016 7:29 AM",
  "latitude": "-19.687769",
  "longitude": "-97.87017"
}, {
  "_id": "5f2929bc86ea36c7e1ee62ad",
  "index": 35,
  "guid": "22f1c14a-e4dd-470e-b710-04f091f12ded",
  "isActive": true,
  "balance": "$359,542.94",
  "picture": "http://placehold.it/32x32",
  "age": 33,
  "name": {
    "first": "Clara",
    "last": "Montoya"
  },
  "company": "SUREPLEX",
  "email": "clara.montoya@sureplex.name",
  "phone": "+1 (904) 461-3599",
  "registered": "Monday, December 11, 2017 1:43 AM",
  "latitude": "-38.478081",
  "longitude": "98.111813"
}, {
  "_id": "5f2929bc08a0c4506ce94bc9",
  "index": 36,
  "guid": "e9f51f30-903c-4176-a98e-b57fa0354f85",
  "isActive": true,
  "balance": "$7,713.96",
  "picture": "http://placehold.it/32x32",
  "age": 24,
  "name": {
    "first": "Munoz",
    "last": "Hayes"
  },
  "company": "RADIANTIX",
  "email": "munoz.hayes@radiantix.info",
  "phone": "+1 (800) 509-3062",
  "registered": "Tuesday, April 15, 2014 10:22 AM",
  "latitude": "86.640942",
  "longitude": "-8.251184"
}, {
  "_id": "5f2929bc4b976b2a8d1a1966",
  "index": 37,
  "guid": "e048a967-5760-41e5-ac42-4c21aae3f99e",
  "isActive": true,
  "balance": "$388,798.69",
  "picture": "http://placehold.it/32x32",
  "age": 36,
  "name": {
    "first": "Weber",
    "last": "Langley"
  },
  "company": "IDEGO",
  "email": "weber.langley@idego.ca",
  "phone": "+1 (830) 532-2432",
  "registered": "Sunday, January 15, 2017 10:08 AM",
  "latitude": "6.916222",
  "longitude": "93.716568"
}, {
  "_id": "5f2929bc9918a818db1aec3c",
  "index": 38,
  "guid": "bd95f195-d807-4d46-91d9-50f70d87d357",
  "isActive": true,
  "balance": "$426,355.20",
  "picture": "http://placehold.it/32x32",
  "age": 25,
  "name": {
    "first": "Atkins",
    "last": "Boyer"
  },
  "company": "HINWAY",
  "email": "atkins.boyer@hinway.us",
  "phone": "+1 (806) 542-3120",
  "registered": "Sunday, January 25, 2015 3:37 AM",
  "latitude": "-63.336345",
  "longitude": "63.223983"
}, {
  "_id": "5f2929bcb6a234c819ecbf7d",
  "index": 39,
  "guid": "15d81f13-a6df-4f64-ad2e-f47c7fdb7554",
  "isActive": true,
  "balance": "$360,164.56",
  "picture": "http://placehold.it/32x32",
  "age": 32,
  "name": {
    "first": "Randolph",
    "last": "Hodges"
  },
  "company": "ARCHITAX",
  "email": "randolph.hodges@architax.biz",
  "phone": "+1 (877) 429-3684",
  "registered": "Wednesday, August 9, 2017 4:24 PM",
  "latitude": "-14.493602",
  "longitude": "125.627116"
}, {
  "_id": "5f2929bcbc90e1cab22d95bb",
  "index": 40,
  "guid": "ab0fd9be-7546-40d9-a402-327a87950c86",
  "isActive": true,
  "balance": "$409,312.27",
  "picture": "http://placehold.it/32x32",
  "age": 36,
  "name": {
    "first": "Lilia",
    "last": "Weaver"
  },
  "company": "DIGIGEN",
  "email": "lilia.weaver@digigen.tv",
  "phone": "+1 (938) 410-2216",
  "registered": "Monday, August 4, 2014 6:42 AM",
  "latitude": "48.207392",
  "longitude": "117.45955"
}, {
  "_id": "5f2929bce013d24ec503291d",
  "index": 41,
  "guid": "3d7d9d2b-24cf-4997-91a1-a638bc468b67",
  "isActive": true,
  "balance": "$43,736.63",
  "picture": "http://placehold.it/32x32",
  "age": 36,
  "name": {
    "first": "Felicia",
    "last": "Clements"
  },
  "company": "QUANTASIS",
  "email": "felicia.clements@quantasis.co.uk",
  "phone": "+1 (999) 513-2653",
  "registered": "Wednesday, February 19, 2020 2:08 AM",
  "latitude": "18.672058",
  "longitude": "-143.059533"
}, {
  "_id": "5f2929bcd0efcae132fa3e57",
  "index": 42,
  "guid": "9fc56aef-13e2-4457-ac55-1dacf5627e10",
  "isActive": true,
  "balance": "$272,625.11",
  "picture": "http://placehold.it/32x32",
  "age": 36,
  "name": {
    "first": "Howell",
    "last": "Goodman"
  },
  "company": "MULTIFLEX",
  "email": "howell.goodman@multiflex.biz",
  "phone": "+1 (861) 451-2866",
  "registered": "Friday, May 25, 2018 3:37 AM",
  "latitude": "-72.511331",
  "longitude": "-1.160939"
}, {
  "_id": "5f2929bcb91aae658b9833b8",
  "index": 43,
  "guid": "388312d1-4265-4bd0-85b7-09b686017b57",
  "isActive": true,
  "balance": "$487,329.34",
  "picture": "http://placehold.it/32x32",
  "age": 40,
  "name": {
    "first": "Riggs",
    "last": "Sanford"
  },
  "company": "FROLIX",
  "email": "riggs.sanford@frolix.com",
  "phone": "+1 (928) 552-2231",
  "registered": "Sunday, September 3, 2017 8:50 AM",
  "latitude": "29.211212",
  "longitude": "82.113474"
}, {
  "_id": "5f2929bcca7ca9d525066467",
  "index": 44,
  "guid": "4445e274-175a-420d-8e00-e52c193ffcaf",
  "isActive": true,
  "balance": "$121,229.63",
  "picture": "http://placehold.it/32x32",
  "age": 23,
  "name": {
    "first": "Simmons",
    "last": "Barnett"
  },
  "company": "PARAGONIA",
  "email": "simmons.barnett@paragonia.io",
  "phone": "+1 (855) 523-3538",
  "registered": "Saturday, April 30, 2016 6:15 PM",
  "latitude": "-46.763315",
  "longitude": "81.952499"
}, {
  "_id": "5f2929bcf2ba972471ae8133",
  "index": 45,
  "guid": "b193ae58-24b0-45ef-bb95-d3348df874e3",
  "isActive": true,
  "balance": "$190,475.19",
  "picture": "http://placehold.it/32x32",
  "age": 30,
  "name": {
    "first": "Suarez",
    "last": "Good"
  },
  "company": "GEOSTELE",
  "email": "suarez.good@geostele.me",
  "phone": "+1 (876) 425-3179",
  "registered": "Saturday, April 2, 2016 2:39 PM",
  "latitude": "1.442658",
  "longitude": "127.510686"
}, {
  "_id": "5f2929bcbc70ac4e57e23f03",
  "index": 46,
  "guid": "b4134270-05af-4946-96b5-8bf4b4b86e9a",
  "isActive": true,
  "balance": "$124,336.51",
  "picture": "http://placehold.it/32x32",
  "age": 27,
  "name": {
    "first": "Lauri",
    "last": "Marquez"
  },
  "company": "EARGO",
  "email": "lauri.marquez@eargo.net",
  "phone": "+1 (866) 539-3114",
  "registered": "Saturday, February 24, 2018 7:05 PM",
  "latitude": "-80.376515",
  "longitude": "-51.751875"
}, {
  "_id": "5f2929bc751da1baf9b79e63",
  "index": 47,
  "guid": "00a2df0e-4609-48df-bc03-df97641abadf",
  "isActive": true,
  "balance": "$278,717.32",
  "picture": "http://placehold.it/32x32",
  "age": 38,
  "name": {
    "first": "Stacie",
    "last": "Russell"
  },
  "company": "ENOMEN",
  "email": "stacie.russell@enomen.name",
  "phone": "+1 (959) 564-2652",
  "registered": "Monday, May 11, 2020 9:23 PM",
  "latitude": "-69.139312",
  "longitude": "50.169776"
}, {
  "_id": "5f2929bc2509c549e3f0cf9f",
  "index": 48,
  "guid": "c4288d24-b8af-4c91-b41a-d39dd5050776",
  "isActive": true,
  "balance": "$127,828.33",
  "picture": "http://placehold.it/32x32",
  "age": 25,
  "name": {
    "first": "Nguyen",
    "last": "Shaffer"
  },
  "company": "WEBIOTIC",
  "email": "nguyen.shaffer@webiotic.info",
  "phone": "+1 (935) 548-3036",
  "registered": "Tuesday, July 7, 2015 7:03 AM",
  "latitude": "-41.358732",
  "longitude": "85.112787"
}, {
  "_id": "5f2929bca3cb0a350169fdde",
  "index": 49,
  "guid": "1ca49d6f-e40a-4851-98f5-720714f919f3",
  "isActive": true,
  "balance": "$301,904.11",
  "picture": "http://placehold.it/32x32",
  "age": 26,
  "name": {
    "first": "Strickland",
    "last": "Reid"
  },
  "company": "COSMETEX",
  "email": "strickland.reid@cosmetex.ca",
  "phone": "+1 (965) 579-3738",
  "registered": "Thursday, June 18, 2015 5:24 AM",
  "latitude": "22.399241",
  "longitude": "-14.266855"
}, {
  "_id": "5f2929bcd272a6ae684f1209",
  "index": 50,
  "guid": "9706a976-fb99-4dcb-8a74-681db3a374f2",
  "isActive": true,
  "balance": "$158,048.68",
  "picture": "http://placehold.it/32x32",
  "age": 34,
  "name": {
    "first": "Benjamin",
    "last": "Farmer"
  },
  "company": "AVENETRO",
  "email": "benjamin.farmer@avenetro.us",
  "phone": "+1 (927) 497-2544",
  "registered": "Saturday, December 16, 2017 5:19 PM",
  "latitude": "59.342619",
  "longitude": "8.68093"
}, {
  "_id": "5f2929bcb8bd88334bee2a51",
  "index": 51,
  "guid": "bbc8e83c-a5b8-4198-b171-290fa9729f15",
  "isActive": true,
  "balance": "$288,760.74",
  "picture": "http://placehold.it/32x32",
  "age": 31,
  "name": {
    "first": "Vaughn",
    "last": "Hurley"
  },
  "company": "NAXDIS",
  "email": "vaughn.hurley@naxdis.biz",
  "phone": "+1 (821) 552-3240",
  "registered": "Friday, December 14, 2018 8:55 PM",
  "latitude": "70.420534",
  "longitude": "156.579999"
}, {
  "_id": "5f2929bc882efa963c6c037a",
  "index": 52,
  "guid": "e6bce4ad-d9f0-4910-baeb-f065c86b4ca4",
  "isActive": true,
  "balance": "$291,029.05",
  "picture": "http://placehold.it/32x32",
  "age": 25,
  "name": {
    "first": "Owens",
    "last": "Bowman"
  },
  "company": "XERONK",
  "email": "owens.bowman@xeronk.tv",
  "phone": "+1 (876) 529-3673",
  "registered": "Friday, December 21, 2018 9:12 AM",
  "latitude": "79.383797",
  "longitude": "154.793556"
}, {
  "_id": "5f2929bc2b4ef29b3225e6a8",
  "index": 53,
  "guid": "866851d7-f09c-44b0-8d7d-08913b72b779",
  "isActive": true,
  "balance": "$171,490.27",
  "picture": "http://placehold.it/32x32",
  "age": 23,
  "name": {
    "first": "Wyatt",
    "last": "Obrien"
  },
  "company": "VERTON",
  "email": "wyatt.obrien@verton.co.uk",
  "phone": "+1 (937) 467-2468",
  "registered": "Friday, January 27, 2017 10:42 AM",
  "latitude": "-77.38426",
  "longitude": "103.63063"
}, {
  "_id": "5f2929bc9027b840d123a6a1",
  "index": 54,
  "guid": "a99abff4-b473-4653-bd41-fd8a280aa22e",
  "isActive": true,
  "balance": "$232,703.75",
  "picture": "http://placehold.it/32x32",
  "age": 35,
  "name": {
    "first": "Mona",
    "last": "Cummings"
  },
  "company": "COLUMELLA",
  "email": "mona.cummings@columella.biz",
  "phone": "+1 (878) 567-2106",
  "registered": "Tuesday, July 14, 2015 9:06 AM",
  "latitude": "74.828948",
  "longitude": "89.030115"
}, {
  "_id": "5f2929bc33dc69af2f16d7d6",
  "index": 55,
  "guid": "a520d7db-98ca-4edf-a867-8837a1a5eef6",
  "isActive": true,
  "balance": "$146,194.69",
  "picture": "http://placehold.it/32x32",
  "age": 28,
  "name": {
    "first": "Alison",
    "last": "Baird"
  },
  "company": "BLEEKO",
  "email": "alison.baird@bleeko.com",
  "phone": "+1 (895) 572-3981",
  "registered": "Sunday, April 5, 2020 3:25 AM",
  "latitude": "-83.934198",
  "longitude": "22.013919"
}, {
  "_id": "5f2929bc6fff3ee4dae77679",
  "index": 56,
  "guid": "4e48f8d5-ff80-47e6-9367-cfaaea3e1f2b",
  "isActive": true,
  "balance": "$101,759.80",
  "picture": "http://placehold.it/32x32",
  "age": 36,
  "name": {
    "first": "Dixon",
    "last": "Combs"
  },
  "company": "WAZZU",
  "email": "dixon.combs@wazzu.io",
  "phone": "+1 (811) 455-3861",
  "registered": "Sunday, September 17, 2017 12:01 AM",
  "latitude": "19.475111",
  "longitude": "-62.574734"
}, {
  "_id": "5f2929bca2e974bb92d4e6fd",
  "index": 57,
  "guid": "e2a0e951-3420-475d-9be4-769ce15f30ab",
  "isActive": true,
  "balance": "$152,966.00",
  "picture": "http://placehold.it/32x32",
  "age": 35,
  "name": {
    "first": "Caitlin",
    "last": "Clemons"
  },
  "company": "CONFERIA",
  "email": "caitlin.clemons@conferia.me",
  "phone": "+1 (953) 435-3471",
  "registered": "Thursday, October 19, 2017 4:39 PM",
  "latitude": "-10.999817",
  "longitude": "-12.675963"
}, {
  "_id": "5f2929bcd57991c525bedffc",
  "index": 58,
  "guid": "e9e086d3-3835-4efd-8495-623fa12d8b13",
  "isActive": true,
  "balance": "$97,294.87",
  "picture": "http://placehold.it/32x32",
  "age": 24,
  "name": {
    "first": "Raymond",
    "last": "Pate"
  },
  "company": "LUDAK",
  "email": "raymond.pate@ludak.net",
  "phone": "+1 (831) 455-2253",
  "registered": "Tuesday, May 26, 2020 12:30 AM",
  "latitude": "24.643885",
  "longitude": "-85.706743"
}, {
  "_id": "5f2929bcf125dd93d1d9d60a",
  "index": 59,
  "guid": "05ae0476-8a4b-4e8f-97cb-f0d62c06314c",
  "isActive": true,
  "balance": "$446,399.33",
  "picture": "http://placehold.it/32x32",
  "age": 28,
  "name": {
    "first": "Francis",
    "last": "Richardson"
  },
  "company": "ROBOID",
  "email": "francis.richardson@roboid.name",
  "phone": "+1 (891) 511-3818",
  "registered": "Wednesday, December 26, 2018 4:15 AM",
  "latitude": "-71.469215",
  "longitude": "-71.718705"
}, {
  "_id": "5f2929bce93bcf98740d2e43",
  "index": 60,
  "guid": "fa507761-99cb-40f6-a822-fd206e3c6cf8",
  "isActive": true,
  "balance": "$400,740.60",
  "picture": "http://placehold.it/32x32",
  "age": 39,
  "name": {
    "first": "Misty",
    "last": "Ware"
  },
  "company": "STREZZO",
  "email": "misty.ware@strezzo.info",
  "phone": "+1 (964) 499-3734",
  "registered": "Sunday, July 15, 2018 9:26 AM",
  "latitude": "-41.519408",
  "longitude": "129.578941"
}, {
  "_id": "5f2929bca572340a09462e4e",
  "index": 61,
  "guid": "05ee3ea8-369a-455e-ba69-e5c36a74bafe",
  "isActive": true,
  "balance": "$256,016.73",
  "picture": "http://placehold.it/32x32",
  "age": 31,
  "name": {
    "first": "Keri",
    "last": "Stephenson"
  },
  "company": "OHMNET",
  "email": "keri.stephenson@ohmnet.ca",
  "phone": "+1 (848) 441-3147",
  "registered": "Thursday, November 20, 2014 7:19 AM",
  "latitude": "5.119392",
  "longitude": "112.996206"
}, {
  "_id": "5f2929bca8228eb3e55dc6fa",
  "index": 62,
  "guid": "8b1558ec-2066-4b0f-a524-f4e6efe359ed",
  "isActive": true,
  "balance": "$416,730.13",
  "picture": "http://placehold.it/32x32",
  "age": 23,
  "name": {
    "first": "Valentine",
    "last": "Olsen"
  },
  "company": "DIGINETIC",
  "email": "valentine.olsen@diginetic.us",
  "phone": "+1 (808) 553-3903",
  "registered": "Saturday, September 26, 2015 6:11 AM",
  "latitude": "87.861074",
  "longitude": "139.389802"
}, {
  "_id": "5f2929bc76c1913e588cf503",
  "index": 63,
  "guid": "7be1dfe7-1f9d-4608-916c-8441bc047163",
  "isActive": true,
  "balance": "$332,603.51",
  "picture": "http://placehold.it/32x32",
  "age": 39,
  "name": {
    "first": "Shepard",
    "last": "Wiggins"
  },
  "company": "ASSISTIX",
  "email": "shepard.wiggins@assistix.biz",
  "phone": "+1 (819) 538-2352",
  "registered": "Tuesday, April 3, 2018 2:20 AM",
  "latitude": "70.104292",
  "longitude": "-64.233074"
}, {
  "_id": "5f2929bcd9d4642b91d4b595",
  "index": 64,
  "guid": "a3267d0c-7a4a-415f-899e-f3b74d741dee",
  "isActive": true,
  "balance": "$369,001.62",
  "picture": "http://placehold.it/32x32",
  "age": 20,
  "name": {
    "first": "Ashley",
    "last": "Floyd"
  },
  "company": "QUILTIGEN",
  "email": "ashley.floyd@quiltigen.tv",
  "phone": "+1 (810) 591-2460",
  "registered": "Thursday, May 23, 2019 4:04 PM",
  "latitude": "-40.14802",
  "longitude": "173.311192"
}, {
  "_id": "5f2929bc0a292fec53d7767c",
  "index": 65,
  "guid": "5af9646f-78da-42a1-9dab-43cec6af5e57",
  "isActive": true,
  "balance": "$165,648.50",
  "picture": "http://placehold.it/32x32",
  "age": 33,
  "name": {
    "first": "Bernard",
    "last": "Jacobs"
  },
  "company": "PROVIDCO",
  "email": "bernard.jacobs@providco.co.uk",
  "phone": "+1 (846) 440-2126",
  "registered": "Monday, April 7, 2014 1:46 AM",
  "latitude": "-63.358956",
  "longitude": "4.829226"
}, {
  "_id": "5f2929bc89c9e2f8713335f1",
  "index": 66,
  "guid": "750eac42-84c8-4eb5-98f3-5c541b788c4d",
  "isActive": true,
  "balance": "$96,931.07",
  "picture": "http://placehold.it/32x32",
  "age": 32,
  "name": {
    "first": "Jodi",
    "last": "Cohen"
  },
  "company": "GEEKWAGON",
  "email": "jodi.cohen@geekwagon.biz",
  "phone": "+1 (894) 455-2663",
  "registered": "Tuesday, June 9, 2015 7:25 PM",
  "latitude": "-81.719611",
  "longitude": "-157.248746"
}, {
  "_id": "5f2929bcfa9d96040414e242",
  "index": 67,
  "guid": "72d9b932-c281-46a4-a055-7ae8ca8694ed",
  "isActive": true,
  "balance": "$185,672.61",
  "picture": "http://placehold.it/32x32",
  "age": 29,
  "name": {
    "first": "Maldonado",
    "last": "Gross"
  },
  "company": "GENESYNK",
  "email": "maldonado.gross@genesynk.com",
  "phone": "+1 (818) 555-2888",
  "registered": "Tuesday, September 9, 2014 9:52 PM",
  "latitude": "-76.817402",
  "longitude": "-99.390919"
}, {
  "_id": "5f2929bc894cf2a1e2d18d5c",
  "index": 68,
  "guid": "df9cc28a-fcb5-4402-9bc7-b775f06aa5a7",
  "isActive": true,
  "balance": "$201,494.51",
  "picture": "http://placehold.it/32x32",
  "age": 20,
  "name": {
    "first": "Cecilia",
    "last": "Burgess"
  },
  "company": "ZANILLA",
  "email": "cecilia.burgess@zanilla.io",
  "phone": "+1 (803) 510-3944",
  "registered": "Tuesday, March 20, 2018 2:39 PM",
  "latitude": "72.794612",
  "longitude": "137.424744"
}, {
  "_id": "5f2929bca2f99cd795f19061",
  "index": 69,
  "guid": "d1f41b54-4460-43a9-8316-c17fc35c1241",
  "isActive": true,
  "balance": "$477,098.03",
  "picture": "http://placehold.it/32x32",
  "age": 35,
  "name": {
    "first": "Watkins",
    "last": "Kaufman"
  },
  "company": "SHADEASE",
  "email": "watkins.kaufman@shadease.me",
  "phone": "+1 (981) 487-3403",
  "registered": "Friday, September 20, 2019 9:02 AM",
  "latitude": "79.922538",
  "longitude": "42.715639"
}, {
  "_id": "5f2929bcb0f1f9b5d6503b5a",
  "index": 70,
  "guid": "18c98132-ca8a-4139-bd6d-f342856da8ee",
  "isActive": true,
  "balance": "$335,912.11",
  "picture": "http://placehold.it/32x32",
  "age": 32,
  "name": {
    "first": "Constance",
    "last": "Hinton"
  },
  "company": "XTH",
  "email": "constance.hinton@xth.net",
  "phone": "+1 (844) 505-3667",
  "registered": "Friday, March 17, 2017 5:46 AM",
  "latitude": "23.824624",
  "longitude": "83.221594"
}, {
  "_id": "5f2929bcc814a08efeffa6d5",
  "index": 71,
  "guid": "a57555e2-cd4b-48db-a67d-779a322a1cf4",
  "isActive": true,
  "balance": "$395,923.61",
  "picture": "http://placehold.it/32x32",
  "age": 37,
  "name": {
    "first": "Drake",
    "last": "Kemp"
  },
  "company": "NIXELT",
  "email": "drake.kemp@nixelt.name",
  "phone": "+1 (948) 513-3951",
  "registered": "Saturday, July 23, 2016 6:44 AM",
  "latitude": "-9.303726",
  "longitude": "-157.549697"
}, {
  "_id": "5f2929bcaf05c536bc3657ae",
  "index": 72,
  "guid": "42bda332-ac8f-4453-b526-7aeb8a27922a",
  "isActive": true,
  "balance": "$87,770.37",
  "picture": "http://placehold.it/32x32",
  "age": 24,
  "name": {
    "first": "Sandy",
    "last": "Sexton"
  },
  "company": "EARTHPURE",
  "email": "sandy.sexton@earthpure.info",
  "phone": "+1 (843) 439-3287",
  "registered": "Wednesday, February 28, 2018 9:09 AM",
  "latitude": "23.432135",
  "longitude": "110.31726"
}, {
  "_id": "5f2929bc61bdac027d555063",
  "index": 73,
  "guid": "5fe0d3be-249c-47c6-9887-c3b9e5f2d0c5",
  "isActive": true,
  "balance": "$32,980.06",
  "picture": "http://placehold.it/32x32",
  "age": 26,
  "name": {
    "first": "Porter",
    "last": "Rosario"
  },
  "company": "ACCIDENCY",
  "email": "porter.rosario@accidency.ca",
  "phone": "+1 (875) 499-3004",
  "registered": "Monday, June 4, 2018 1:15 AM",
  "latitude": "38.011387",
  "longitude": "137.180253"
}, {
  "_id": "5f2929bc373d452ceab941e2",
  "index": 74,
  "guid": "92f28a60-37c6-4341-b661-2cee020c6c1e",
  "isActive": true,
  "balance": "$247,932.10",
  "picture": "http://placehold.it/32x32",
  "age": 21,
  "name": {
    "first": "Willie",
    "last": "Fox"
  },
  "company": "ZAGGLE",
  "email": "willie.fox@zaggle.us",
  "phone": "+1 (999) 552-2110",
  "registered": "Sunday, January 5, 2014 9:18 AM",
  "latitude": "71.733772",
  "longitude": "143.326735"
}, {
  "_id": "5f2929bcb794f45a457a3368",
  "index": 75,
  "guid": "aa31c981-a892-4697-9656-0160c298adc7",
  "isActive": true,
  "balance": "$372,955.28",
  "picture": "http://placehold.it/32x32",
  "age": 31,
  "name": {
    "first": "Benton",
    "last": "Campbell"
  },
  "company": "ACCUPHARM",
  "email": "benton.campbell@accupharm.biz",
  "phone": "+1 (808) 478-2046",
  "registered": "Tuesday, October 8, 2019 9:44 AM",
  "latitude": "-1.639762",
  "longitude": "102.760356"
}, {
  "_id": "5f2929bca782f21c8fc279aa",
  "index": 76,
  "guid": "b1a5838d-0314-4b3a-936f-90f543d5b0be",
  "isActive": true,
  "balance": "$22,978.52",
  "picture": "http://placehold.it/32x32",
  "age": 30,
  "name": {
    "first": "Lucia",
    "last": "Juarez"
  },
  "company": "BARKARAMA",
  "email": "lucia.juarez@barkarama.tv",
  "phone": "+1 (876) 477-3857",
  "registered": "Saturday, September 23, 2017 1:36 AM",
  "latitude": "-61.221946",
  "longitude": "-60.346132"
}, {
  "_id": "5f2929bc1dbfd3279f766550",
  "index": 77,
  "guid": "a5517ff4-5d93-4cd5-a40f-74d347793be3",
  "isActive": true,
  "balance": "$114,334.59",
  "picture": "http://placehold.it/32x32",
  "age": 25,
  "name": {
    "first": "Singleton",
    "last": "Figueroa"
  },
  "company": "PIGZART",
  "email": "singleton.figueroa@pigzart.co.uk",
  "phone": "+1 (920) 592-3889",
  "registered": "Tuesday, February 12, 2019 12:48 AM",
  "latitude": "18.029749",
  "longitude": "23.574164"
}, {
  "_id": "5f2929bc12907cb64fd9b110",
  "index": 78,
  "guid": "55ebfd9f-7f1d-4384-a150-0464e492987b",
  "isActive": true,
  "balance": "$150,481.53",
  "picture": "http://placehold.it/32x32",
  "age": 24,
  "name": {
    "first": "Finley",
    "last": "Shepard"
  },
  "company": "DIGIAL",
  "email": "finley.shepard@digial.biz",
  "phone": "+1 (828) 546-2797",
  "registered": "Saturday, November 28, 2015 9:22 AM",
  "latitude": "43.641973",
  "longitude": "-67.739118"
}, {
  "_id": "5f2929bcffcc785d90d37fb5",
  "index": 79,
  "guid": "ecc5437b-179c-45fe-a498-98ace84d0554",
  "isActive": true,
  "balance": "$210,974.57",
  "picture": "http://placehold.it/32x32",
  "age": 28,
  "name": {
    "first": "Barbara",
    "last": "Lyons"
  },
  "company": "WAAB",
  "email": "barbara.lyons@waab.com",
  "phone": "+1 (878) 580-2860",
  "registered": "Wednesday, August 14, 2019 3:13 PM",
  "latitude": "75.481772",
  "longitude": "-169.197571"
}, {
  "_id": "5f2929bc23d3ac953d4333dc",
  "index": 80,
  "guid": "f9c4441a-93e4-47b4-adec-cb99b2331423",
  "isActive": true,
  "balance": "$320,084.09",
  "picture": "http://placehold.it/32x32",
  "age": 26,
  "name": {
    "first": "Allison",
    "last": "Salazar"
  },
  "company": "ILLUMITY",
  "email": "allison.salazar@illumity.io",
  "phone": "+1 (803) 493-2629",
  "registered": "Tuesday, October 1, 2019 5:48 AM",
  "latitude": "-29.912022",
  "longitude": "93.664057"
}, {
  "_id": "5f2929bcf704f1db636d4d81",
  "index": 81,
  "guid": "d4e89e47-7af8-4a51-9269-01deb038196c",
  "isActive": true,
  "balance": "$8,707.22",
  "picture": "http://placehold.it/32x32",
  "age": 28,
  "name": {
    "first": "Madelyn",
    "last": "Battle"
  },
  "company": "KLUGGER",
  "email": "madelyn.battle@klugger.me",
  "phone": "+1 (908) 479-2477",
  "registered": "Friday, November 10, 2017 8:27 AM",
  "latitude": "-1.423377",
  "longitude": "-103.137576"
}, {
  "_id": "5f2929bcf69e5d5c882fd265",
  "index": 82,
  "guid": "25e19938-0f35-459f-90ca-e47d514ea7fe",
  "isActive": true,
  "balance": "$233,131.44",
  "picture": "http://placehold.it/32x32",
  "age": 24,
  "name": {
    "first": "Carmela",
    "last": "Ray"
  },
  "company": "MATRIXITY",
  "email": "carmela.ray@matrixity.net",
  "phone": "+1 (938) 561-2475",
  "registered": "Saturday, August 29, 2015 5:58 PM",
  "latitude": "54.071257",
  "longitude": "-22.831634"
}, {
  "_id": "5f2929bcedd87bd91a77c9a2",
  "index": 83,
  "guid": "23ed13b1-b619-474e-b825-b105c0e6fbad",
  "isActive": true,
  "balance": "$211,238.03",
  "picture": "http://placehold.it/32x32",
  "age": 29,
  "name": {
    "first": "Patel",
    "last": "Hebert"
  },
  "company": "FRANSCENE",
  "email": "patel.hebert@franscene.name",
  "phone": "+1 (816) 528-2755",
  "registered": "Tuesday, May 9, 2017 3:56 AM",
  "latitude": "-32.488959",
  "longitude": "-125.543942"
}, {
  "_id": "5f2929bca631e59556280009",
  "index": 84,
  "guid": "17f0b94d-341c-4228-992f-4751e3e80d87",
  "isActive": true,
  "balance": "$26,953.02",
  "picture": "http://placehold.it/32x32",
  "age": 26,
  "name": {
    "first": "Sweet",
    "last": "Cotton"
  },
  "company": "STEELTAB",
  "email": "sweet.cotton@steeltab.info",
  "phone": "+1 (957) 532-3280",
  "registered": "Tuesday, July 9, 2019 2:30 AM",
  "latitude": "-12.832113",
  "longitude": "-32.42301"
}, {
  "_id": "5f2929bcb47007ff41933da0",
  "index": 85,
  "guid": "89c70b8f-9867-4421-9c1a-0f2d2ed69c69",
  "isActive": true,
  "balance": "$405,841.10",
  "picture": "http://placehold.it/32x32",
  "age": 27,
  "name": {
    "first": "Chavez",
    "last": "Beasley"
  },
  "company": "AUTOGRATE",
  "email": "chavez.beasley@autograte.ca",
  "phone": "+1 (819) 486-2555",
  "registered": "Friday, June 23, 2017 6:27 PM",
  "latitude": "55.416572",
  "longitude": "-90.541853"
}, {
  "_id": "5f2929bc2a0993d75dd92598",
  "index": 86,
  "guid": "494b64ad-82a0-4f02-96a4-110afda44892",
  "isActive": true,
  "balance": "$77,296.75",
  "picture": "http://placehold.it/32x32",
  "age": 40,
  "name": {
    "first": "Anna",
    "last": "Wilkins"
  },
  "company": "ZORK",
  "email": "anna.wilkins@zork.us",
  "phone": "+1 (960) 460-3079",
  "registered": "Saturday, December 20, 2014 3:15 PM",
  "latitude": "79.380584",
  "longitude": "82.049285"
}, {
  "_id": "5f2929bc1ab2c1c15a989486",
  "index": 87,
  "guid": "1f95f05c-3eba-49cd-8fc6-6c36ad999f67",
  "isActive": true,
  "balance": "$365,371.96",
  "picture": "http://placehold.it/32x32",
  "age": 34,
  "name": {
    "first": "Joanne",
    "last": "Ruiz"
  },
  "company": "TERRAGEN",
  "email": "joanne.ruiz@terragen.biz",
  "phone": "+1 (897) 581-3593",
  "registered": "Tuesday, April 18, 2017 1:09 AM",
  "latitude": "-24.172941",
  "longitude": "-94.816846"
}, {
  "_id": "5f2929bc3ad5adc98ebba75a",
  "index": 88,
  "guid": "4906ca14-74a6-4010-a173-84e0399796d5",
  "isActive": true,
  "balance": "$213,845.78",
  "picture": "http://placehold.it/32x32",
  "age": 32,
  "name": {
    "first": "Ora",
    "last": "Dunlap"
  },
  "company": "TYPHONICA",
  "email": "ora.dunlap@typhonica.tv",
  "phone": "+1 (994) 563-2033",
  "registered": "Wednesday, April 6, 2016 9:13 PM",
  "latitude": "-8.901702",
  "longitude": "-47.222872"
}, {
  "_id": "5f2929bc2aa0ee30148e8446",
  "index": 89,
  "guid": "dac8601e-c42c-4306-9841-352126b232bf",
  "isActive": true,
  "balance": "$56,731.86",
  "picture": "http://placehold.it/32x32",
  "age": 35,
  "name": {
    "first": "Baker",
    "last": "Tanner"
  },
  "company": "ADORNICA",
  "email": "baker.tanner@adornica.co.uk",
  "phone": "+1 (890) 515-2195",
  "registered": "Thursday, May 1, 2014 5:44 AM",
  "latitude": "41.95799",
  "longitude": "-122.382052"
}, {
  "_id": "5f2929bc31a43b13a265c6cc",
  "index": 90,
  "guid": "4deb5d06-459a-4606-a2e3-0c529bb99146",
  "isActive": true,
  "balance": "$226,259.73",
  "picture": "http://placehold.it/32x32",
  "age": 32,
  "name": {
    "first": "Clemons",
    "last": "Howard"
  },
  "company": "KAGGLE",
  "email": "clemons.howard@kaggle.biz",
  "phone": "+1 (937) 476-2908",
  "registered": "Friday, August 14, 2015 7:22 PM",
  "latitude": "-13.702518",
  "longitude": "62.163842"
}, {
  "_id": "5f2929bc2c3b9f2e4d50a96e",
  "index": 91,
  "guid": "31970304-5aaf-477a-8620-ef85b595eb4c",
  "isActive": true,
  "balance": "$99,072.95",
  "picture": "http://placehold.it/32x32",
  "age": 37,
  "name": {
    "first": "Murray",
    "last": "Snyder"
  },
  "company": "CIPROMOX",
  "email": "murray.snyder@cipromox.com",
  "phone": "+1 (807) 498-2491",
  "registered": "Sunday, August 24, 2014 12:37 AM",
  "latitude": "-26.069689",
  "longitude": "-105.341001"
}];
exports.default = _default;
},{}],"src/js/models/Player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;

var _constants = require("../lib/constants.js");

class Player {
  constructor(store) {
    let _stash = new Proxy({}, {
      set: (obj, prop, value) => {
        const oldValue = obj[prop];
        obj[prop] = value;
        store.events.publish(_constants.keys.$eventKey.STASH_CHANGED, {
          prop,
          val,
          oldValue
        });
      }
    });

    let _wallet = new Proxy({}, {
      set: (obj, prop, value) => {
        const oldValue = obj[prop];
        obj[prop] = value;
        store.events.publish(_constants.keys.$eventKey.WALLET_CHANGED, {
          prop,
          val,
          oldValue
        });
      }
    });

    let _trenchCoat = new Proxy([], {
      set: (obj, prop, val) => {
        const oldValue = obj[prop];
        obj[prop] = value;
        store.events.publish(_constants.keys.$eventKey.TRENCH_COAT_CHANGED, {
          prop,
          val,
          oldValue
        });
      }
    });

    this.stash = this.getStashMods(_stash);
    this.trenchCoat = this.getTrenchCoatMods(_trenchCoat);
    this.wallet = this.getWalletMods(_wallet);
    this.stash.set(2000, _constants.$x);
    this.trenchCoat.set(new Array(100), _constants.$x);
  }

  getStashMods(_stash) {
    return {
      inc: (val, k) => k == _constants.$x ? _stash += val : void 0,
      dec: (val, k) => k == _constants.$x ? _stash -= val : void 0,
      set: (val, k) => k == _constants.$x ? _stash = val : void 0,
      get: () => _stash
    };
  }

  getWalletMods(_wallet) {
    return {
      [_constants.$CRYPTO.BTC]: {
        inc: (val, k) => k == _constants.$x ? _wallet[_constants.$CRYPTO.BTC] += val : void 0,
        dec: (val, k) => k == _constants.$x ? _wallet[_constants.$CRYPTO.BTC] -= val : void 0,
        set: (val, k) => k == _constants.$x ? _wallet[_constants.$CRYPTO.BTC] = val : void 0,
        get: () => _wallet[_constants.$CRYPTO.BTC]
      },
      [_constants.$CRYPTO.DIVI]: {
        inc: (val, k) => k == _constants.$x ? _wallet[_constants.$CRYPTO.DIVI] += val : void 0,
        dec: (val, k) => k == _constants.$x ? _wallet[_constants.$CRYPTO.DIVI] -= val : void 0,
        set: (val, k) => k == _constants.$x ? _wallet[_constants.$CRYPTO.DIVI] = val : void 0,
        get: () => _wallet[_constants.$CRYPTO.DIVI]
      },
      [_constants.$CRYPTO.DOGE]: {
        inc: (val, k) => k == _constants.$x ? _wallet[_constants.$CRYPTO.DOGE] += val : void 0,
        dec: (val, k) => k == _constants.$x ? _wallet[_constants.$CRYPTO.DOGE] -= val : void 0,
        set: (val, k) => k == _constants.$x ? _wallet[_constants.$CRYPTO.DOGE] = val : void 0,
        get: () => _wallet[_constants.$CRYPTO.DOGE]
      },
      [_constants.$CRYPTO.ETH]: {
        inc: (val, k) => k == _constants.$x ? _wallet[_constants.$CRYPTO.ETH] += val : void 0,
        dec: (val, k) => k == _constants.$x ? _wallet[_constants.$CRYPTO.ETH] -= val : void 0,
        set: (val, k) => k == _constants.$x ? _wallet[_constants.$CRYPTO.ETH] = val : void 0,
        get: () => _wallet[_constants.$CRYPTO.ETH]
      },
      [_constants.$CRYPTO.NANO]: {
        inc: (val, k) => k == _constants.$x ? _wallet[_constants.$CRYPTO.NANO] += val : void 0,
        dec: (val, k) => k == _constants.$x ? _wallet[_constants.$CRYPTO.NANO] -= val : void 0,
        set: (val, k) => k == _constants.$x ? _wallet[_constants.$CRYPTO.NANO] = val : void 0,
        get: () => _wallet[_constants.$CRYPTO.NANO]
      },
      [_constants.$CRYPTO.RIPPLE]: {
        inc: (val, k) => k == _constants.$x ? _wallet[_constants.$CRYPTO.RIPPLE] += val : void 0,
        dec: (val, k) => k == _constants.$x ? _wallet[_constants.$CRYPTO.RIPPLE] -= val : void 0,
        set: (val, k) => k == _constants.$x ? _wallet[_constants.$CRYPTO.RIPPLE] = val : void 0,
        get: () => _wallet[_constants.$CRYPTO.RIPPLE]
      }
    };
  }

  getTrenchCoatMods(_trenchCoat) {
    return {
      add: (val, k) => k == _constants.$x ? _trenchCoat.push(val) : void 0,
      remove: (val, k) => k == _constants.$x ? _trenchCoat.splice(_trenchCoat.indexOf(val)) : void 0,
      set: (val, k) => k == _constants.$x ? _trenchCoat = val : void 0,
      getCoat: () => _trenchCoat
    };
  }

}

exports.Player = Player;
},{"../lib/constants.js":"src/js/lib/constants.js"}],"src/js/models/Trader.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("../lib/constants.js");

var _Crypto = require("../models/Crypto.js");

var _utils = _interopRequireDefault(require("../lib/utils.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Trader {
  constructor({
    _id,
    index,
    guid,
    isActive,
    balance,
    age,
    picture,
    firstname,
    lastname,
    company,
    email,
    phone,
    registered,
    latitude,
    longitude,
    store
  }) {
    this._id = _id;
    this.store = store;
    this.index = index;
    this.guid = guid;
    this.isActive = isActive;
    this.balance = this.convertBalance(balance);
    this.age = age;
    this.picture = picture;
    this.firstname = firstname;
    this.lastname = lastname;
    this.company = company;
    this.email = email;
    this.phone = phone;
    this.registered = registered;
    this.latitude = Number.parseFloat(latitude);
    this.longitude = Number.parseFloat(longitude);
    this.wallet = (0, _Crypto.walletMaker)();
    this.cryptoMaker = (0, _Crypto.cryptoMaker)(this.store);
    this.convertBalanceToCryptos();
  }

  convertBalance(balance) {
    return Number.parseFloat(balance.substring(1, balance.length).replace(',', ''));
  }

  convertBalanceToCryptos() {
    const walletKeys = Object.keys(this.wallet);
    [..._utils.default.splitNParts(100, 6)].forEach((percent, i) => {
      this.wallet[walletKeys[i]] = this.cryptoMaker[walletKeys[i]](this.balance / percent * 100);
    });
  }

}

exports.default = Trader;
},{"../lib/constants.js":"src/js/lib/constants.js","../models/Crypto.js":"src/js/models/Crypto.js","../lib/utils.js":"src/js/lib/utils.js"}],"src/js/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Trader = _interopRequireDefault(require("./models/Trader.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App {
  constructor({
    store,
    components,
    $x,
    init
  }) {
    this.store = store;
    this.components = components;
    this.$x = $x;
    this.init = init;
    this.player = null;
    this.traders = [];
  }

  registerComponent(component, k) {
    this.components.push(component);
  }

  registerPlayer(player, k) {
    if (k === this.$x) return this.player = player;
    throw new Error('Unauthorised!');
  }

  generateTraders(traderData) {
    traderData.forEach(trader => {
      this.traders.push(new _Trader.default({
        _id: trader['_id'],
        index: trader['index'],
        guid: trader['guid'],
        isActive: trader['isActive'],
        balance: trader['balance'],
        age: trader['age'],
        picture: trader['picture'],
        firstname: trader['name']['first'],
        lastname: trader['name']['last'],
        company: trader['company'],
        email: trader['email'],
        company: trader['company'],
        phone: trader['phone'],
        registered: trader['registered'],
        latitude: trader['latitude'],
        longitude: trader['longitude'],
        store: this.store
      }));
    });
  }

  sortTradersByBalance() {
    this.traders = this.traders.sort((traderA, traderB) => traderA.balance > traderB.balance ? -1 : 1);
  }

}

exports.default = App;
},{"./models/Trader.js":"src/js/models/Trader.js"}],"src/js/index.js":[function(require,module,exports) {
"use strict";

var _constants = require("./lib/constants.js");

var _Crypto = require("./models/Crypto.js");

var _utils = _interopRequireDefault(require("./lib/utils.js"));

var _actions = _interopRequireDefault(require("./state/actions.js"));

var _mutations = _interopRequireDefault(require("./state/mutations.js"));

var _EventManager = _interopRequireDefault(require("./state/EventManager.js"));

var _Store = _interopRequireDefault(require("./state/Store.js"));

var _ExampleComponent = _interopRequireDefault(require("./components/ExampleComponent.js"));

var _traders = _interopRequireDefault(require("./lib/traders.js"));

var _Player = require("./models/Player.js");

var _App = _interopRequireDefault(require("./App.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.time('boot-time');
const app = new _App.default({
  store: new _Store.default({
    actions: _actions.default,
    mutations: _mutations.default,
    events: new _EventManager.default()
  }),
  components: [],
  $x: _constants.$x,
  init: self => {
    const overlay = (0, _constants.$i)('overlay');
    const navBtn = (0, _constants.$i)('menu-bars');
    const nav = (0, _constants.$i)('nav');
    const navs = [(0, _constants.$i)('nav-1'), (0, _constants.$i)('nav-2'), (0, _constants.$i)('nav-3'), (0, _constants.$i)('nav-4'), (0, _constants.$i)('nav-5'), (0, _constants.$i)('nav-6')];

    const toggleNav = () => {
      navBtn.classList.toggle('change');
      overlay.classList.toggle('overlay-active');

      if (overlay.classList.contains('overlay-active')) {
        navs.forEach((nav, i) => nav.classList.replace("nav-".concat(i + 1, "-slide-out"), "nav-".concat(i + 1, "-slide-in")));
        overlay.classList.replace('overlay-slide-out', 'overlay-slide-in');
      } else {
        navs.forEach((nav, i) => nav.classList.replace("nav-".concat(i + 1, "-slide-in"), "nav-".concat(i + 1, "-slide-out")));
        overlay.classList.replace('overlay-slide-in', 'overlay-slide-out');
      }
    };

    (0, _constants.$i)('menu-bars').addEventListener('click', toggleNav);
    (0, _constants.$i)('nav').addEventListener('click', toggleNav);
    /**
     * POC and testing code, needs modularising
     * \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
     */
    //debugger;

    let loginBtn = (0, _constants.$i)('login-btn');
    let loginLoader = (0, _constants.$i)('auth-btn-loader-login');
    let loginText = loginLoader.parentNode.childNodes[3];
    let loginIcon = loginLoader.parentElement.childNodes[1];
    let logoutBtn = (0, _constants.$i)('logout-btn');
    let logoutLoader = (0, _constants.$i)('auth-btn-loader-logout');
    let logoutText = logoutLoader.parentNode.childNodes[3];
    let logoutIcon = logoutLoader.parentElement.childNodes[1];
    const loginOriginalText = loginText.innerText;

    const loginBtnHandler = () => {
      loginLoader.hidden = false;
      loginIcon.style.visibility = 'hidden';
      loginText.innerText = 'Loading';
      setTimeout(() => {
        loginLoader.hidden = true;
        logoutIcon.style.visibility = 'visible';
        loginIcon.style.visibility = 'hidden';
        loginText.innerText = loginOriginalText;
        logoutBtn.style.visibility = 'visible';
        loginBtn.style.visibility = 'hidden';
      }, 2000);
    };

    const logoutOriginalText = logoutText.innerText;

    const logoutBtnHandler = () => {
      logoutLoader.hidden = false;
      logoutIcon.style.visibility = 'hidden';
      logoutText.innerText = 'Loading';
      setTimeout(() => {
        logoutLoader.hidden = true;
        loginIcon.style.visibility = 'visible';
        logoutBtn.style.visibility = 'hidden';
        logoutText.innerText = logoutOriginalText;
        logoutBtn.style.visibility = 'hidden';
        loginBtn.style.visibility = 'visible';
      }, 2000);
    };

    loginBtn.addEventListener('click', () => loginBtnHandler());
    logoutBtn.addEventListener('click', () => logoutBtnHandler());
    overlay.hidden = false;
    logoutBtn.style.visibility = 'hidden';
    /** /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
     * POC and testing code, needs modularising
     */

    self.registerComponent(new _ExampleComponent.default(app.store));
    self.registerPlayer(new _Player.Player(), _constants.$x);
    self.generateTraders(_traders.default);
    self.sortTradersByBalance();
  }
});

window.onload = () => {
  app.init(app);
  console.timeEnd('boot-time');

  _utils.default.log('App:', app, '#bada55');

  window.$i = _constants.$i; // window.location.href = '/#social';
}; // CurrencyConverter testing
// var myBitcoins = new BTC(100, app.store);
// var myDivi = myBitcoins.convertTo($CRYPTO.DIVI, myBitcoins);
// var myNano = myDivi.convertTo($CRYPTO.NANO, myDivi);
// var myRipple = myNano.convertTo($CRYPTO.RIPPLE, myNano);
// console.log(myBitcoins, myDivi, myNano, myRipple)
// setTimeout(() => console.log(myBitcoins, myDivi, myNano, myRipple), 200);
},{"./lib/constants.js":"src/js/lib/constants.js","./models/Crypto.js":"src/js/models/Crypto.js","./lib/utils.js":"src/js/lib/utils.js","./state/actions.js":"src/js/state/actions.js","./state/mutations.js":"src/js/state/mutations.js","./state/EventManager.js":"src/js/state/EventManager.js","./state/Store.js":"src/js/state/Store.js","./components/ExampleComponent.js":"src/js/components/ExampleComponent.js","./lib/traders.js":"src/js/lib/traders.js","./models/Player.js":"src/js/models/Player.js","./App.js":"src/js/App.js"}],"../../../../AppData/Roaming/nvm/v14.4.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52444" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/nvm/v14.4.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/index.js"], null)
//# sourceMappingURL=/js.d818e0ef.js.map