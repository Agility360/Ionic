import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AccountPage } from '../account/account';

import { CertificationsPage } from '../certifications/certifications';
import { EducationPage } from '../education/education';
import { JobhistoryPage } from '../jobhistory/jobhistory';


import { User } from '../../providers/providers';

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public accountPage = AccountPage;
  public certificationsPage = CertificationsPage;
  public educationPage = EducationPage;
  public jobhistoryPage = JobhistoryPage;

  constructor(public user: User, public app: App) {
  }

  logout() {
    this.user.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

}
