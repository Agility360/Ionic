/*-----------------------------------------------------------------------
 * from AWS starter app
 *-----------------------------------------------------------------------*/
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ConfirmPage } from '../confirm/confirm';
import { User } from '../../providers/user';
export class UserDetails {
    username: string;
    email: string;
    password: string;
}

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
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  public userDetails: UserDetails;
  public candidate: Candidate;

  error: any;

  constructor(public navCtrl: NavController,
              public user: User,
              private candidateProvider: CandidateProvider,
              public loadingCtrl: LoadingController) {

   if (DEBUG_MODE) console.log('SignupPage.constructor()');
   this.userDetails = new UserDetails();
   this.candidate = this.candidateProvider.new();

  }

  signup() {

    if (DEBUG_MODE) console.log('SignupPage.signup()');

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    let details = this.userDetails;
    this.error = null;

    if (DEBUG_MODE) console.log('SignupPage.signup() - beginning registration');
    this.user.register(details.username, details.password, {'email': details.email}).then((user) => {
      if (DEBUG_MODE) console.log('SignupPage.signup() - success. registered');
      loading.dismiss();
      this.candidate.email = details.email;
      this.candidate.account_name = details.username;
      this.navCtrl.push(ConfirmPage, { candidate: this.candidate });
    }).catch((err) => {
      if (DEBUG_MODE) console.log('SignupPage.signup() - registration error.');
      loading.dismiss();
      this.error = err;
    });
  }

  login() {
    if (DEBUG_MODE) console.log('SignupPage.login()');
    this.navCtrl.push(LoginPage);
  }

}
