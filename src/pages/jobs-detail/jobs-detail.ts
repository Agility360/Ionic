import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DEBUG_MODE } from '../../shared/constants';
import { WPPost } from '../../shared/wppost';

/**
 * Generated class for the JobsDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jobs-detail',
  templateUrl: 'jobs-detail.html',
})
export class JobsDetailPage {

  post: WPPost;
  errMess: string;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams) {

    if (DEBUG_MODE) console.log('JobsDetailPage.constructor()');
    this.post = navParams.get('post');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobsDetailPage');
  }

  refreshData(refresher) {
    setTimeout(() => {
      if (DEBUG_MODE) console.log('JobhistoryPage.refresh()');

      refresher.complete();
    }, 500);
  }


}
