import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';


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

  private cognitoUser: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public user: User,
    public cognito: Cognito,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController) {

    if (DEBUG_MODE) console.log('PasswordChangePage.constructor()');

    this.cognitoUser = this.cognito.makeUser(this.user.getUsername());

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
    if (DEBUG_MODE) console.log('PasswordChangePage.changePassword()');

    if (!this.formValidate()) return;

    this.cognitoUser.changePassword(this.currentPassword, this.newPassword, function(err, result) {
      if (err) {
        if (DEBUG_MODE) console.log('PasswordChangePage.changePassword() - error', err);
        let alert = this.alertCtrl.create({
          title: 'Error',
          message: err,
          buttons: ['OK']
        });

        alert.present(alert);
        return;
      }
      else {
        if (DEBUG_MODE) console.log('PasswordChangePage.changePassword() - success', result);
      }
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
