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
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DEBUG_MODE } from '../../shared/constants';
import { WPPost } from '../../shared/wppost';
import { WordpressProvider } from '../../providers/wordpress';

@IonicPage()
@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})

export class JobsPage {

  posts: WPPost[];
  errMess: string;
  showLoading: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private wpservice: WordpressProvider
              ) {
        if (DEBUG_MODE) console.log('constructor JobsPage');
        this.showLoading = true;
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

    /* Note: set this to appropriate parameter factory fuction:
        paramsJobs()
        paramsNews()
        paramsResume()
    */
    let loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });
    if (this.showLoading) loading.present();

    let params = this.wpservice.paramsJobs();

    this.wpservice.getPosts(params)
      .subscribe(
        results => {
          if (DEBUG_MODE) console.log('JobsPage.getPosts() - success', results);
          this.posts = results
          var self = this;
          this.posts.forEach(function(post, id){
              /* if (DEBUG_MODE) console.log(post); */
              self.getMedia(post);
          });
          if (this.showLoading) {
            loading.dismiss();
            this.showLoading = false;
          }
        },
        err => {
          if (this.showLoading) {
            loading.dismiss();
            this.showLoading = false;
          }
          if (DEBUG_MODE) console.log('JobsPage.getPosts() - error', err);
          this.errMess = <any>err
        });
  }

  getMedia(post: WPPost) {

    if (DEBUG_MODE) console.log('JobsPage.getMedia()', post);
    if (post.featured_media == 0) {
      post.featured_media_obj = this.wpservice.newMedia();
      return;
    };

    this.wpservice.getMedia(post.featured_media)
      .subscribe(
        results => {
          if (DEBUG_MODE) console.log('JobsPage.getMedia() - success', results);
          post.featured_media_obj = results;
          post.featured_media_url = results.source_url;
        },
        err => {
          if (DEBUG_MODE) console.log('JobsPage.getMedia() - error', err);
          this.errMess = <any>err;
        });

  }

}
