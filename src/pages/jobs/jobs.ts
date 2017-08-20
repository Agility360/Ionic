import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../shared/wppost';
import { WordpressProvider } from '../../providers/wordpress';

@IonicPage()
@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})
export class JobsPage {

  jobs: Post[];
  errMess: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private wpservice: WordpressProvider
              ) {
        console.log('constructor JobsPage');
  }

  ionViewWillEnter() {
    console.log('JobsPage.ionViewWillEnter()');
    this.getJobs();
  }

  refreshData(refresher) {
      setTimeout(() => {
        console.log('JobsPage.refreshData()');
        this.getJobs();
        refresher.complete();
      }, 500);
  }

  getJobs() {
    console.log('JobsPage.getJobs()');
    this.wpservice.getJobs()
      .subscribe(
        results => {
          console.log('JobsPage.getJobs() - success', results);
          this.jobs = results
        },
        err => {
          console.log('JobsPage.getJobs() - error', err);
          this.errMess = <any>err
        });
  }

}
