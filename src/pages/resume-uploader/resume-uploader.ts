import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DEBUG_MODE } from '../../shared/constants';
import { FilemanagerProvider } from '../../providers/filemanager/filemanager';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fileManager: FilemanagerProvider) {

      if (DEBUG_MODE) console.log('ResumeUploaderPage.constructor()');

  }

  ionViewDidLoad() {
    if (DEBUG_MODE) console.log('ResumeUploaderPage.ionViewDidLoad()');
  }

  get() {
    if (DEBUG_MODE) console.log('ResumeUploaderPage.get()');

    this.fileManager.get();

  }

  add() {
    if (DEBUG_MODE) console.log('ResumeUploaderPage.add()');

    this.fileManager.add();
  }

  delete() {
    if (DEBUG_MODE) console.log('ResumeUploaderPage.delete()');
    this.fileManager.delete();

  }

  refresh(refresher) {
    setTimeout(() => {
      if (DEBUG_MODE) console.log('ResumeUploaderPage.refresh()');
      this.get();
      refresher.complete();
    }, 500);
  }

}
