import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Job } from '../../shared/job';
import { JobHistoryProvider } from '../../providers/jobhistory';


@IonicPage()
@Component({
  selector: 'page-jobhistory',
  templateUrl: 'jobhistory.html',
})
export class JobhistoryPage {

  jobs: Job[];
  jobsErrMess: string;


  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private jobservice: JobHistoryProvider,
      @Inject('BaseURL') private BaseURL) {

        console.log('constructor JobhistoryPage');

  }

  ngOnInit() {
    this.jobservice.getJobHistory('mcdaniel')
      .subscribe(jobs => this.jobs = jobs,
        errmess => this.jobsErrMess = <any>errmess);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad JobhistoryPage');
  }

}
