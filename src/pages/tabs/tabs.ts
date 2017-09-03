import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { JobsPage } from '../jobs/jobs';
import { NewsPage } from '../news/news';
import { ResumePage } from '../resume/resume';
import { NotificationsPage } from '../notifications/notifications';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = JobsPage;
  tab2Root = NewsPage;
  tab3Root = ResumePage;
  tab4Root = NotificationsPage;
  tab5Root = SettingsPage;

  constructor() {

  }
}
