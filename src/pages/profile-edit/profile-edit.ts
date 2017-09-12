import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { DEBUG_MODE } from '../../shared/constants';
import { Candidate } from '../../shared/candidate';
import { CandidateProvider } from '../../providers/candidate';


@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {

  public candidate: Candidate;
  error: any;
  private shouldConfirmWindowClose: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private candidateProvider: CandidateProvider,
    public loadingCtrl: LoadingController) {

      if (DEBUG_MODE) console.log('ProfileEditPage.constructor()');
      this.candidate = navParams.get('obj');
      this.shouldConfirmWindowClose = true;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
  }

  save() {

  }
}
