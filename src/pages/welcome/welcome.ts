import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';

import { DEBUG_MODE } from '../../shared/constants';

/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams) {
        
    if (DEBUG_MODE) console.log('WelcomePage.constructor()');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  login() {
    if (DEBUG_MODE) console.log('WelcomePage.signup()');
    this.navCtrl.push(LoginPage);
  }

  signup() {
    if (DEBUG_MODE) console.log('WelcomePage.signup()');
    this.navCtrl.push(SignupPage);
  }

}
