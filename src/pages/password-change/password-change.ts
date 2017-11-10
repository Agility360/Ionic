import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { Cognito } from '../../providers/aws.cognito';
import { User } from '../../providers/providers';
import { DEBUG_MODE } from '../../shared/constants';

@IonicPage()
@Component({
  selector: 'page-password-change',
  templateUrl: 'password-change.html',
})
export class PasswordChangePage {

  public formGroup: FormGroup;
  public currentPassword: string;
  public newPassword: string;
  public ReenterNewPassword: string;

  public errMsg: string;
  public successMsg: string;

  private cognitoUser: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public user: User,
    public cognito: Cognito,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController) {

    if (DEBUG_MODE) console.log('PasswordChangePage.constructor()');

    this.cognitoUser = this.cognito.getCurrentUser();
    /*
    regarding the next line:
    -----------------------
       1.) look for comment from mreddyg jun 29, 2016: https://github.com/aws/amazon-cognito-identity-js/issues/71

       2.) even that example sucks.
           better explanation of how to get user's session data is here: http://docs.aws.amazon.com/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html
    */
    if (this.cognitoUser != null) {
      this.cognitoUser.getSession(function(err, session) {
          if (err) {
            if (DEBUG_MODE) console.log('PasswordChangePage.constructor() - this.cognitoUser.getSession() - error: ', err);
              return;
          }
          if (DEBUG_MODE) console.log('PasswordChangePage.constructor() - this.cognitoUser.getSession() - Session: ', session);
      });
    }

    /* setup form validators */
    this.formGroup = formBuilder.group({
      'currentPassword': [
        '',
        Validators.compose([Validators.required])
      ],
      'newPassword': [
        '',
        Validators.compose([Validators.required])
      ],
      'ReenterNewPassword': [
        '',
        Validators.compose([Validators.required])
      ]
    });


  }

  changePassword() {
    if (DEBUG_MODE) console.log('PasswordChangePage.changePassword() - cognitoUser: ', this.cognitoUser);

    if (!this.formValidate()) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'Form contains invalid data.',
        buttons: ['OK']
      });

      alert.present();
      return;
    }

    this.cognito.changePassword(this.currentPassword, this.newPassword)
    .then(result => {
      if (DEBUG_MODE) console.log('PasswordChangePage.changePassword() - result: ', result);

      let alert = this.alertCtrl.create({
        title: 'Change Password',
        message: 'Your password has been changed',
        buttons: ['OK']
      });

      alert.present();
      return;
    })
    .catch(err => {
      if (DEBUG_MODE) console.log('PasswordChangePage.changePassword() - error: ', err);

      let alert = this.alertCtrl.create({
        title: 'Change Password',
        message: err,
        buttons: ['OK']
      });

      alert.present();
      return;
    });

  }


  ionViewDidLoad() {
    if (DEBUG_MODE) console.log('PasswordChangePage.ionViewDidLoad()');
  }


  formValidate(): boolean {
    if (DEBUG_MODE) console.log('PasswordChangePage.formValidate()');

    // figure out the error message
    let errorMsg: string = null;

    // validate password ...
    let control = this.formGroup.controls['newPassword'];
    if (!control.valid) {
      if (control.errors['required']) {
        errorMsg = 'Please provide a new password';
      }
    }

    // validate repeat password ...
    control = this.formGroup.controls['ReenterNewPassword'];
    if (!control.valid) {
      if (control.errors['required']) {
        errorMsg = 'Please re-enter the new password';
      }
    }

    if (errorMsg == null && this.newPassword != this.ReenterNewPassword) {
      errorMsg = 'Passwords do not match';
    }

    if (errorMsg != null) {
      let alert = this.alertCtrl.create({
        //title: 'Error!',
        subTitle: errorMsg || 'Empty error message!',
        buttons: ['OK']
      });

      alert.present(alert);
      return false;
    }

    if (this.formGroup.valid) {
      return true;
    }

    return false;
  }

}
