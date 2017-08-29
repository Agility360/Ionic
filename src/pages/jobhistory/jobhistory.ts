import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { apiURL, DEBUG_MODE } from '../../shared/constants';
import { Job } from '../../shared/job';
import { JobHistoryProvider } from '../../providers/jobhistory';
import { JobhistoryDetailPage } from '../jobhistory-detail/jobhistory-detail';


@IonicPage()
@Component({
  selector: 'page-jobhistory',
  templateUrl: 'jobhistory.html',
})

export class JobhistoryPage {

  cards: Job[];
  errMess: string;

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private provider: JobHistoryProvider,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController
    ) {
        if (DEBUG_MODE) console.log('constructor JobhistoryPage');
  }

  ionViewWillEnter() {
    if (DEBUG_MODE) console.log('JobhistoryPage.ionViewWillEnter()');
    this.get();
  }

  refresh(refresher) {
      setTimeout(() => {
        if (DEBUG_MODE) console.log('JobhistoryPage.refresh()');
        this.get();
        refresher.complete();
      }, 500);
  }


  get() {
    if (DEBUG_MODE) console.log('JobhistoryPage.get()');
    this.provider.get()
      .subscribe(
        results => {
        this.cards = results
        },
        err => {
          this.errMess = <any>err
        });
  }

  add() {
    if (DEBUG_MODE) console.log('JobhistoryPage.add() - button clicked.');
    this.navCtrl.push(JobhistoryDetailPage, {
      obj: this.provider.new(),
      action: 'Add'
    });
  }

  edit(event, job: Job) {
    if (DEBUG_MODE) console.log('JobhistoryPage.edit() - button clicked for job:', job);
    this.navCtrl.push(JobhistoryDetailPage, {
      obj: job,
      action: 'Edit'
    });
  } /* edit() */


  delete(job: Job) {
      if (DEBUG_MODE) console.log('JobhistoryPage.delete() - button clicked for job:', job);

      let alert = this.alertCtrl.create({
        title: 'Delete',
        message: 'Delete ' + job.company_name + '?',
        buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                if (DEBUG_MODE) console.log('Delete cancelled.');
              }
            },
            {
              text: 'Delete',
              handler: () => {
                let loading = this.loadingCtrl.create({
                  content: 'Deleting ' + job.company_name + ' ...'
                });

                let toast = this.toastCtrl.create({
                  message: job.company_name + ' deleted.',
                  duration: 2000
                });

                loading.present();

                this.provider.delete(job.id)
                  .subscribe(
                    results => {
                      this.cards = results;
                      loading.dismiss();
                      toast.present();
                    },
                    err => {
                      this.errMess = err;
                      loading.dismiss();
                    });
                }
              }
          ]
      });

      alert.present();

    } /* delete */


}
