import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { TasksPage } from '../tasks/tasks';
import { JobsPage } from '../jobs/jobs';
import { NewsPage } from '../news/news';
import { ForumPage } from '../forum/forum';
import { NotificationsPage } from '../notifications/notifications';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = JobsPage;
  tab2Root = NewsPage;
  tab3Root = ForumPage;
  tab4Root = NotificationsPage;
  tab5Root = SettingsPage;

  constructor() {

  }
}
