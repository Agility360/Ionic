import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { DEBUG_MODE } from '../../shared/constants';
import { Job } from '../../shared/job';
import { JobHistoryProvider } from '../../providers/jobhistory';
import { JobhistoryDetailPage } from '../jobhistory-detail/jobhistory-detail';


@IonicPage()
@Component({
  selector: 'page-jobhistory',
  templateUrl: 'jobhistory.html',
})

export class JobhistoryPage implements OnInit {

  cards: Job[];
  errMess: string;

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private jobservice: JobHistoryProvider,
      @Inject('apiURL') private apiURL,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController
    ) {
        if (DEBUG_MODE) console.log('constructor JobhistoryPage');
  }

  ngOnInit() {
    if (DEBUG_MODE) console.log('JobhistoryPage.ngOnInit()');
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
    this.jobservice.get()
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
      job: this.jobservice.new(),
      action: 'Add'
    });
  }

  edit(event, job: Job) {
    if (DEBUG_MODE) console.log('JobhistoryPage.edit() - button clicked for job:', job);
    this.navCtrl.push(JobhistoryDetailPage, {
      job: job,
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
                  message: 'Dish deleted.',
                  duration: 2000
                });

                loading.present();

                this.jobservice.delete(job.id)
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
