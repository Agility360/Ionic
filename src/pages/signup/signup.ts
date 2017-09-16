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
  usernameValidationCode: number;
  emailValidationCode: number;
  passwordValidationCode: number;
}

/*-----------------------------------------------------------------------
 * added by mcdaniel
 *-----------------------------------------------------------------------*/
import { DEBUG_MODE } from '../../shared/constants';
import { Candidate } from '../../shared/candidate';
import { CandidateProvider } from '../../providers/candidate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
/*
import { PasswordValidator } from '../../validators/password';
import { UsernameValidator } from '../../validators/username';
import { EmailValidator } from '../../validators/email';
*/
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
  public errorMsg: string;
  error: any;

  public formGroup: FormGroup;

  constructor(public navCtrl: NavController,
    public user: User,
    private candidateProvider: CandidateProvider,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder) {

    if (DEBUG_MODE) console.log('SignupPage.constructor()');
    this.userDetails = new UserDetails();

    this.userDetails.usernameValidationCode = 0;
    this.userDetails.emailValidationCode = 0;
    this.userDetails.passwordValidationCode = 0;

    this.candidate = this.candidateProvider.new();
    this.error = null;
    this.errorMsg = null;

    /* setup form validators */
      this.formGroup = formBuilder.group({
        'username': [
          '',
          Validators.compose([Validators.required, Validators.minLength(8)])
        ],
        'email': [
          '',
          Validators.compose([Validators.required, Validators.email])
        ],
        'password': [
          '',
          Validators.compose([Validators.required, Validators.minLength(8)])
        ]
      });

      this.formGroup.valueChanges
        .subscribe(data => {
          if (DEBUG_MODE) console.log('formGroup.valueChanges.subscribe()', data);
          this.errorMsg = null;
        });

  }

  usernameDidBlur($event) {
    if (DEBUG_MODE) console.log('SignupPage.usernameDidBlur()', $event);

    this.errorMsg = null;
    if ($event == null) return;
    if (this.userDetails.username == null) return;

    let control = this.formGroup.controls['username'];
    if (!control.valid) {
      if (control.errors['required']) {
        this.errorMsg = 'Username is required';
      } else if (control.errors['minlength']) {
        this.errorMsg = 'Username should be at least 8 characters';
      }
    } else {
    }

  }

  emailDidBlur($event) {
    if (DEBUG_MODE) console.log('SignupPage.emailDidBlur()', $event);

    this.errorMsg = null;
    if ($event == null) return;
    if (this.userDetails.email == null) return;

    let control = this.formGroup.controls['email'];
    if (!control.valid) {
      if (control.errors['required']) {
        this.errorMsg = 'Email address is required';
      } else this.errorMsg = 'Please enter a valid email. Example: address@mailserver.com';
    } else {
    }

  }

  passwordDidBlur($event) {
    if (DEBUG_MODE) console.log('SignupPage.passwordDidBlur()', $event);

    this.errorMsg = null;
    if ($event == null) return;
    if (this.userDetails.password == null) return;

    let control = this.formGroup.controls['password'];
    if (!control.valid) {
      if (control.errors['required']) {
        this.errorMsg = 'Password is required';
      } else if (control.errors['minlength']) {
        this.errorMsg = 'Password should be at least 8 characters';
      }
    } else {
    }
  }

  signup() {

    if (DEBUG_MODE) console.log('SignupPage.signup()');
    if (!this.formValidate()) return

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
        this.errorMsg = err.message;
      });
  }

  login() {
    if (DEBUG_MODE) console.log('SignupPage.login()');
    this.navCtrl.push(LoginPage);
  }

  formValidate(): boolean {
    if (DEBUG_MODE) console.log('PasswordResetPage.formValidate()');
    this.errorMsg = null;

    if (this.formGroup.valid) {
      return true;
    }

    //begin investigating each control until we find the problem.

    return false;
  }



}
