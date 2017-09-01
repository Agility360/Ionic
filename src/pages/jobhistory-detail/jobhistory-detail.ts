import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import { apiURL, DEBUG_MODE } from '../../shared/constants';
import { Job } from '../../shared/job';
import { JobHistoryProvider } from '../../providers/jobhistory';

@IonicPage()
@Component({
  selector: 'page-jobhistory-detail',
  templateUrl: 'jobhistory-detail.html',
})
export class JobhistoryDetailPage {

  obj: Job;
  errMess: string;
  action: string;
  shouldConfirmWindowClose: boolean;

  constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private provider: JobHistoryProvider,
        private actionSheetCtrl: ActionSheetController,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController) {

        if (DEBUG_MODE) console.log('JobhistoryDetailPage.constructor() with obj: ', this.obj, this.action);

        this.obj = navParams.get('obj');
        this.action = navParams.get('action').toLowerCase();
        this.shouldConfirmWindowClose = true;
    }

  processForm() {
    if (DEBUG_MODE) console.log('JobhistoryDetailPage.processForm(): ', );

    if (this.action === 'add') {

      let toast = this.toastCtrl.create({
        message: 'Success.',
        duration: 2000
      });

      if (DEBUG_MODE) console.log('JobhistoryDetailPage.processForm() - Adding obj: ', this.obj);
      this.provider.add(this.obj)
        .subscribe(job => {
                    this.obj = job;
                    toast.present();
                    this.shouldConfirmWindowClose = false;
                    this.navCtrl.getActiveChildNav()
                    if (DEBUG_MODE) console.log('JobhistoryDetailPage.processForm() - Added obj: ', this.obj);
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
                      if (DEBUG_MODE) console.log('Updated job: ', dataObj);
                      /* this.obj = dataObj[0]; */
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
    if (DEBUG_MODE) console.log('JobhistoryDetailPage.ionViewDidLoad()');
  }


 ionViewCanLeave() {
     if(this.shouldConfirmWindowClose) {
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
