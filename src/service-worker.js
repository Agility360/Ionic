/**
 * Check out

    https://googlechrome.github.io/sw-toolbox/

    further reading:
    https://googlechrome.github.io/sw-toolbox/usage.html#main
    https://github.com/GoogleChrome/samples/blob/gh-pages/service-worker/read-through-caching/service-worker.js

 * for more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'ionic-cache',
  maxAgeSeconds: 60 * 60 * 1, // 60 seconds * 60 minutes * X days
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
    'manifest.json',
    './assets/img/favicon.ico',
    './assets/img/arrow-left.png',
    './assets/img/arrow-right.png',
    './assets/img/error_cloud_filled.png'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.cacheFirst);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
//self.toolbox.router.default = self.toolbox.networkFirst;
self.toolbox.router.default = self.toolbox.cacheFirst;
