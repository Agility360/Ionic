cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-document-viewer.SitewaertsDocumentViewer",
    "file": "plugins/cordova-plugin-document-viewer/www/sitewaertsdocumentviewer.js",
    "pluginId": "cordova-plugin-document-viewer",
    "clobbers": [
      "cordova.plugins.SitewaertsDocumentViewer",
      "SitewaertsDocumentViewer"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "cordova-plugin-statusbar.statusbar",
    "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
    "pluginId": "cordova-plugin-statusbar",
    "clobbers": [
      "window.StatusBar"
    ]
  },
  {
    "id": "ionic-plugin-keyboard.keyboard",
    "file": "plugins/ionic-plugin-keyboard/www/ios/keyboard.js",
    "pluginId": "ionic-plugin-keyboard",
    "clobbers": [
      "cordova.plugins.Keyboard"
    ],
    "runs": true
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-document-viewer": "0.9.5",
  "cordova-plugin-device": "1.1.7",
  "cordova-plugin-splashscreen": "4.1.0",
  "cordova-plugin-statusbar": "2.3.0",
  "cordova-plugin-whitelist": "1.3.3",
  "ionic-plugin-keyboard": "2.2.1"
};
// BOTTOM OF METADATA
});