import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { User } from '../../providers/user';

/*-----------------------------------------------------------------------
 * added by mcdaniel
 *-----------------------------------------------------------------------*/
import { apiURL, DEBUG_MODE } from '../../shared/constants';
import { Candidate } from '../../shared/candidate';
import { CandidateProvider } from '../../providers/candidate';
/*-----------------------------------------------------------------------
 *
 *-----------------------------------------------------------------------*/



@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html'
})
export class ConfirmPage {

  public code: string;
  public username: string;
  public errMess: string;

  /* added by mcdaniel */
  public candidate: any;
  public candidateProvider: CandidateProvider;
  /* added by mcdaniel */


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public user: User,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {

    /* modified by mcdaniel */
    this.candidate = navParams.get('candidate');
    this.username = this.candidate.account_name;
    /* modified by mcdaniel */

  }

  confirm() {
    this.user.confirmRegistration(this.username, this.code).then(() => {

      /* mcdaniel: some user experience improvements to the starter app */
      let loading = this.loadingCtrl.create({
        content: 'Email confirmed. Setting up your account ...'
      });

      let toast = this.toastCtrl.create({
        message: 'Your account is ready.',
        duration: 2000
      });

      loading.present();

      /* mcdaniel: hook to create MySQL candidate master record */
      this.candidateProvider.add(this.candidate)
          .subscribe(obj => {
                      this.candidate = obj;
                      loading.dismiss();
                      toast.present();
                      this.navCtrl.push(LoginPage);
                      if (DEBUG_MODE) console.log('ConfirmPage.confirm() - Added obj: ', this.candidate);
                    },
                    err => {
                      if (DEBUG_MODE) console.log('ConfirmPage.confirm() - error: ', err);
                      this.errMess = err; loading.dismiss();
                    });

    });
  }

  resendCode() {
    this.user.resendRegistrationCode(this.username);
  }


}
