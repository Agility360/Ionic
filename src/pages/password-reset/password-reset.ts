import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';


import { Cognito } from '../../providers/aws.cognito';
import { LoginPage } from '../login/login';
import { DEBUG_MODE } from '../../shared/constants';


@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {

  public formGroup: FormGroup;
  public errMsg: any;
  public verificationCode: string;
  public newPassword: string;
  public ReenterNewPassword: string;

  private username: string;
  private cognitoUser: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public cognito: Cognito,
      public formBuilder: FormBuilder,
      private alertCtrl: AlertController) {

    if (DEBUG_MODE) console.log('PasswordResetPage.constructor()');

    this.username = navParams.get('username');
    this.cognitoUser = this.cognito.makeUser(this.username);


    /* Cognito -- start forgotten password work flow */
    this.cognitoUser.forgotPassword({
      onSuccess: function(result) {
        if (DEBUG_MODE) console.log('PasswordResetPage.constructor() cognitoUser.forgotPassword - Success:', result);
      },
      onFailure: function(err) {
        if (DEBUG_MODE) console.log('PasswordResetPage.constructor() cognitoUser.forgotPassword - Error:', err);
      },
      inputVerificationCode: function() {
        if (DEBUG_MODE) console.log('PasswordResetPage.constructor() cognitoUser.forgotPassword - inputVerificationCode:');

      }
    });

    /* setup form validators */
      this.formGroup = formBuilder.group({
        'verificationCode': [
          '',
          Validators.compose([Validators.required, Validators.minLength(5)])
        ],
        'newPassword': [
          '',
          Validators.compose([Validators.required, Validators.minLength(8)])
        ],
        'ReenterNewPassword': [
          '',
          Validators.compose([Validators.required, this.validateRepeatPassword.bind(this)])
        ]
      });


  }

  passwordReset() {
    if (DEBUG_MODE) console.log('PasswordResetPage.passwordReset()', this.verificationCode, this.newPassword, this.cognitoUser);

    if (this.formValidate()) this.cognitoUser.confirmPassword(this.verificationCode, this.newPassword, this.cognitoUser)
      .onSuccess(result => {
        if (DEBUG_MODE) console.log('PasswordResetPage.passwordReset() cognitoUser.confirmPassword - Success:', result);
/*
        this.navCtrl.setRoot(LoginPage);
*/
        let alert = this.alertCtrl.create({
          title: 'Success',
          message: result,
          buttons: ['OK']
        });

        alert.present(alert);

      })
      .onFailure(err => {
        if (DEBUG_MODE) console.log('PasswordResetPage.passwordReset() cognitoUser.confirmPassword - Error:', err);

        let alert = this.alertCtrl.create({
          title: 'Error',
          message: err,
          buttons: ['OK']
        });

        alert.present(alert);

      });

  }

  login() {
    if (DEBUG_MODE) console.log('PasswordResetPage.login()');
    this.navCtrl.push(LoginPage);
  }

  validateRepeatPassword(control: AbstractControl): {[key: string]: any} {
    if (DEBUG_MODE) console.log('PasswordResetPage.validateRepeatPassword()');
    return null;

/*
    if (control.value != this.newPassword) {
      return null;
    } else {
      return { validateRepeatPassword: true };
    }
*/
  }

  ionViewDidLoad() {
    if (DEBUG_MODE) console.log('PasswordResetPage.ionViewDidLoad()');
  }


  formValidate(): boolean {
    if (DEBUG_MODE) console.log('PasswordResetPage.formValidate()');

    if (this.formGroup.valid) {
      return true;
    }

    // figure out the error message
    let errorMsg = '';

    // validate each field
    let control = this.formGroup.controls['verificationCode'];
    if (!control.valid) {
      if (control.errors['required']) {
        errorMsg = 'Please provide your 5-digit verification code';
      } else if (control.errors['minlength']) {
        errorMsg = 'The verification code should be exactly 5 digits';
      }
    }

    // validate password ...
    control = this.formGroup.controls['newPassword'];
    if (!control.valid) {
      if (control.errors['required']) {
        errorMsg = 'Please provide a new password';
      } else if (control.errors['minlength']) {
        errorMsg = 'The new password should be at least 5 characters';
      }
    }


    // validate repeat password ...
    control = this.formGroup.controls['ReenterNewPassword'];
    if (!control.valid) {
      if (control.errors['required']) {
        errorMsg = 'Please re-enter the new password';
      } else if (control.errors['validateRepeatPassword']) {
        errorMsg = 'Passwords do not match';
      }
    }

    let alert = this.alertCtrl.create({
      //title: 'Error!',
      subTitle: errorMsg || 'Empty error message!',
      buttons: ['OK']
    });

    alert.present(alert);

    return false;
  }


}
