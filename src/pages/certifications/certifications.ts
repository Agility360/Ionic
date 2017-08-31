import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { apiURL, DEBUG_MODE } from '../../shared/constants';
import { Certification } from '../../shared/certification';
import { CertificationHistoryProvider } from '../../providers/certificationhistory';
import { CertificationDetailPage } from '../certification-detail/certification-detail';


@IonicPage()
@Component({
  selector: 'page-certifications',
  templateUrl: 'certifications.html',
})

export class CertificationsPage {

  cards: Certification[];
  errMess: string;
  showLoading: boolean;

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private provider: CertificationHistoryProvider,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController
    ) {
        if (DEBUG_MODE) console.log('constructor JobhistoryPage');
        this.showLoading = true;
  }

  ionViewWillEnter() {
    if (DEBUG_MODE) console.log('JobhistoryPage.ionViewWillEnter()');
    this.get();
  }

  refresh(refresher) {
      setTimeout(() => {
        if (DEBUG_MODE) console.log('JobhistoryPage.refresh()');
        this.showLoading = false;
        this.get();
        refresher.complete();
      }, 500);
  }


  get() {
    if (DEBUG_MODE) console.log('JobhistoryPage.get()');
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
    if (DEBUG_MODE) console.log('JobhistoryPage.add() - button clicked.');
    this.navCtrl.push(CertificationDetailPage, {
      obj: this.provider.new(),
      action: 'Add'
    });
  }

  edit(event, obj: Certification) {
    if (DEBUG_MODE) console.log('JobhistoryPage.edit() - button clicked for obj:', obj);
    this.navCtrl.push(CertificationDetailPage, {
      obj: obj,
      action: 'Edit'
    });
  } /* edit() */


  delete(obj: Certification) {
      if (DEBUG_MODE) console.log('JobhistoryPage.delete() - button clicked for obj:', obj);

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
