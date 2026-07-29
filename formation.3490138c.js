// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"03dYU":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "52d618363490138c";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"kBTrB":[function(require,module,exports,__globalThis) {
// Formation page — entrypoint
// - Renders the lesson card grid (matches .project-card pattern from the homepage)
// - Handles module filter
// - Applies i18n to all [data-i18n] elements (innerHTML for bodies, textContent for labels)
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _formationConfig = require("../data/formation-config");
var _formationIndexJson = require("../data/formation/formation-index.json");
var _formationIndexJsonDefault = parcelHelpers.interopDefault(_formationIndexJson);
const LANG = document.documentElement.lang === "en" ? "en" : "fr";
const t = (0, _formationConfig.UI)[LANG];
// ── i18n ─────────────────────────────────────────────────────────
// textContent for short labels, innerHTML for paragraph bodies that
// contain <strong> tags.
const i18nTextNodes = document.querySelectorAll("[data-i18n]:not([data-i18n-html])");
i18nTextNodes.forEach((el)=>{
    const key = el.getAttribute("data-i18n");
    if (t[key] != null) el.textContent = t[key];
});
const i18nHtmlNodes = document.querySelectorAll("[data-i18n-html]");
i18nHtmlNodes.forEach((el)=>{
    const key = el.getAttribute("data-i18n-html");
    if (t[key] != null) el.innerHTML = t[key];
});
function escapeHtml(str) {
    return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
// ── Render a single lesson card ──────────────────────────────────
function renderCard(lesson) {
    const data = lesson[LANG];
    const isFree = lesson.access === "full";
    const slug = lesson.numero.replace(".", "-");
    const langSuffix = LANG === "en" ? "-us" : "";
    const href = `lecon-${slug}${langSuffix}.html`;
    const label = isFree ? t.cardOpen : `${t.cardPreview}: ${data.titre}`;
    const link = document.createElement("a");
    link.className = "lesson-card";
    link.href = href;
    link.setAttribute("data-id", lesson.id);
    link.setAttribute("data-module", String(lesson.module));
    link.setAttribute("data-access", lesson.access);
    link.setAttribute("aria-label", label);
    const numLabel = LANG === "fr" ? "Le\xe7on" : "Lesson";
    const modLabel = LANG === "fr" ? "Module" : "Module";
    link.innerHTML = `
    <div class="lesson-card__top">
      <span class="lesson-card__num">${numLabel} ${lesson.numero} \xb7 ${modLabel} ${lesson.module}</span>
      <span class="lesson-card__duration"><i class="fa fa-clock-o" aria-hidden="true"></i> ${lesson.duree_minutes} ${t.cardDuration}</span>
    </div>

    <span class="lesson-card__badge ${isFree ? "lesson-card__badge--free" : "lesson-card__badge--locked"}">
      ${isFree ? `<i class="fa fa-unlock" aria-hidden="true"></i> ${t.badgeFree}` : `<i class="fa fa-lock" aria-hidden="true"></i> ${t.badgeLocked}`}
    </span>

    <h3 class="lesson-card__title">${escapeHtml(data.titre)}</h3>

    <p class="lesson-card__objectif">${escapeHtml(data.objectif)}</p>

    <div class="lesson-card__footer">
      <span>
        ${isFree ? `<i class="fa fa-arrow-right" aria-hidden="true"></i> ${t.cardOpen}` : `<i class="fa fa-eye" aria-hidden="true"></i> ${t.cardPreview}`}
      </span>
      <span class="lesson-card__module-tag">
        <i class="fa fa-bookmark" aria-hidden="true"></i> ${t.moduleLabel} ${lesson.module}
      </span>
    </div>
  `;
    return link;
}
function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}
// ── Render the grid + update filter counts ─────────────────────
function renderGrid(lessons) {
    const grid = document.getElementById("formationGrid");
    if (!grid) return;
    grid.innerHTML = "";
    lessons.forEach((l)=>grid.appendChild(renderCard(l)));
    const total = lessons.length;
    const m1 = lessons.filter((l)=>l.module === 1).length;
    const m2 = lessons.filter((l)=>l.module === 2).length;
    setText("filterCountAll", total);
    setText("filterCount1", m1);
    setText("filterCount2", m2);
}
// ── Module filter ────────────────────────────────────────────────
function setupFilter() {
    const btns = document.querySelectorAll(".formation-filter__btn");
    btns.forEach((btn)=>{
        btn.addEventListener("click", ()=>{
            btns.forEach((b)=>b.classList.remove("is-active"));
            btn.classList.add("is-active");
            const filter = btn.getAttribute("data-filter");
            const cards = document.querySelectorAll(".lesson-card");
            cards.forEach((card)=>{
                const mod = card.getAttribute("data-module");
                if (filter === "all" || mod === filter) card.classList.remove("lesson-card--hidden");
                else card.classList.add("lesson-card--hidden");
            });
        });
    });
}
// ── Boot ─────────────────────────────────────────────────────────
function boot() {
    try {
        const lessons = (0, _formationIndexJsonDefault.default);
        renderGrid(lessons);
        setupFilter();
        if (window.ScrollReveal) {
            const sr = window.ScrollReveal();
            sr.reveal(".lesson-card", {
                distance: "20px",
                duration: 400,
                easing: "cubic-bezier(0.4, 0, 0.2, 1)",
                origin: "bottom",
                interval: 60,
                reset: false
            });
        }
    } catch (e) {
        console.error("[formation] Failed to load:", e);
        const grid = document.getElementById("formationGrid");
        if (grid) grid.innerHTML = `<div class="detail-block" style="grid-column: 1 / -1;"><p class="detail-block__text">${escapeHtml(t.error)}</p></div>`;
    }
}
document.addEventListener("DOMContentLoaded", boot);

},{"../data/formation-config":"jI28Z","../data/formation/formation-index.json":"aBoqc","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jI28Z":[function(require,module,exports,__globalThis) {
// Mapping for the formation page — modules, labels, i18n strings.
// One source of truth used by formation.html / formation-us.html and formation.js.
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MODULES", ()=>MODULES);
parcelHelpers.export(exports, "UI", ()=>UI);
const MODULES = {
    1: {
        fr: "Module 1",
        en: "Module 1"
    },
    2: {
        fr: "Module 2",
        en: "Module 2"
    }
};
const UI = {
    fr: {
        backToPortfolio: "Retour au portfolio",
        eyebrow: "Formation Android \u2014 Acc\xe8s restreint",
        heroTitle1: "Ma\xeetrise ",
        heroTitleGrad: "Kotlin & Jetpack Compose",
        heroTitle2: "en 22 le\xe7ons",
        heroSubtitle: "Une formation progressive construite \xe0 partir de mon exp\xe9rience terrain : th\xe9orie, exercices guid\xe9s, quiz interactifs et corrections d\xe9taill\xe9es. Trois le\xe7ons sont offertes en acc\xe8s complet \u2014 le reste est disponible sur demande.",
        heroActionProgram: "Voir le programme",
        heroActionAccess: "Modalit\xe9s d'acc\xe8s",
        statLessons: "Le\xe7ons",
        statModules: "Modules",
        statHours: "de contenu",
        statFree: "gratuites",
        moduleLabel: "Module",
        filterAll: "Tous",
        filterModule1: "Module 1",
        filterModule2: "Module 2",
        filterLabel: "Filtrer par module",
        accessHeading: "Modalit\xe9s d'acc\xe8s",
        accessBannerTitle: "Aper\xe7u gratuit",
        accessNote: '<strong>3 le\xe7ons offertes</strong> (1.1, 1.2, 1.3) en acc\xe8s complet \xb7 les 19 autres sur demande via le <a href="index.html#contact">formulaire de contact</a>.',
        accessBody: "<strong>Trois le\xe7ons offertes</strong> (1.1, 1.2, 1.3) vous donnent un aper\xe7u complet : th\xe9orie, exercice, QCM et corrections. Les <strong>19 autres le\xe7ons</strong> sont pr\xe9sent\xe9es sous forme d'extrait : vous voyez l'objectif et l'analogie, puis vous demandez l'acc\xe8s complet via le formulaire de contact.",
        programTitle: "Programme complet",
        programList: "<li><strong>Module 1 \u2014 Fondamentaux Kotlin &amp; Compose</strong> : 20 le\xe7ons sur les bases, le layout, la navigation, l'\xe9tat, le networking, la persistance, l'injection, les tests.</li><li><strong>Module 2 \u2014 Architecture &amp; Avanc\xe9</strong> : 2 le\xe7ons sur Clean Architecture, MVI, modularisation et qualit\xe9 en production.</li><li><strong>3 le\xe7ons gratuites en acc\xe8s complet</strong> (th\xe9orie + exercice + QCM + corrections).</li>",
        accessCtaTitle: "Acc\xe8s complet",
        accessCtaText: "Pour d\xe9bloquer les 19 autres le\xe7ons, demande l'acc\xe8s via le formulaire de contact : je te r\xe9ponds sous 24h.",
        programHeading: "Programme",
        stackTitle: "Stack enseign\xe9e",
        stackBody: "Le parcours couvre Kotlin en profondeur, Jetpack Compose pour l'UI, MVVM et Clean Architecture, Coroutines et Flow, Room, Retrofit, Hilt, et les tests avec JUnit, MockK et Espresso.",
        ctaContact: "Demander l'acc\xe8s",
        ctaCv: "Voir mon CV",
        cardOpen: "Ouvrir la le\xe7on",
        cardPreview: "Aper\xe7u",
        cardDuration: "min",
        badgeFree: "OFFERT",
        badgeLocked: "VERROUILL\xc9",
        modalClose: "Fermer",
        modalCloseAria: "Fermer la fen\xeatre",
        tabTheory: "Th\xe9orie",
        tabExercise: "Exercice",
        tabQuiz: "Quiz",
        tabErrors: "Erreurs courantes",
        tabResume: "R\xe9sum\xe9",
        theoryLabel: "Th\xe9orie",
        analogyLabel: "Analogie",
        exerciseLabel: "Exercice pratique",
        codeStart: "Code de d\xe9part",
        codeSolution: "Solution",
        hints: "Indices",
        errorTitle: "Erreur fr\xe9quente",
        why: "Pourquoi",
        fix: "Correction",
        lockedTitle: "Contenu verrouill\xe9",
        lockedBody: "Cette le\xe7on fait partie du programme complet. Pour y acc\xe9der (ainsi qu'aux 19 autres), demande l'acc\xe8s via le formulaire de contact.",
        lockedBannerTitle: "Aper\xe7u gratuit",
        lockedCtaText: "Acc\xe8s complet sur demande",
        lockedCtaButton: "Demander l'acc\xe8s complet",
        quizEmpty: "Aucun quiz pour cette le\xe7on.",
        errorsEmpty: "Aucune erreur fr\xe9quente document\xe9e.",
        next: "Le\xe7on suivante",
        quizPerfect: "Parfait !",
        quizGreat: "Excellent !",
        quizGood: "Pas mal !",
        quizTry: "Continue \xe0 t'entra\xeener !",
        quizResult: "Tu as obtenu",
        quizOutOf: "sur",
        quizReviewAll: "Recommencer le quiz",
        loading: "Chargement\u2026",
        error: "Une erreur est survenue. R\xe9essaie plus tard."
    },
    en: {
        backToPortfolio: "Back to portfolio",
        eyebrow: "Android Training \u2014 Restricted access",
        heroTitle1: "Master ",
        heroTitleGrad: "Kotlin & Jetpack Compose",
        heroTitle2: "in 22 lessons",
        heroSubtitle: "A progressive training built from my field experience: theory, guided exercises, interactive quizzes, and detailed corrections. Three lessons are free in full \u2014 the rest is available on request.",
        heroActionProgram: "See the program",
        heroActionAccess: "Access terms",
        statLessons: "Lessons",
        statModules: "Modules",
        statHours: "of content",
        statFree: "free",
        moduleLabel: "Module",
        filterAll: "All",
        filterModule1: "Module 1",
        filterModule2: "Module 2",
        filterLabel: "Filter by module",
        accessHeading: "Access terms",
        accessBannerTitle: "Free preview",
        accessNote: '<strong>3 lessons free in full</strong> (1.1, 1.2, 1.3) \xb7 the other 19 on request via the <a href="index-us.html#contact">contact form</a>.',
        accessBody: "<strong>Three free lessons</strong> (1.1, 1.2, 1.3) give you a complete preview: theory, exercise, quiz and corrections. The <strong>19 other lessons</strong> are shown as excerpts: you see the goal and the analogy, then request full access via the contact form.",
        programTitle: "Full program",
        programList: "<li><strong>Module 1 \u2014 Kotlin &amp; Compose fundamentals</strong>: 20 lessons on basics, layout, navigation, state, networking, persistence, injection, testing.</li><li><strong>Module 2 \u2014 Architecture &amp; advanced</strong>: 2 lessons on Clean Architecture, MVI, modularisation and production quality.</li><li><strong>3 lessons free in full</strong> (theory + exercise + quiz + corrections).</li>",
        accessCtaTitle: "Full access",
        accessCtaText: "To unlock the 19 other lessons, request access via the contact form: I'll reply within 24h.",
        programHeading: "Program",
        stackTitle: "Stack taught",
        stackBody: "The track covers Kotlin in depth, Jetpack Compose for UI, MVVM and Clean Architecture, Coroutines and Flow, Room, Retrofit, Hilt, and testing with JUnit, MockK and Espresso.",
        ctaContact: "Request access",
        ctaCv: "View my CV",
        cardOpen: "Open lesson",
        cardPreview: "Preview",
        cardDuration: "min",
        badgeFree: "FREE",
        badgeLocked: "LOCKED",
        modalClose: "Close",
        modalCloseAria: "Close window",
        tabTheory: "Theory",
        tabExercise: "Exercise",
        tabQuiz: "Quiz",
        tabErrors: "Common errors",
        tabResume: "Summary",
        theoryLabel: "Theory",
        analogyLabel: "Analogy",
        exerciseLabel: "Hands-on exercise",
        codeStart: "Starting code",
        codeSolution: "Solution",
        hints: "Hints",
        errorTitle: "Common mistake",
        why: "Why",
        fix: "Fix",
        lockedTitle: "Locked content",
        lockedBody: "This lesson is part of the full program. To access it (along with the other 19), request access via the contact form.",
        lockedBannerTitle: "Free preview",
        lockedCtaText: "Full access on request",
        lockedCtaButton: "Request full access",
        quizEmpty: "No quiz for this lesson.",
        errorsEmpty: "No common mistakes documented.",
        next: "Next lesson",
        quizPerfect: "Perfect!",
        quizGreat: "Excellent!",
        quizGood: "Not bad!",
        quizTry: "Keep practising!",
        quizResult: "You scored",
        quizOutOf: "out of",
        quizReviewAll: "Retake the quiz",
        loading: "Loading\u2026",
        error: "Something went wrong. Try again later."
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"aBoqc":[function(require,module,exports,__globalThis) {
module.exports = JSON.parse('[{"id":"lecon_1_1","numero":"1.1","module":1,"duree_minutes":20,"theme":"Introduction aux variables, types et fonctions en Kotlin","access":"full","fr":{"titre":"Introduction aux variables, types et fonctions en Kotlin","objectif":"Comprendre les bases de Kotlin : d\xe9clarer des variables, utiliser les types de donn\xe9es et cr\xe9er des fonctions simples","preview_theorie":"Kotlin est un langage de programmation moderne utilis\xe9 pour d\xe9velopper des applications Android. Il permet de d\xe9clarer des variables avec des types de donn\xe9es sp\xe9cifiques comme Int, String, Boolean, etc. Les fonctions sont des blocs de code r\xe9utilisables qui effectuent des\u2026"},"en":{"titre":"Introduction to Kotlin: variables, types and functions","objectif":"Understand how to declare variables, know the basic types, and create simple functions in Kotlin.","preview_theorie":"Kotlin is a statically typed language that runs on the JVM. Variables are declared with the keywords val (immutable) or var (mutable). Basic types include Int, Double, Boolean, String, and Char. A function is defined with the keyword fun, followed by the name, parameters in\u2026"}},{"id":"lecon_1_2","numero":"1.2","module":1,"duree_minutes":20,"theme":"S\xe9curit\xe9 nulle et Smart Cast en Kotlin","access":"full","fr":{"titre":"S\xe9curit\xe9 nulle et Smart Cast en Kotlin","objectif":"Comprendre les concepts de s\xe9curit\xe9 nulle et de smart cast en Kotlin pour \xe9viter les erreurs de pointeur nul dans l\'application Todo","preview_theorie":"En Kotlin, la s\xe9curit\xe9 nulle est une fonctionnalit\xe9 cl\xe9 qui aide \xe0 pr\xe9venir les erreurs de pointeur nul (NullPointerException). Par d\xe9faut, les types en Kotlin ne peuvent pas \xeatre nuls. Si vous voulez qu\'une variable puisse \xeatre nulle, vous devez utiliser le type nullable en\u2026"},"en":{"titre":"Null Safety and Smart Cast in Kotlin","objectif":"Understand null safety and smart cast concepts in Kotlin to prevent null pointer errors in the Todo app","preview_theorie":"In Kotlin, null safety is a key feature that helps prevent null pointer exceptions. By default, types in Kotlin cannot be null. If you want a variable to be nullable, you must use the nullable type by adding a question mark (?) after the type. For example, String? can be either\u2026"}},{"id":"lecon_1_3","numero":"1.3","module":1,"duree_minutes":25,"theme":"Classes, Objets et H\xe9ritage en Kotlin","access":"full","fr":{"titre":"Classes, Objets et H\xe9ritage en Kotlin","objectif":"Comprendre comment cr\xe9er des classes, instancier des objets et utiliser l\'h\xe9ritage en Kotlin pour structurer une application Todo Android.","preview_theorie":"En Kotlin, une classe est un mod\xe8le qui d\xe9crit les caract\xe9ristiques et les comportements d\'un objet. On la d\xe9clare avec le mot-cl\xe9 \'class\'. Par exemple, dans notre application Todo, une t\xe2che peut \xeatre mod\xe9lis\xe9e par une classe TodoItem avec des propri\xe9t\xe9s comme le titre, la\u2026"},"en":{"titre":"Classes, Objects and Inheritance in Kotlin","objectif":"Understand how to create classes, instantiate objects and use inheritance in Kotlin to structure an Android Todo application.","preview_theorie":"In Kotlin, a class is a blueprint that describes the characteristics and behaviors of an object. It is declared with the \'class\' keyword. For example, in our Todo application, a task can be modeled by a TodoItem class with properties like title, description and completion\u2026"}},{"id":"lecon_1_4","numero":"1.4","module":1,"duree_minutes":25,"theme":"Collections : List, Map et Filter en Kotlin","access":"teaser","fr":{"titre":"Collections : List, Map et Filter en Kotlin","objectif":"Apprendre a creer et manipuler des listes de taches avec les collections Kotlin : List, Map et Filter, afin de gerer les taches de notre application Todo.","preview_theorie":"Les collections sont des structures de donnees qui permettent de stocker plusieurs elements. En Kotlin, il en existe plusieurs types, mais nous allons nous concentrer sur les trois plus utiles pour debuter.\\n\\nLA LISTE (List)\\nUne List est une collection ordonnee d elements. Elle\u2026"},"en":{"titre":"Collections: List, Map and Filter in Kotlin","objectif":"Learn to create and manipulate task lists with Kotlin collections: List, Map and Filter, in order to manage tasks in our Todo application.","preview_theorie":"Collections are data structures that allow you to store multiple elements. In Kotlin, there are several types, but we will focus on the three most useful ones for beginners.\\n\\nTHE LIST\\nA List is an ordered collection of elements. It can be immutable (listOf) or mutable\u2026"}},{"id":"lecon_1_5","numero":"1.5","module":1,"duree_minutes":25,"theme":"Fonctions Lambda et d\'ordre sup\xe9rieur en Kotlin","access":"teaser","fr":{"titre":"Fonctions Lambda et d\'ordre sup\xe9rieur en Kotlin","objectif":"Comprendre et utiliser les fonctions Lambda et d\'ordre sup\xe9rieur pour manipuler les collections dans une application Android.","preview_theorie":"Les fonctions Lambda en Kotlin sont des fonctions anonymes qui peuvent \xeatre pass\xe9es comme argument \xe0 d\'autres fonctions. Elles sont utiles pour traiter les collections de mani\xe8re concise. Les fonctions d\'ordre sup\xe9rieur sont des fonctions qui prennent soit une fonction en\u2026"},"en":{"titre":"Lambdas and Higher-Order Functions in Kotlin","objectif":"Understand and use Lambdas and Higher-Order Functions to manipulate collections in an Android Todo app.","preview_theorie":"Lambdas in Kotlin are anonymous functions that can be passed as arguments. They are useful for concise collection processing. Higher-order functions take a function as an argument or return a function. In a Todo Android app, you can use higher-order functions like \'filter\',\u2026"}},{"id":"lecon_1_6","numero":"1.6","module":1,"duree_minutes":25,"theme":"Coroutines et fonctions suspendues en Kotlin","access":"teaser","fr":{"titre":"Coroutines et fonctions suspendues en Kotlin","objectif":"Comprendre les bases des coroutines et comment utiliser les fonctions suspendues pour g\xe9rer les op\xe9rations asynchrones","preview_theorie":"Les coroutines sont un m\xe9canisme puissant en Kotlin pour g\xe9rer les op\xe9rations asynchrones de mani\xe8re plus simple et plus lisible que les callbacks traditionnels. Une coroutine est essentiellement une fonction qui peut \xeatre suspendue et reprise plus tard sans bloquer le thread\u2026"},"en":{"titre":"Coroutines and suspend functions in Kotlin","objectif":"Understand the basics of coroutines and how to use suspend functions to handle asynchronous operations","preview_theorie":"Coroutines are a powerful mechanism in Kotlin for managing asynchronous operations in a simpler and more readable way than traditional callbacks. A coroutine is essentially a function that can be suspended and resumed later without blocking the current thread. Suspend functions\u2026"}},{"id":"lecon_1_7","numero":"1.7","module":1,"duree_minutes":25,"theme":"Structure d\'un projet Android Studio moderne avec Jetpack Compose","access":"teaser","fr":{"titre":"Structure d\'un projet Android Studio moderne avec Jetpack Compose","objectif":"Comprendre la structure moderne d\'un projet Android Studio utilisant Jetpack Compose, apprendre \xe0 cr\xe9er des composants d\xe9claratifs et g\xe9rer l\'\xe9tat.","preview_theorie":"Jetpack Compose est une biblioth\xe8que d\xe9clarative pour construire des interfaces utilisateur sur Android. Elle remplace XML en permettant de d\xe9finir l\'UI directement dans le code Kotlin via des composants d\xe9claratifs. Ces composants, appel\xe9s composables, d\xe9crivent l\'UI en\u2026"},"en":{"titre":"Modern Android Studio Project Structure with Jetpack Compose","objectif":"Understand the modern Android Studio project structure using Jetpack Compose, learn to create declarative UI components and manage state.","preview_theorie":"Jetpack Compose is a declarative UI toolkit for Android. It replaces XML by allowing UI definition directly in Kotlin code through declarative components. These components, called composables, describe the UI based on the application\'s state. The modern structure includes\u2026"}},{"id":"lecon_1_8","numero":"1.8","module":1,"duree_minutes":25,"theme":"Comprendre le Cycle de Vie d\'une Activity Android","access":"teaser","fr":{"titre":"Comprendre le Cycle de Vie d\'une Activity Android","objectif":"Ma\xeetriser les \xe9tapes du cycle de vie d\'une Activity Android et savoir r\xe9agir aux changements d\'\xe9tat pour g\xe9rer correctement les ressources.","preview_theorie":"Une Activity est un composant essentiel d\'une application Android qui fournit une interface utilisateur \xe0 l\'\xe9cran. Son cycle de vie est g\xe9r\xe9 par le syst\xe8me d\'exploitation et se compose d\'un ensemble de m\xe9thodes de rappel (callbacks) auxquelles l\'application peut se brancher pour\u2026"},"en":{"titre":"Understanding the Android Activity Lifecycle","objectif":"Master the stages of the Android Activity lifecycle and know how to react to state changes to correctly manage resources.","preview_theorie":"An Activity is a core Android component that provides a user interface on the screen. Its lifecycle is managed by the operating system and consists of a set of callback methods that the app can hook into to execute code at specific times. The lifecycle starts when the user\u2026"}},{"id":"lecon_1_9","numero":"1.9","module":1,"duree_minutes":25,"theme":"Layouts XML et ConstraintLayout","access":"teaser","fr":{"titre":"Layouts XML et ConstraintLayout","objectif":"Apprendre \xe0 utiliser ConstraintLayout pour cr\xe9er des interfaces graphiques flexibles et efficaces.","preview_theorie":"Le ConstraintLayout est un layout Android qui permet de positionner des composants de mani\xe8re tr\xe8s pr\xe9cise en utilisant des contraintes. Il remplace le RelativeLayout dans de nombreux cas, offrant une plus grande flexibilit\xe9 et une meilleure performance. Les contraintes\u2026"},"en":{"titre":"XML Layouts and ConstraintLayout","objectif":"Learn to use ConstraintLayout to create flexible and efficient user interfaces.","preview_theorie":"ConstraintLayout is an Android layout that allows precise positioning of components using constraints. It replaces RelativeLayout in many cases, offering greater flexibility and better performance. Constraints define relationships between components (e.g., \'View1 must be above\u2026"}},{"id":"lecon_1_10","numero":"1.10","module":1,"duree_minutes":25,"theme":"Modifier Row, Column et Box dans Jetpack Compose","access":"teaser","fr":{"titre":"Modifier Row, Column et Box dans Jetpack Compose","objectif":"Comprendre comment disposer des composables en ligne, en colonne et dans des bo\xeetes, et savoir les imbriquer correctement","preview_theorie":"Dans Jetpack Compose, la disposition des \xe9l\xe9ments de l\'interface se fait gr\xe2ce \xe0 des contraintes d\xe9claratives qui remplacent les approches imperatives de XML. Trois composables de base couvrent la plupart des besoins de mise en page : Row, Column et Box. Un Row aligne ses\u2026"},"en":{"titre":"Modifier Row, Column and Box in Jetpack Compose","objectif":"Understand how to arrange composables in a row, column, and box, and how to nest them correctly","preview_theorie":"In Jetpack Compose, laying out UI elements is done with declarative constraints that replace the imperative XML approaches. Three core layout composables cover most layout needs: Row, Column, and Box. A Row aligns its children horizontally, distributing any remaining space\u2026"}},{"id":"lecon_1_11","numero":"1.11","module":1,"duree_minutes":25,"theme":"LazyColumn et LazyRow dans Jetpack Compose","access":"teaser","fr":{"titre":"LazyColumn et LazyRow dans Jetpack Compose","objectif":"Ma\xeetriser l\'affichage de listes verticales et horizontales avec LazyColumn et LazyRow dans Jetpack Compose","preview_theorie":"Dans Jetpack Compose, LazyColumn et LazyRow remplacent les RecyclerView traditionnels pour afficher des listes de mani\xe8re efficace. LazyColumn cr\xe9e des listes verticales tandis que LazyRow cr\xe9e des listes horizontales. Ces composants ne rendent que les \xe9l\xe9ments visibles \xe0\u2026"},"en":{"titre":"LazyColumn and LazyRow in Jetpack Compose","objectif":"Master vertical and horizontal lists display with LazyColumn and LazyRow in Jetpack Compose","preview_theorie":"In Jetpack Compose, LazyColumn and LazyRow replace traditional RecyclerViews for displaying lists efficiently. LazyColumn creates vertical lists while LazyRow creates horizontal lists. These components only render visible items on screen, optimizing performance. LazyColumn uses\u2026"}},{"id":"lecon_1_12","numero":"1.12","module":1,"duree_minutes":25,"theme":"Navigation entre \xe9crans avec Jetpack Compose Navigation","access":"teaser","fr":{"titre":"Navigation entre \xe9crans avec Jetpack Compose Navigation","objectif":"Ma\xeetriser la navigation d\xe9clarative entre plusieurs \xe9crans dans Jetpack Compose","preview_theorie":"La navigation entre les \xe9crans dans Jetpack Compose repose sur un syst\xe8me de graphiques de navigation d\xe9clar\xe9 dans un fichier de type NavHost. Chaque \xe9cran est repr\xe9sent\xe9 par une destination identifi\xe9e par une cha\xeene de route, et la transition d\u2019un \xe9cran \xe0 un autre s\u2019effectue en\u2026"},"en":{"titre":"Navigation Between Screens with Jetpack Compose Navigation","objectif":"Master declarative navigation across multiple screens in Jetpack Compose","preview_theorie":"The navigation system in Jetpack Compose is built around a navigation graph hosted by a NavHost composable. Each screen corresponds to a destination identified by a route string, and moving from one screen to another is performed by calling navController.navigate(route) from a\u2026"}},{"id":"lecon_1_13","numero":"1.13","module":1,"duree_minutes":25,"theme":"Permissions Android : Demander et g\xe9rer les permissions en temps r\xe9el","access":"teaser","fr":{"titre":"Permissions Android : Demander et g\xe9rer les permissions en temps r\xe9el","objectif":"Comprendre comment demander, v\xe9rifier et d\xe9clarer les permissions \xe0 l\'ex\xe9cution dans une application Android, et savoir les g\xe9rer de mani\xe8re r\xe9active.","preview_theorie":"Dans le d\xe9veloppement Android moderne, les permissions constituent une barri\xe8re essentielle entre l\'application et les fonctionnalit\xe9s du syst\xe8me d\'exploitation. Les permissions sont class\xe9es en deux cat\xe9gories : les permissions dangerous, qui n\xe9cessitent l\'accord explicite de\u2026"},"en":{"titre":"Android Permissions: Requesting and Managing Runtime Permissions","objectif":"Understand how to declare, request, and handle runtime permissions in an Android app, and learn how to manage them reactively.","preview_theorie":"In modern Android development, permissions act as a critical barrier between your app and the operating system\'s features. Permissions are divided into two groups: normal permissions, which are granted automatically at install time, and dangerous permissions, which must be\u2026"}},{"id":"lecon_1_14","numero":"1.14","module":1,"duree_minutes":25,"theme":"Le\xe7on 1.14 - DataStore pour stocker des donn\xe9es localement : remplacement moderne de SharedPreferences","access":"teaser","fr":{"titre":"Le\xe7on 1.14 - DataStore pour stocker des donn\xe9es localement : remplacement moderne de SharedPreferences","objectif":"Comprendre comment utiliser DataStore pour stocker des donn\xe9es de mani\xe8re s\xe9curis\xe9e et moderne sur Android","preview_theorie":"DataStore est la nouvelle biblioth\xe8que recommand\xe9e par Google pour le stockage de donn\xe9es sur Android, con\xe7ue pour remplacer SharedPreferences. Contrairement \xe0 SharedPreferences qui stocke les donn\xe9es sous forme de paires cl\xe9-valeur avec un acc\xe8s synchrone, DataStore offre deux\u2026"},"en":{"titre":"Lesson 1.14 - DataStore for local data storage: modern replacement for SharedPreferences","objectif":"Understand how to use DataStore to store data securely and modernly on Android","preview_theorie":"DataStore is Google\'s new recommended library for data storage on Android, designed to replace SharedPreferences. Unlike SharedPreferences which stores data as key-value pairs with synchronous access, DataStore offers two implementations: Proto DataStore for structured data\u2026"}},{"id":"lecon_1_15","numero":"1.15","module":1,"duree_minutes":25,"theme":"Projet fil rouge : construire une app Todo complete avec Jetpack Compose","access":"teaser","fr":{"titre":"Projet fil rouge : construire une app Todo complete avec Jetpack Compose","objectif":"\xc0 la fin de cette le\xe7on, l\'apprenant sera capable de concevoir et impl\xe9menter une application Todo fonctionnelle en utilisant Jetpack Compose, en int\xe9grant les concepts vus dans les le\xe7ons pr\xe9c\xe9dentes (Composables, state, layout, etc.).","preview_theorie":"Jetpack Compose est un toolkit moderne pour construire des UI natives sur Android. Dans ce projet fil rouge, nous allons cr\xe9er une application Todo compl\xe8te qui permet d\'ajouter, de lister, de marquer comme termin\xe9e et de supprimer des t\xe2ches. Cette application nous permettra de\u2026"},"en":{"titre":"Capstone Project: Build a Complete Todo App with Jetpack Compose","objectif":"By the end of this lesson, the learner will be able to design and implement a functional Todo application using Jetpack Compose, integrating concepts from previous lessons (Composables, state, layout, etc.).","preview_theorie":"Jetpack Compose is a modern toolkit for building native UI on Android. In this capstone project, we will create a complete Todo app that allows adding, listing, marking as completed, and deleting tasks. This app will let us practice key Compose concepts: Composables, state\u2026"}},{"id":"lecon_1_16","numero":"1.16","module":1,"duree_minutes":30,"theme":"ViewModel et architecture MVVM en Kotlin","access":"teaser","fr":{"titre":"ViewModel et architecture MVVM en Kotlin","objectif":"Comprendre l\'architecture MVVM et savoir utiliser ViewModel pour g\xe9rer l\'\xe9tat de l\'UI de mani\xe8re r\xe9active et persistante","preview_theorie":"L\'architecture MVVM (Model-View-ViewModel) est une approche de conception d\'applications Android qui s\xe9pare clairement la logique m\xe9tier, la logique d\'affichage et l\'\xe9tat de l\'interface utilisateur. Le Model repr\xe9sente les donn\xe9es et la logique m\xe9tier, la View est l\'interface\u2026"},"en":{"titre":"ViewModel and MVVM Architecture in Kotlin","objectif":"Understand the MVVM architecture and learn to use ViewModel to manage UI state reactively and persistently","preview_theorie":"The MVVM (Model-View-ViewModel) architecture is a design approach for Android applications that clearly separates business logic, display logic, and user interface state. The Model represents data and business logic, the View is the user interface (Compose composables or XML\u2026"}},{"id":"lecon_1_17","numero":"1.17","module":1,"duree_minutes":30,"theme":"Room Database et stockage local","access":"teaser","fr":{"titre":"Room Database et stockage local","objectif":"Comprendre comment utiliser Room Database pour stocker et r\xe9cup\xe9rer des donn\xe9es localement dans une application Android","preview_theorie":"Room Database est la couche d\'abstraction recommand\xe9e par Google pour travailler avec des bases de donn\xe9es SQLite sur Android. Room fournit une abstraction au-dessus de SQLite qui permet d\'acc\xe9der \xe0 la base de donn\xe9es de mani\xe8re plus conviviale et plus s\xfbre, tout en conservant\u2026"},"en":{"titre":"Room Database and Local Storage","objectif":"Understand how to use Room Database to store and retrieve data locally in an Android application","preview_theorie":"Room Database is Google\'s recommended abstraction layer for working with SQLite databases on Android. Room provides an abstraction over SQLite that allows accessing the database in a more convenient and safe way, while preserving the power of SQL.\\n\\nRoom consists of three main\u2026"}},{"id":"lecon_1_18","numero":"1.18","module":1,"duree_minutes":25,"theme":"Navigation avanc\xe9e avec Compose Navigation","access":"teaser","fr":{"titre":"Navigation avanc\xe9e avec Compose Navigation","objectif":"Ma\xeetriser les fonctionnalit\xe9s avanc\xe9es de Compose Navigation pour cr\xe9er des applications Android complexes","preview_theorie":"Compose Navigation est la biblioth\xe8que recommand\xe9e par Google pour g\xe9rer la navigation entre les \xe9crans dans les applications Jetpack Compose. Elle fournit un syst\xe8me d\xe9claratif pour d\xe9finir les graphiques de navigation, g\xe9rer la back stack, et passer des arguments entre les\u2026"},"en":{"titre":"Advanced Navigation with Compose Navigation","objectif":"Master advanced Compose Navigation features for building complex Android applications","preview_theorie":"Compose Navigation is Google\'s recommended library for managing navigation between screens in Jetpack Compose applications. It provides a declarative system to define navigation graphs, manage the back stack, and pass arguments between destinations.\\n\\nBeyond the basic\u2026"}},{"id":"lecon_1_19","numero":"1.19","module":1,"duree_minutes":30,"theme":"Coroutines et Flow pour les op\xe9rations asynchrones","access":"teaser","fr":{"titre":"Coroutines et Flow pour les op\xe9rations asynchrones","objectif":"Comprendre et ma\xeetriser les coroutines Kotlin et Flow pour g\xe9rer efficacement les op\xe9rations asynchrones dans une application Android","preview_theorie":"Les coroutines Kotlin sont un m\xe9canisme l\xe9ger pour l\'ex\xe9cution asynchrone qui permet d\'\xe9crire du code asynchrone de mani\xe8re s\xe9quentielle et lisible. Contrairement aux threads traditionnels qui sont co\xfbteux en ressources, les coroutines peuvent \xeatre des milliers \xe0 s\'ex\xe9cuter sur\u2026"},"en":{"titre":"Coroutines and Flow for Asynchronous Operations","objectif":"Understand and master Kotlin coroutines and Flow to efficiently handle asynchronous operations in an Android application","preview_theorie":"Kotlin coroutines are a lightweight mechanism for asynchronous execution that allows writing asynchronous code in a sequential and readable manner. Unlike traditional threads which are resource-intensive, thousands of coroutines can run on just a few threads. They are ideal for\u2026"}},{"id":"lecon_1_20","numero":"1.20","module":1,"duree_minutes":25,"theme":"Tests unitaires et tests d\'interface utilisateur","access":"teaser","fr":{"titre":"Tests unitaires et tests d\'interface utilisateur","objectif":"Comprendre les diff\xe9rentes approches de test en Android et savoir \xe9crire des tests unitaires et des tests d\'interface utilisateur","preview_theorie":"Les tests sont essentiels pour garantir la qualit\xe9 et la fiabilit\xe9 d\'une application Android. Il existe plusieurs types de tests : les tests unitaires, qui testent des fonctions ou classes individuelles en isolation ; les tests d\'int\xe9gration, qui testent l\'interaction entre\u2026"},"en":{"titre":"Unit Tests and UI Testing","objectif":"Understand different testing approaches in Android and learn to write unit tests and UI tests","preview_theorie":"Testing is essential to ensure the quality and reliability of an Android application. There are several types of tests: unit tests, which test individual functions or classes in isolation; integration tests, which test the interaction between multiple components; and UI tests,\u2026"}},{"id":"lecon_2_1","numero":"2.1","module":2,"duree_minutes":30,"theme":"Architecture d\'application et Clean Architecture","access":"teaser","fr":{"titre":"Architecture d\'application et Clean Architecture","objectif":"Comprendre les principes de l\'architecture logicielle et appliquer le pattern Clean Architecture dans une application Android","preview_theorie":"L\'architecture d\'une application d\xe9termine comment le code estorganis\xe9e en couches et comment ces couches interagissent. Une bonne architecture rend le code plus maintenable, testable, et \xe9volutable. Les patterns architecturaux populaires incluent MVC (Model-View-Controller),\u2026"},"en":{"titre":"Application Architecture and Clean Architecture","objectif":"Understand software architecture principles and apply Clean Architecture pattern in an Android application","preview_theorie":"Application architecture determines how code is organized into layers and how these layers interact. Good architecture makes code more maintainable, testable, and evolvable. Popular architectural patterns include MVC (Model-View-Controller), MVP (Model-View-Presenter), and MVVM\u2026"}},{"id":"lecon_2_2","numero":"2.2","module":2,"duree_minutes":25,"theme":"Dependency Injection avec Hilt","access":"teaser","fr":{"titre":"Dependency Injection avec Hilt","objectif":"Comprendre le concept de Dependency Injection et savoir utiliser Hilt pour g\xe9rer les d\xe9pendances dans une application Android","preview_theorie":"La Dependency Injection (DI) est un pattern de conception qui permet de fournir les d\xe9pendances d\'une classe de mani\xe8re externe plut\xf4t que de les cr\xe9er \xe0 l\'int\xe9rieur. Cela rend le code plus testable, modulaire et d\xe9coupl\xe9. Au lieu qu\'une classe cr\xe9e ses d\xe9pendances avec \'new\',\u2026"},"en":{"titre":"Dependency Injection with Hilt","objectif":"Understand the Dependency Injection concept and learn to use Hilt to manage dependencies in an Android application","preview_theorie":"Dependency Injection (DI) is a design pattern that provides dependencies to a class externally rather than creating them internally. This makes code more testable, modular, and decoupled. Instead of a class creating its dependencies with \'new\', it receives them via constructor,\u2026"}}]');

},{}]},["03dYU","kBTrB"], "kBTrB", "parcelRequire6aa4", {})

//# sourceMappingURL=formation.3490138c.js.map
