import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { ConfirmPage } from '../confirm/confirm';
import { User } from '../../providers/providers';

export class LoginDetails {
  username: string;
  password: string;
}

/*-----------------------------------------------------------------------
 * added by mcdaniel
 *-----------------------------------------------------------------------*/
import { DEBUG_MODE } from '../../shared/constants';
import { Candidate } from '../../shared/candidate';
import { CandidateProvider } from '../../providers/candidate';
/*-----------------------------------------------------------------------
 *
 *-----------------------------------------------------------------------*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginDetails: LoginDetails;
  public candidate: Candidate;
  public errMsg: string;

  constructor(public navCtrl: NavController,
    public user: User,
    private candidateProvider: CandidateProvider,
    public loadingCtrl: LoadingController) {

    if (DEBUG_MODE) console.log('LoginPage.constructor()');
    this.loginDetails = new LoginDetails();
  }

  login() {
    if (DEBUG_MODE) console.log('LoginPage.login()');
    this.errMsg = '';

    let loading = this.loadingCtrl.create({
      content: 'Authenticating ...'
    });
    loading.present();

    let details = this.loginDetails;
    console.log('login..');
    this.user.login(details.username, details.password).then((result) => {
      if (DEBUG_MODE) console.log('LoginPage.login() - result:', result);
      loading.dismiss();
      this.navCtrl.setRoot(TabsPage);
    }).catch((err) => {
      if (DEBUG_MODE) console.log('LoginPage.login() - error:', err);
      loading.dismiss();
      this.errMsg = err.message;
      if (err.message === "User is not confirmed.") {
        loading.dismiss();
        this.candidate = this.candidateProvider.new();
        this.candidate.account_name = details.username;
        this.navCtrl.push(ConfirmPage, { candidate: this.candidate });
      }
    });
  }

  signup() {
    if (DEBUG_MODE) console.log('LoginPage.signup()');
    this.navCtrl.push(SignupPage);
  }

  forgotPassword() {
    if (DEBUG_MODE) console.log('LoginPage.forgotPassword()');
    this.user.forgotPassword(this.loginDetails.username);
  }

}
