import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { DEBUG_MODE } from '../../shared/constants';
import { Certification } from '../../shared/certification';
import { CertificationHistoryProvider } from '../../providers/certificationhistory';


@IonicPage()
@Component({
  selector: 'page-certification-detail',
  templateUrl: 'certification-detail.html',
})
export class CertificationDetailPage {

  obj: Certification;
  errMess: string;
  action: string;
  shouldConfirmWindowClose: boolean;
  today: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private provider: CertificationHistoryProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {

    if (DEBUG_MODE) console.log('EducationDetailPage.constructor() with obj: ', this.obj, this.action);

    this.obj = navParams.get('obj');
    this.action = navParams.get('action').toLowerCase();
    this.shouldConfirmWindowClose = true;

    /*----------------------------------------------
     * some explanation is merited for the following.
     * the Ionic Date Picker control uses a 2-way to a string representation of a date
     * formatted in ISO 8601 format. meanwhile, the underlying MySQL database that stores
     * any persisted data use IOS [some other format] which will result in the Date Picker
     * object not being initialized to a value.
     *
     * to resolve this cunundrum the following code converts the string representation to a date object
     * and then back to a string; albeit in ISO 8601 format.
     */
    if (this.obj.date_received.replace("None", "") != "") {
      this.obj.date_received = new Date(this.obj.date_received.replace("None", "")).toISOString();
    }
    if (this.obj.expire_date.replace("None", "") != "") {
      this.obj.expire_date = new Date(this.obj.expire_date.replace("None", "")).toISOString();
    }

  }

  processForm() {
    if (DEBUG_MODE) console.log('EducationDetailPage.processForm(): ', );

    if (this.action === 'add') {
      let toast = this.toastCtrl.create({
        message: 'Success.',
        duration: 2000
      });

      if (DEBUG_MODE) console.log('EducationDetailPage.processForm() - Adding obj: ', this.obj);
      this.provider.add(this.obj)
        .subscribe(obj => {
          if (DEBUG_MODE) console.log('EducationDetailPage.processForm() - Added obj: ', this.obj);
          toast.present();
          this.shouldConfirmWindowClose = false;
          /* this.navCtrl.getActiveChildNav() */
          this.exitPage();
        },
        errmess => {
          this.shouldConfirmWindowClose = true;
          this.errMess = errmess;
        });

    };
    if (this.action === 'edit') {
      let toast = this.toastCtrl.create({
        message: 'Saved.',
        duration: 2000
      });

      if (DEBUG_MODE) console.log('Updating obj: ', this.obj);
      this.provider.update(this.obj)
        .subscribe(dataObj => {
          if (DEBUG_MODE) console.log('Updated obj: ', dataObj);
          toast.present();
          this.shouldConfirmWindowClose = false;
          this.exitPage();
        },
        errmess => {
          this.shouldConfirmWindowClose = true;
          this.errMess = errmess;
        });

    };


  }

  ionViewDidLoad() {
    if (DEBUG_MODE) console.log('EducationDetailPage.ionViewDidLoad()');
  }


  ionViewCanLeave() {
    if (this.shouldConfirmWindowClose) {
      let alert = this.alertCtrl.create({
        title: 'Exit',
        message: 'Discard changes?',
        buttons: [{
          text: 'Discard',
          handler: () => {
            this.exitPage();
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            // need to do something if the user stays?
          }
        }]
      });

      // Show the alert
      alert.present();

      // Return false to avoid the page to be popped up
      return false;
    }
  }

  private exitPage() {
    this.shouldConfirmWindowClose = false;
    this.navCtrl.pop();
  }


}
