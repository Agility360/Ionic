import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { DEBUG_MODE } from '../../shared/constants';
import { FilemanagerProvider } from '../../providers/filemanager/filemanager';
import { S3File } from '../../shared/s3file';

/**
 * Generated class for the ResumeUploaderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resume-uploader',
  templateUrl: 'resume-uploader.html',
})
export class ResumeUploaderPage {

  public resume: S3File;
  errMess: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private fileManager: FilemanagerProvider) {

      if (DEBUG_MODE) console.log('ResumeUploaderPage.constructor()');

  }

  ionViewDidLoad() {
    if (DEBUG_MODE) console.log('ResumeUploaderPage.ionViewDidLoad()');
  }

  get() {
    if (DEBUG_MODE) console.log('ResumeUploaderPage.get()');

    this.fileManager.get()
      .subscribe(
      results => {
        this.resume = results
      },
      err => {
        this.errMess = <any>err
      });


  }

  add() {
    if (DEBUG_MODE) console.log('ResumeUploaderPage.add()');

    let toast = this.toastCtrl.create({
      message: 'Success.',
      duration: 2000
    });

    this.fileManager.add(this.resume)
      .subscribe(job => {
        if (DEBUG_MODE) console.log('JobhistoryDetailPage.processForm() - Added obj: ', this.resume);
        toast.present();
      },
      errorMsg => {
        this.errMess = errorMsg;
      });

  }

  delete() {
    if (DEBUG_MODE) console.log('ResumeUploaderPage.delete()');

    let alert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Delete this resume?',
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

            let toast = this.toastCtrl.create({
              message: 'resume deleted.',
              duration: 2000
            });

            this.fileManager.delete(this.resume)
              .subscribe(
              results => {
                this.resume = results;
                toast.present();
              },
              err => {
                this.errMess = err;
              });
          }
        }
      ]
    }
    );

    alert.present();
  }

  refresh(refresher) {
    setTimeout(() => {
      if (DEBUG_MODE) console.log('ResumeUploaderPage.refresh()');
      this.get();
      refresher.complete();
    }, 500);
  }

}
