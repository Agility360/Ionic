import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { User } from '../../providers/user';

/*-----------------------------------------------------------------------
 * added by mcdaniel
 *-----------------------------------------------------------------------*/
import { DEBUG_MODE } from '../../shared/constants';
import { CandidateProvider } from '../../providers/candidate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
/*-----------------------------------------------------------------------
 *
 *-----------------------------------------------------------------------*/


@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html'
})
export class ConfirmPage {

  public code: number;
  public username: string;
  public errMess: string;

  /* added by mcdaniel */
  public candidate: any;
  public formGroup: FormGroup;
  public errorMsg: string = null;
  /* added by mcdaniel */


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public user: User,
    private candidateProvider: CandidateProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public formBuilder: FormBuilder) {

    /* modified by mcdaniel */
    this.candidate = navParams.get('candidate');
    this.username = this.candidate.account_name;
    if (DEBUG_MODE) console.log('ConfirmPage.constructor() - begin', this.username);
    /* modified by mcdaniel */

    /* setup form validators */
    this.formGroup = formBuilder.group({
      'code': [
        '',
        Validators.compose([Validators.required])
      ]
    });

    this.formGroup.valueChanges
      .subscribe(data => {
        if (DEBUG_MODE) console.log('formGroup.valueChanges.subscribe()', data);
        this.errorMsg = null;
      });

    if (DEBUG_MODE) console.log('ConfirmPage.constructor() - finished.');
  }

  codeDidBlur($event) {
    if (DEBUG_MODE) console.log('ConfirmPage.codeDidBlur()', $event);

    this.errorMsg = null;
    if ($event == null) return;

    if (this.code < 100000 || this.code > 999999) {
      this.errorMsg = 'The verification code should be exactly 6 digits.';
      return;
    }

    let control = this.formGroup.controls['code'];
    if (!control.valid) {
      if (control.errors['required']) {
        this.errorMsg = 'Please enter the 6-digit code from the Agility360 app email address verification.';
      }
    }

  }

  confirm() {
    if (DEBUG_MODE) console.log('ConfirmPage.confirm()', this.candidate);
    this.user.confirmRegistration(this.username, this.code)
    .then(() => {

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
          this.errMess = err;
          loading.dismiss();
        });

    })
    .catch((err) => {
      if (DEBUG_MODE) console.log('ConfirmPage.confirm() - user.confirmRegistration - error: ', err);
      this.errorMsg = err.message;
    })
  }

  resendCode() {
    this.user.resendRegistrationCode(this.username)
    .then(() => {
      if (DEBUG_MODE) console.log('ConfirmPage.resendCode() - success');

    })
    .catch((err) => {
      if (DEBUG_MODE) console.log('ConfirmPage.resendCode() - error', err);
      this.errorMsg = err.message;
    });
  }

  ionViewDidLoad() {
    if (DEBUG_MODE) console.log('ConfirmPage.ionViewDidLoad()');
  }


}
