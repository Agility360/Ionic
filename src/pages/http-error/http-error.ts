import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HttpErrorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-http-error',
  templateUrl: 'http-error.html',
})
export class HttpErrorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HttpErrorPage');
  }

  RetryButtonClick() {
    console.log('RetryButtonClick()');
    this.navCtrl.pop();
  }
}
