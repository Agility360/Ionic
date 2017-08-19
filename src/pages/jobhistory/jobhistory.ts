import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Job } from '../../shared/job';
import { JobHistoryProvider } from '../../providers/jobhistory';
import { JobhistoryDetailPage } from '../jobhistory-detail/jobhistory-detail';


@IonicPage()
@Component({
  selector: 'page-jobhistory',
  templateUrl: 'jobhistory.html',
})

export class JobhistoryPage implements OnInit {

  jobs: Job[];
  errMess: string;

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private jobservice: JobHistoryProvider,
      @Inject('BaseURL') private BaseURL,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController
    ) {
        console.log('constructor JobhistoryPage');
  }

  ngOnInit() {

    this.jobservice.getJobHistory()
      .subscribe(jobs => this.jobs = jobs,
        errmess => this.errMess = <any>errmess);

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad JobhistoryPage');
  }

  addJobHistory() {
    console.log('JobhistoryPage.addJobHistory() - button clicked.');

    this.navCtrl.push(JobhistoryDetailPage, {
      job: this.jobservice.newJob(),
      action: 'Add'
    });

  }

  editJobHistory(event, job: Job) {
    console.log('JobhistoryPage.editJobHistory() - button clicked for job:', job);

    this.navCtrl.push(JobhistoryDetailPage, {
      job: job,
      action: 'Edit'
    });

  } /* editJobHistory() */


  deleteJobHistory(job: Job) {
      console.log('JobhistoryPage.deleteJobHistory() - button clicked for job:', job);

      let alert = this.alertCtrl.create({
        title: 'Delete',
        message: 'Delete ' + job.company_name + '?',
        buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Delete cancelled.');
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

                this.jobservice.deleteJobHistory(job.id)
                  .subscribe(jobs => {this.jobs = jobs; loading.dismiss(); toast.present();},
                    errmess => {this.errMess = errmess; loading.dismiss();});

                }
              }
          ]
      });

      alert.present();

    } /* deleteJobHistory */


}
