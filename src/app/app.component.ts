import { Component } from '@angular/core';
import { Config, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';

import { User } from '../providers/user';
import { DEBUG_MODE } from '../shared/constants';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = null;

  constructor(
      platform: Platform,
      statusBar: StatusBar,
      splashScreen: SplashScreen,
      user: User,
      public config: Config) {

    if (DEBUG_MODE) console.log('MyApp.constructor()');

    let globalActions = function() {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    };

    platform.ready().then(() => {
      user.isAuthenticated().then(() => {
        if (DEBUG_MODE) console.log('MyApp.constructor() - authenticated');
        this.rootPage = TabsPage;
        globalActions();
      }).catch(() => {
        if (DEBUG_MODE) console.log('MyApp.constructor() - not authenticated');
        this.rootPage = WelcomePage;
        globalActions();
      });
    });
  }
}
