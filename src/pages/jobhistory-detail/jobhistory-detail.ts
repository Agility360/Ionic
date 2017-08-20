import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { JobHistoryProvider } from '../../providers/jobhistory';
import { ActionSheetController } from 'ionic-angular'
import { Job } from '../../shared/job';

/**
 * Generated class for the JobhistoryDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jobhistory-detail',
  templateUrl: 'jobhistory-detail.html',
})
export class JobhistoryDetailPage {

  job: Job;
  errMess: string;
  action: string;
  shouldConfirmWindowClose: boolean;

  constructor(public navCtrl: NavController,
        public navParams: NavParams,
        @Inject('BaseURL') private BaseURL,
        private jobservice: JobHistoryProvider,
        private actionSheetCtrl: ActionSheetController,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController) {

        console.log('JobhistoryDetailPage.constructor() with job: ', this.job, this.action);

        this.job = navParams.get('job');
        this.action = navParams.get('action').toLowerCase();
        this.shouldConfirmWindowClose = true;
    }

  processForm() {
    console.log('JobhistoryDetailPage.processForm(): ', );

    if (this.action === 'add') {
      /*=======================================================
       * Add a new Job
       *=======================================================*/

      let loading = this.loadingCtrl.create({
        content: 'Adding job ...'
      });

      let toast = this.toastCtrl.create({
        message: 'Success.',
        duration: 2000
      });

      loading.present();

      console.log('JobhistoryDetailPage.processForm() - Adding job: ', this.job);
      this.jobservice.addJobHistory(this.job)
        .subscribe(job => {
                    this.job = job;
                    loading.dismiss();
                    toast.present();
                    this.shouldConfirmWindowClose = false;
                    this.navCtrl.getActiveChildNav()
                    console.log('JobhistoryDetailPage.processForm() - Added job: ', this.job);
                  },
                  errmess => {
                    this.shouldConfirmWindowClose = true;
                    this.errMess = errmess; loading.dismiss();
                  });

    };
    if (this.action === 'edit') {
      let loading = this.loadingCtrl.create({
        content: 'Updating ...'
      });

      let toast = this.toastCtrl.create({
        message: 'Saved.',
        duration: 2000
      });

      loading.present();

      console.log('Updating job: ', this.job);
      this.jobservice.updateJobHistory(this.job)
          .subscribe(job => {
                      this.job = job;
                      loading.dismiss();
                      toast.present();
                      this.shouldConfirmWindowClose = false;
                      console.log('Updated job: ', job);
                    },
                    errmess => {
                      this.shouldConfirmWindowClose = true;
                      this.errMess = errmess; loading.dismiss();
                    });

    };


  }

  ionViewDidLoad() {
    console.log('JobhistoryDetailPage.ionViewDidLoad()');
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
