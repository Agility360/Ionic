/*----------------------------------------------------------
 * written by:  mcdaniel
 * date:        august 2017
 *
 * usage:
 *---------------------------------------------------------*/
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { apiURL, DEBUG_MODE } from '../../shared/constants';
import { Education } from '../../shared/education';
import { EducationHistoryProvider } from '../../providers/educationhistory';
import { EducationDetailPage } from '../education-detail/education-detail';


@IonicPage()
@Component({
  selector: 'page-education',
  templateUrl: 'education.html',
})

export class EducationPage {

  cards: Education[];
  errMess: string;
  showLoading: boolean;

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private provider: EducationHistoryProvider,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController
    ) {
        if (DEBUG_MODE) console.log('constructor EducationPage');
        this.showLoading = true;
  }

  ionViewWillEnter() {
    if (DEBUG_MODE) console.log('EducationPage.ionViewWillEnter()');
    this.get();
  }

  refresh(refresher) {
      setTimeout(() => {
        if (DEBUG_MODE) console.log('EducationPage.refresh()');
        this.showLoading = false;
        this.get();
        refresher.complete();
      }, 500);
  }


  get() {
    if (DEBUG_MODE) console.log('EducationPage.get()');
    let loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });
    if (this.showLoading) loading.present();
    this.provider.get()
      .subscribe(
        results => {
        this.cards = results
        if (this.showLoading) loading.dismiss();
        this.showLoading = true;
        },
        err => {
          this.errMess = <any>err
          if (this.showLoading) loading.dismiss();
          this.showLoading = true;
        });
  }

  add() {
    if (DEBUG_MODE) console.log('EducationPage.add() - button clicked.');
    this.navCtrl.push(EducationDetailPage, {
      obj: this.provider.new(),
      action: 'Add'
    });
  }

  edit(event, obj: Education) {
    if (DEBUG_MODE) console.log('EducationPage.edit() - button clicked for obj:', obj);
    this.navCtrl.push(EducationDetailPage, {
      obj: obj,
      action: 'Edit'
    });
  } /* edit() */


  delete(obj: Education) {
      if (DEBUG_MODE) console.log('EducationPage.delete() - button clicked for obj:', obj);

      let alert = this.alertCtrl.create({
        title: 'Delete',
        message: 'Delete ' + obj.institution_name + '?',
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
                  content: 'Deleting ' + obj.institution_name + ' ...'
                });

                let toast = this.toastCtrl.create({
                  message: obj.institution_name + ' deleted.',
                  duration: 2000
                });

                loading.present();

                this.provider.delete(obj.id)
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
