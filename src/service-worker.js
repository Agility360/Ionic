/**
 * Check out

    https://googlechrome.github.io/sw-toolbox/
    https://googlechrome.github.io/sw-toolbox/usage.html#main
    https://github.com/GoogleChrome/samples/blob/gh-pages/service-worker/read-through-caching/service-worker.js

 * for more info on how to use sw-toolbox to custom configure your service worker.

  Note: caching is only enabled if the device is offline.

 */


'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'ionic-cache',
  maxAgeSeconds: 60 * 60 * 24,
  maxEntries: null
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/vendor.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.cacheFirst);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;
