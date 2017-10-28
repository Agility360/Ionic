import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, App, LoadingController, AlertController } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ConfirmPage } from '../pages/confirm/confirm';
import { TabsPage } from '../pages/tabs/tabs';

/* Added by McDaniel */
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { PasswordResetPage } from '../pages/password-reset/password-reset';
import { PasswordChangePage } from '../pages/password-change/password-change';
import { SettingsPage } from '../pages/settings/settings';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { JobsPage } from '../pages/jobs/jobs';
import { NewsPage } from '../pages/news/news';
import { ResumePage } from '../pages/resume/resume';
import { NotificationsPage } from '../pages/notifications/notifications';
import { CertificationsPage } from '../pages/certifications/certifications';
import { EducationPage } from '../pages/education/education';
import { JobhistoryPage } from '../pages/jobhistory/jobhistory';
import { JobhistoryDetailPage } from '../pages/jobhistory-detail/jobhistory-detail';
import { EducationDetailPage } from '../pages/education-detail/education-detail';
import { CertificationDetailPage } from '../pages/certification-detail/certification-detail';
import { HttpErrorPage } from '../pages/http-error/http-error';
import { DeleteAccountPage } from '../pages/delete-account/delete-account';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { TermsOfUsePage } from '../pages/terms-of-use/terms-of-use';
import { JobsDetailPage } from '../pages/jobs-detail/jobs-detail';
import { NewsDetailPage } from '../pages/news-detail/news-detail';


import { apiURL, cmsURL } from '../shared/constants';
import { ProcessHttpmsgProvider } from '../providers/process-httpmsg';
import { CandidateProvider } from '../providers/candidate';
import { CertificationHistoryProvider } from '../providers/certificationhistory';
import { EducationHistoryProvider } from '../providers/educationhistory';
import { JobHistoryProvider } from '../providers/jobhistory';
import { WordpressProvider } from '../providers/wordpress';
import { IndustriesProvider } from '../providers/industries';
import { ProfessionsProvider } from '../providers/professions';
import { StatesProvider } from '../providers/states';
import { SafeHtmlPipe } from "../shared/pipe.safehtml";
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { HttpService } from '../services/httpService';

export function httpFactory(
  backend: XHRBackend,
  defaultOptions: RequestOptions,
  app: App,
  loadingCtrl: LoadingController,
  alertCtrl: AlertController) {
  return new HttpService(backend, defaultOptions, app, loadingCtrl);
}
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
    WelcomePage,
    SignupPage,
    ConfirmPage,
    ForgotPasswordPage,
    PasswordResetPage,
    PasswordChangePage,
    SettingsPage,
    ProfilePage,
    ProfileEditPage,
    TabsPage,
    JobsPage,
    NewsPage,
    ResumePage,
    NotificationsPage,
    CertificationsPage,
    EducationPage,
    JobhistoryPage,
    JobhistoryDetailPage,
    EducationDetailPage,
    CertificationDetailPage,
    HttpErrorPage,
    DeleteAccountPage,
    PrivacyPolicyPage,
    TermsOfUsePage,
    JobsDetailPage,
    NewsDetailPage,
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
    WelcomePage,
    SignupPage,
    ConfirmPage,
    ForgotPasswordPage,
    PasswordResetPage,
    PasswordChangePage,
    SettingsPage,
    ProfilePage,
    ProfileEditPage,
    TabsPage,
    JobsPage,
    NewsPage,
    ResumePage,
    NotificationsPage,
    CertificationsPage,
    EducationPage,
    JobhistoryPage,
    JobhistoryDetailPage,
    EducationDetailPage,
    CertificationDetailPage,
    HttpErrorPage,
    DeleteAccountPage,
    PrivacyPolicyPage,
    TermsOfUsePage,
    JobsDetailPage,
    NewsDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HttpService, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, App, LoadingController, AlertController] },
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
    WordpressProvider,
    IndustriesProvider,
    ProfessionsProvider,
    StatesProvider
  ]
})
export class AppModule { }

declare var AWS;
AWS.config.customUserAgent = AWS.config.customUserAgent + ' Ionic';
