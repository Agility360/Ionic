import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WPPost } from '../../shared/wppost';
import { DEBUG_MODE } from '../../shared/baseurl';
import { WordpressProvider } from '../../providers/wordpress';

@IonicPage()
@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})
export class JobsPage {

  jobs: WPPost[];
  errMess: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private wpservice: WordpressProvider
              ) {
        if (DEBUG_MODE) console.log('constructor JobsPage');
  }

  ionViewWillEnter() {
    if (DEBUG_MODE) console.log('JobsPage.ionViewWillEnter()');
    this.getJobs();
  }

  refreshData(refresher) {
      setTimeout(() => {
        if (DEBUG_MODE) console.log('JobsPage.refreshData()');
        this.getJobs();
        refresher.complete();
      }, 500);
  }

  getJobs() {
    if (DEBUG_MODE) console.log('JobsPage.getJobs()');
    this.wpservice.getJobs()
      .subscribe(
        results => {
          if (DEBUG_MODE) console.log('JobsPage.getJobs() - success', results);
          this.jobs = results
          var self = this;
          this.jobs.forEach(function(job, id){
              if (DEBUG_MODE) console.log(job);
              self.getMedia(job);
          });
        },
        err => {
          if (DEBUG_MODE) console.log('JobsPage.getJobs() - error', err);
          this.errMess = <any>err
        });
  }

  test() {
    if (DEBUG_MODE) console.log('test proc');
  }

  getMedia(job: WPPost) {

    if (job.featured_media == 0) {
      job.featured_media_obj = this.wpservice.newMedia();
      return;
    };

    if (DEBUG_MODE) console.log('JobsPage.getMedia()');
    this.wpservice.getMedia(job.featured_media)
      .subscribe(
        results => {
          if (DEBUG_MODE) console.log('JobsPage.getMedia() - success', results);
          job.featured_media_obj = results;
          job.featured_media_url = results.source_url;
        },
        err => {
          if (DEBUG_MODE) console.log('JobsPage.getMedia() - error', err);
          this.errMess = <any>err;
        });


  }

}
