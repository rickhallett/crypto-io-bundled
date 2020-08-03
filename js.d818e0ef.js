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
exports.$colors = exports.$CRYPTO = exports.$x = exports.keys = exports.$a = exports.$q = exports.$i = void 0;

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
  BTC: 'btc',
  DIVI: 'divi',
  NANO: 'nano',
  DOGE: 'doge',
  ETH: 'eth',
  RIPPLE: 'ripple'
};
exports.$CRYPTO = $CRYPTO;
let keys = {
  $eventKey: {
    STATE_CHANGE: 'stateChange',
    CRYPTO_BOUGHT: 'cryptoBought',
    STASH_CHANGED: 'stashChanged',
    TRENCH_COAT_CHANGED: 'trenchCoatChanged'
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
},{"./Utils.js":"src/js/lib/Utils.js"}],"src/js/lib/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Utils {
  constructor() {
    this.log = this.createLog();
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
},{}],"src/js/state/Store.js":[function(require,module,exports) {
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
},{"./BaseComponent.js":"src/js/components/BaseComponent.js"}],"src/js/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
  }

  registerComponent(component, k) {
    this.components.push(component);
  }

  registerPlayer(player, k) {
    if (k === this.$x) return this.player = player;
    throw new Error('Unauthorised!');
  }

}

exports.default = App;
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
},{"../lib/constants.js":"src/js/lib/constants.js"}],"src/js/index.js":[function(require,module,exports) {
"use strict";

var _constants = require("./lib/constants.js");

var _utils = _interopRequireDefault(require("./lib/utils.js"));

var _actions = _interopRequireDefault(require("./state/actions.js"));

var _mutations = _interopRequireDefault(require("./state/mutations.js"));

var _EventManager = _interopRequireDefault(require("./state/EventManager.js"));

var _Store = _interopRequireDefault(require("./state/Store.js"));

var _BaseComponent = _interopRequireDefault(require("./components/BaseComponent.js"));

var _ExampleComponent = _interopRequireDefault(require("./components/ExampleComponent.js"));

var _App = _interopRequireDefault(require("./App.js"));

var _Player = require("./models/Player.js");

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
    overlay.hidden = false;
    self.registerComponent(new _ExampleComponent.default(app.store));
    self.registerPlayer(new _Player.Player(), _constants.$x);
  }
});

window.onload = () => app.init(app);

console.timeEnd('boot-time');

_utils.default.log('App:', app, '#bada55');
},{"./lib/constants.js":"src/js/lib/constants.js","./lib/utils.js":"src/js/lib/utils.js","./state/actions.js":"src/js/state/actions.js","./state/mutations.js":"src/js/state/mutations.js","./state/EventManager.js":"src/js/state/EventManager.js","./state/Store.js":"src/js/state/Store.js","./components/BaseComponent.js":"src/js/components/BaseComponent.js","./components/ExampleComponent.js":"src/js/components/ExampleComponent.js","./App.js":"src/js/App.js","./models/Player.js":"src/js/models/Player.js"}],"../../../../AppData/Roaming/nvm/v14.4.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60253" + '/');

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