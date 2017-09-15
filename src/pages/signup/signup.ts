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
import { DEBUG_MODE } from '../../shared/constants';
import { Candidate } from '../../shared/candidate';
import { CandidateProvider } from '../../providers/candidate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from '../../validators/password';
import { UsernameValidator } from '../../validators/username';
import { EmailValidator } from '../../validators/email';
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
  public repeatPassword: string;
  error: any;

  public formGroup: FormGroup;

  constructor(public navCtrl: NavController,
    public user: User,
    private candidateProvider: CandidateProvider,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder) {

    if (DEBUG_MODE) console.log('SignupPage.constructor()');
    this.userDetails = new UserDetails();
    this.candidate = this.candidateProvider.new();

    this.formGroup = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9_-]*')]), UsernameValidator.checkUsername],
      email: ['', Validators.compose([Validators.required, Validators.email]), EmailValidator.checkEmailaddress],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), PasswordValidator.isValid])],
      repeatPassword: ['']
    });

    user.isAvailable("mcdaniel");
  }

  validPassword(val: string) {
    if (DEBUG_MODE) console.log('SignupPage.validPassword()');

  }

  validPasswordAsync(val: string) {
    if (DEBUG_MODE) console.log('SignupPage.validPasswordAsync()');

  }

  signup() {

    if (DEBUG_MODE) console.log('SignupPage.signup()');
    if (!this.formGroup.valid) return;

    let loading = this.loadingCtrl.create({
      content: 'Registering new account ...'
    });
    loading.present();

    let details = this.userDetails;
    this.error = null;

    if (DEBUG_MODE) console.log('SignupPage.signup() - beginning registration');
    this.user.register(details.username, details.password, { 'email': details.email })
      .then((user) => {
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
