import { Component, ViewChild } from '@angular/core';
import { Config, LoadingController, NavController, App, AlertController } from 'ionic-angular';
import { DEBUG_MODE } from '../../shared/constants';

import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { CertificationsPage } from '../certifications/certifications';
import { EducationPage } from '../education/education';
import { JobhistoryPage } from '../jobhistory/jobhistory';
import { PasswordChangePage } from '../password-change/password-change';
import { DeleteAccountPage } from '../delete-account/delete-account';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';
import { TermsOfUsePage } from '../terms-of-use/terms-of-use';

import { DynamoDB, User } from '../../providers/providers';
import { CandidateProvider } from '../../providers/candidate';
import { Camera, CameraOptions } from '@ionic-native/camera';

declare var AWS: any;
declare const aws_user_files_s3_bucket;
declare const aws_user_files_s3_bucket_region;


@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage {

  @ViewChild('avatar') avatarInput;
  provider: CandidateProvider;

  private s3: any;
  public avatarPhoto: string;
  public selectedPhoto: Blob;
  public attributes: any;
  public sub: string = null;
  public username: string;
  public email: string;
  public email_verified: boolean;

  public profilePage = ProfilePage;
  public certificationsPage = CertificationsPage;
  public educationPage = EducationPage;
  public jobhistoryPage = JobhistoryPage;
  public passwordChangePage = PasswordChangePage;
  public deleteAccountPage = DeleteAccountPage;
  public privacyPolicyPage = PrivacyPolicyPage;
  public termsOfUse = TermsOfUsePage;


  constructor(public navCtrl: NavController,
    public user: User,
    public app: App,
    public db: DynamoDB,
    public config: Config,
    public camera: Camera,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

    if (DEBUG_MODE) console.log('SettingsPage.constructor() - begin');

    this.attributes = [];
    this.avatarPhoto = null;
    this.selectedPhoto = null;
    this.s3 = new AWS.S3({
      'params': {
        'Bucket': aws_user_files_s3_bucket
      },
      'region': aws_user_files_s3_bucket_region
    });

    this.sub = AWS.config.credentials.identityId;

    user.getUser().getUserAttributes((err, data) => {
      if (DEBUG_MODE) console.log('SettingsPage.constructor() - getUserAttributes: ', data);
      this.attributes = data;
      this.username = user.getUser().getUsername().toString();
      for (let element of data) {
        if (element.Name == "email") this.email = element.Value;
        if (element.Name == "email_verified") this.email_verified = element.Value;
      }
      if (DEBUG_MODE) console.log('SettingsPage.constructor() - getUserAttributes: email, verified', this.email, this.email_verified);
      this.refreshAvatar();
    });


  }


  logout() {
    if (DEBUG_MODE) console.log('SettingsPage.logout()');
    this.user.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

  changePassword() {
    if (DEBUG_MODE) console.log('SettingsPage.changePassword()');

  }

  deleteAccount() {
    if (DEBUG_MODE) console.log('SettingsPage.deleteAccount()');
    let alert = this.alertCtrl.create({
      title: 'Delete Account',
      message: 'Are you sure you want to delete your account? This cannot be undone.',
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
            this.user.logout();
            this.app.getRootNav().setRoot(LoginPage);
          }
        }
      ]
    }
    );

    alert.present();

  }

  refreshAvatar() {
    if (DEBUG_MODE) console.log('SettingsPage.refreshAvatar()');
    this.s3.getSignedUrl('getObject', { 'Key': 'protected/' + this.sub + '/avatar' }, (err, url) => {
      this.avatarPhoto = url;
    });
  }

  dataURItoBlob(dataURI) {
    if (DEBUG_MODE) console.log('SettingsPage.dataURItoBlob()');
    // code adapted from: http://stackoverflow.com/questions/33486352/cant-upload-image-to-aws-s3-from-ionic-camera
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  };

  selectAvatar() {
    if (DEBUG_MODE) console.log('SettingsPage.selectAvatar()');
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 200,
      targetWidth: 200,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.selectedPhoto = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);
      this.upload();
    }, (err) => {
      this.avatarInput.nativeElement.click();
      // Handle error
    });
  }

  uploadFromFile(event) {
    if (DEBUG_MODE) console.log('SettingsPage.uploadFromFile()');
    const files = event.target.files;
    console.log('Uploading', files)
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.selectedPhoto = this.dataURItoBlob(reader.result);
      this.upload();
    };
    reader.onerror = (error) => {
      alert('Unable to load file. Please try another.')
    }
  }

  upload() {
    if (DEBUG_MODE) console.log('SettingsPage.upload()');
    let loading = this.loadingCtrl.create({
      content: 'Uploading image...'
    });
    loading.present();

    if (this.selectedPhoto) {
      this.s3.upload({
        'Key': 'protected/' + this.sub + '/avatar',
        'Body': this.selectedPhoto,
        'ContentType': 'image/jpeg'
      }).promise().then((data) => {
        this.refreshAvatar();
        console.log('upload complete:', data);
        loading.dismiss();
      }, err => {
        console.log('upload failed....', err);
        loading.dismiss();
      });
    }
    loading.dismiss();

  }


}
