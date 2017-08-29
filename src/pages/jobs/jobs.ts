/*------------------------------------------------------
 * written by: mcdaniel
 * date: august 2017
 *
 * usage: template controller fed by custom Wordpress provider
 *        this code is templated for use in the following
 *        page controllers:
 *        - jobs
 *        - news
 *        - resume
 *------------------------------------------------------*/
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DEBUG_MODE } from '../../shared/constants';
import { WPPost } from '../../shared/wppost';
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
        this.getPosts();
  }

  refreshData(refresher) {
      setTimeout(() => {
        if (DEBUG_MODE) console.log('JobsPage.refreshData()');
        this.getPosts();
        refresher.complete();
      }, 500);
  }

  getPosts() {
    if (DEBUG_MODE) console.log('JobsPage.getPosts()');
    this.wpservice.getPosts(this.wpservice.paramsJobs())
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

  getMedia(job: WPPost) {

    if (DEBUG_MODE) console.log('JobsPage.getMedia()', job);
    if (job.featured_media == 0) {
      job.featured_media_obj = this.wpservice.newMedia();
      return;
    };

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
