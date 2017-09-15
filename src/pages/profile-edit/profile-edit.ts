import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { DEBUG_MODE } from '../../shared/constants';
import { Candidate } from '../../shared/candidate';
import { Industries } from '../../shared/industries';
import { Professions } from '../../shared/professions';


import { CandidateProvider } from '../../providers/candidate';
import { IndustriesProvider } from '../../providers/industries';
import { ProfessionsProvider } from '../../providers/professions';

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {

  public obj: Candidate;
  industries: Industries[];
  professions: Professions[];

  error: any;
  private shouldConfirmWindowClose: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private provider: CandidateProvider,
    private industriesProvider: IndustriesProvider,
    private professionsProvider: ProfessionsProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {

      if (DEBUG_MODE) console.log('ProfileEditPage.constructor()');
      this.obj = navParams.get('obj');
      this.shouldConfirmWindowClose = true;

      /* initialize Industries and Professions objects */
      this.industriesProvider.get(0)
        .subscribe(
          results => {
            if (DEBUG_MODE) console.log('ProfileEditPage.constructor() - initialized Industries', results);
            this.industries = results
          },
          err => {
            if (DEBUG_MODE) console.log('ProfileEditPage.constructor() - Error initializing Industries', err);
            this.error = <any>err
        });

        this.professionsProvider.get(0)
          .subscribe(
            results => {
              if (DEBUG_MODE) console.log('ProfileEditPage.constructor() - initialized Professions', results);
              this.professions = results
            },
            err => {
              if (DEBUG_MODE) console.log('ProfileEditPage.constructor() - Error initializing Professions', err);
              this.error = <any>err
          });

  }

  save() {
    if (DEBUG_MODE) console.log('ProfileEditPage.save(): ', );

    let toast = this.toastCtrl.create({
      message: 'Success.',
      duration: 2000
    });


    this.provider.update(this.obj)
      .subscribe(obj => {
        if (DEBUG_MODE) console.log('EducationDetailPage.processForm() - Added obj: ', this.obj);
        toast.present();
        this.shouldConfirmWindowClose = false;
        /* this.navCtrl.getActiveChildNav() */
        this.exitPage();
      },
      error => {
        this.shouldConfirmWindowClose = true;
        this.error = error;
      });



  }

  private exitPage() {
    this.shouldConfirmWindowClose = false;
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
  }

  ionViewCanLeave() {
    if (this.shouldConfirmWindowClose) {
      let alert = this.alertCtrl.create({
        title: 'Exit',
        message: 'Discard changes?',
        buttons: [{
          text: 'Discard',
          handler: () => {
            this.exitPage();
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            // need to do something if the user stays?
          }
        }]
      });

      // Show the alert
      alert.present();

      // Return false to avoid the page to be popped up
      return false;
    }
  }


}
