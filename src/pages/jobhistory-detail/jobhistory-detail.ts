import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
        public navParams: NavParams,
        @Inject('BaseURL') private BaseURL,
        private jobservice: JobHistoryProvider,
        private actionSheetCtrl: ActionSheetController,
        private toastCtrl: ToastController) {

        console.log("Hello dishdetail controller :D");

        this.job = navParams.get('job');

        console.log('JobhistoryDetailPage.constructor() with job: ', this.job);


    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobhistoryDetailPage');
  }

}
