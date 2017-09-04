import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { User } from '../../providers/providers';
import { DEBUG_MODE } from '../../shared/constants';
import { LoginPage } from '../login/login';


/**
 * Generated class for the DeleteAccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delete-account',
  templateUrl: 'delete-account.html',
})
export class DeleteAccountPage {

  constructor(public navCtrl: NavController,
    public user: User,
    public app: App,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('DeleteAccountPage.ionViewDidLoad()');
  }

  deleteAccount() {
    if (DEBUG_MODE) console.log('DeleteAccountPage.deleteAccount()');
    let alert = this.alertCtrl.create({
      title: 'Delete Account',
      message: 'Are you sure you want to delete your account? This cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            if (DEBUG_MODE) console.log('Delete cancelled.');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.user.logout();
            this.app.getRootNav().setRoot(LoginPage);
          }
        }
      ]
    }
    );

    alert.present();

  }

}
