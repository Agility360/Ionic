import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { DEBUG_MODE } from '../../shared/constants';
import { Candidate } from '../../shared/candidate';
import { CandidateProvider } from '../../providers/candidate';


@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {

  public obj: Candidate;
  error: any;
  private shouldConfirmWindowClose: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private provider: CandidateProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {

      if (DEBUG_MODE) console.log('ProfileEditPage.constructor()');
      this.obj = navParams.get('obj');
      this.shouldConfirmWindowClose = true;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
  }

  save() {
    if (DEBUG_MODE) console.log('ProfileEditPage.save(): ', );

    let toast = this.toastCtrl.create({
      message: 'Success.',
      duration: 2000
    });


    this.provider.update(this.obj)
      .subscribe(obj => {
        if (DEBUG_MODE) console.log('EducationDetailPage.processForm() - Added obj: ', this.obj);
        toast.present();
        this.shouldConfirmWindowClose = false;
        /* this.navCtrl.getActiveChildNav() */
        this.exitPage();
      },
      error => {
        this.shouldConfirmWindowClose = true;
        this.error = error;
      });



  }

  private exitPage() {
    this.shouldConfirmWindowClose = false;
    this.navCtrl.pop();
  }

}
