parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"HqmC":[function(require,module,exports) {
var define;
var global = arguments[3];
var e,r=arguments[3];parcelRequire=function(r,n,t,o){var a,s="function"==typeof parcelRequire&&parcelRequire,c="function"==typeof require&&require;function i(e,t){if(!n[e]){if(!r[e]){var o="function"==typeof parcelRequire&&parcelRequire;if(!t&&o)return o(e,!0);if(s)return s(e,!0);if(c&&"string"==typeof e)return c(e);var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}u.resolve=function(n){return r[e][1][n]||n},u.cache={};var l=n[e]=new i.Module(e);r[e][0].call(l.exports,u,l,l.exports,this)}return n[e].exports;function u(e){return i(u.resolve(e))}}i.isParcelRequire=!0,i.Module=function(e){this.id=e,this.bundle=i,this.exports={}},i.modules=r,i.cache=n,i.parent=s,i.register=function(e,n){r[e]=[function(e,r){r.exports=n},{}]};for(var l=0;l<t.length;l++)try{i(t[l])}catch(p){a||(a=p)}if(t.length){var u=i(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof e&&e.amd&&e(function(){return u})}if(parcelRequire=i,a)throw a;return i}({"../../../../AppData/Roaming/nvm/v14.4.0/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(e,r,n){var t=null;function o(e){return(""+e).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}n.getBundleURL=function(){return t||(t=function(){try{throw new Error}catch(r){var e=(""+r.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);if(e)return o(e[0])}return"/"}()),t},n.getBaseURL=o},{}],"../../../../AppData/Roaming/nvm/v14.4.0/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(e,r,n){var t=e("./bundle-url");function o(e){var r=e.cloneNode();r.onload=function(){e.remove()},r.href=e.href.split("?")[0]+"?"+Date.now(),e.parentNode.insertBefore(r,e.nextSibling)}var a=null;r.exports=function(){a||(a=setTimeout(function(){for(var e=document.querySelectorAll('link[rel="stylesheet"]'),r=0;r<e.length;r++)t.getBaseURL(e[r].href)===t.getBundleURL()&&o(e[r]);a=null},50))}},{"./bundle-url":"../../../../AppData/Roaming/nvm/v14.4.0/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/css/market.css":[function(e,r,n){var t=e("_css_loader");r.hot.dispose(t),r.hot.accept(t)},{_css_loader:"../../../../AppData/Roaming/nvm/v14.4.0/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/css/social.css":[function(e,r,n){var t=e("_css_loader");r.hot.dispose(t),r.hot.accept(t)},{_css_loader:"../../../../AppData/Roaming/nvm/v14.4.0/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/css/main.css":[function(e,r,n){var t=e("_css_loader");r.hot.dispose(t),r.hot.accept(t)},{"./market.css":"src/css/market.css","./social.css":"src/css/social.css","./..\\img\\chain.jpg":[["chain.c47bbb12.jpg","src/img/chain.jpg"],"src/img/chain.jpg"],_css_loader:"../../../../AppData/Roaming/nvm/v14.4.0/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../../../../AppData/Roaming/nvm/v14.4.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(e,r,n){var t,o,a=arguments[3],s="__parcel__error__overlay__",c=r.bundle.Module;r.bundle.Module=function(e){c.call(this,e),this.hot={data:r.bundle.hotData,_acceptCallbacks:[],_disposeCallbacks:[],accept:function(e){this._acceptCallbacks.push(e||function(){})},dispose:function(e){this._disposeCallbacks.push(e)}},r.bundle.hotData=null};var i=r.bundle.parent;if(!(i&&i.isParcelRequire||"undefined"==typeof WebSocket)){var l=location.hostname,u="https:"===location.protocol?"wss":"ws",p=new WebSocket(u+"://"+l+":54642/");p.onmessage=function(e){t={},o=[];var r=JSON.parse(e.data);if("update"===r.type){var n=!1;r.assets.forEach(function(e){e.isNew||function e(r,n){var s=r.modules;if(!s)return;if(!s[n]&&r.parent)return e(r.parent,n);if(t[n])return;t[n]=!0;var c=r.cache[n];o.push([r,n]);if(c&&c.hot&&c.hot._acceptCallbacks.length)return!0;return function e(r,n){var t=r.modules;if(!t)return[];var o=[];var a,s,c;for(a in t)for(s in t[a][1])((c=t[a][1][s])===n||Array.isArray(c)&&c[c.length-1]===n)&&o.push(a);r.parent&&(o=o.concat(e(r.parent,n)));return o}(a.parcelRequire,n).some(function(r){return e(a.parcelRequire,r)})}(a.parcelRequire,e.id)&&(n=!0)}),(n=n||r.assets.every(function(e){return"css"===e.type&&e.generated.js}))?(console.clear(),r.assets.forEach(function(e){!function e(r,n){var t=r.modules;if(!t)return;if(t[n.id]||!r.parent){var o=new Function("require","module","exports",n.generated.js);n.isNew=!t[n.id],t[n.id]=[o,n.deps]}else r.parent&&e(r.parent,n)}(a.parcelRequire,e)}),o.forEach(function(e){!function(e,r){var n=e.cache[r];e.hotData={},n&&(n.hot.data=e.hotData);n&&n.hot&&n.hot._disposeCallbacks.length&&n.hot._disposeCallbacks.forEach(function(r){r(e.hotData)});if(delete e.cache[r],e(r),(n=e.cache[r])&&n.hot&&n.hot._acceptCallbacks.length)n.hot._acceptCallbacks.forEach(function(e){e()})}(e[0],e[1])})):location.reload&&location.reload()}if("reload"===r.type&&(p.close(),p.onclose=function(){location.reload()}),"error-resolved"===r.type&&(console.log("[parcel] ✨ Error resolved"),d()),"error"===r.type){console.error("[parcel] 🚨  "+r.error.message+"\n"+r.error.stack),d();var c=function(e){var r=document.createElement("div");r.id=s;var n=document.createElement("div"),t=document.createElement("pre");return n.innerText=e.error.message,t.innerText=e.error.stack,r.innerHTML='<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;"><span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span><span style="top: 2px; margin-left: 5px; position: relative;">🚨</span><div style="font-size: 18px; font-weight: bold; margin-top: 20px;">'+n.innerHTML+"</div><pre>"+t.innerHTML+"</pre></div>",r}(r);document.body.appendChild(c)}}}function d(){var e=document.getElementById(s);e&&e.remove()}},{}]},{},["../../../../AppData/Roaming/nvm/v14.4.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js"]);
},{}]},{},["HqmC"], null)
//# sourceMappingURL=main.1603664a.667a7533.js.map