import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ConfirmPage } from '../pages/confirm/confirm';
import { SettingsPage } from '../pages/settings/settings';
import { AccountPage } from '../pages/account/account';
import { TabsPage } from '../pages/tabs/tabs';
import { TasksPage } from '../pages/tasks/tasks';
import { TasksCreatePage } from '../pages/tasks-create/tasks-create';

/* Added by McDaniel */
import { JobsPage } from '../pages/jobs/jobs';
import { NewsPage } from '../pages/news/news';
import { ResumePage } from '../pages/resume/resume';
import { NotificationsPage } from '../pages/notifications/notifications';
import { CertificationsPage } from '../pages/certifications/certifications';
import { EducationPage } from '../pages/education/education';
import { JobhistoryPage } from '../pages/jobhistory/jobhistory';
import { JobhistoryDetailPage } from '../pages/jobhistory-detail/jobhistory-detail';

import { HttpModule } from '@angular/http';
import { apiURL, cmsURL } from '../shared/constants';
import { ProcessHttpmsgProvider } from '../providers/process-httpmsg';
import { CandidateProvider } from '../providers/candidate';
import { CertificationHistoryProvider } from '../providers/certificationhistory';
import { EducationHistoryProvider } from '../providers/educationhistory';
import { JobHistoryProvider } from '../providers/jobhistory';
import { WordpressProvider } from '../providers/wordpress';
import { SafeHtmlPipe } from "../shared/pipe.safehtml"
/* Added by McDaniel */


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { User } from '../providers/user';
import { Cognito } from '../providers/aws.cognito';
import { DynamoDB } from '../providers/aws.dynamodb';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    ConfirmPage,
    SettingsPage,
    AccountPage,
    TabsPage,
    TasksPage,
    TasksCreatePage,
    JobsPage,
    NewsPage,
    ResumePage,
    NotificationsPage,
    CertificationsPage,
    EducationPage,
    JobhistoryPage,
    JobhistoryDetailPage,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    ConfirmPage,
    SettingsPage,
    AccountPage,
    TabsPage,
    TasksPage,
    TasksCreatePage,
    JobsPage,
    NewsPage,
    ResumePage,
    NotificationsPage,
    CertificationsPage,
    EducationPage,
    JobhistoryPage,
    JobhistoryDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    User,
    Cognito,
    ProcessHttpmsgProvider,
    CandidateProvider,
    CertificationHistoryProvider,
    EducationHistoryProvider,
    JobHistoryProvider,
    { provide: 'apiURL', useValue: apiURL },
    { provide: 'CMSURL', useValue: cmsURL },
    DynamoDB,
    WordpressProvider
  ]
})
export class AppModule {}

declare var AWS;
AWS.config.customUserAgent = AWS.config.customUserAgent + ' Ionic';
