import { IonicPage, NavParams, ToastController, Config, LoadingController, NavController, App, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { DEBUG_MODE } from '../../shared/constants';
import { S3File } from '../../shared/s3file';
import { DynamoDB, User } from '../../providers/providers';

declare var AWS: any;
declare const aws_user_files_s3_bucket;
declare const aws_user_files_s3_bucket_region;


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

  private fileContent: Blob;
  public errMess: string;

  /* AWS variables */
  private s3: any;
  public url: string;
  public attributes: any;
  public userFolder: string = null;
  public username: string;
  public email: string;
  public email_verified: boolean;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public user: User,
    public app: App,
    public db: DynamoDB,
    public config: Config,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

      if (DEBUG_MODE) console.log('ResumeUploaderPage.constructor()');
      this.attributes = [];
      this.url = null;
      this.s3 = new AWS.S3({
        'params': {
          'Bucket': aws_user_files_s3_bucket
        },
        'region': aws_user_files_s3_bucket_region
      });

      this.userFolder = AWS.config.credentials.identityId;

      user.getUser().getUserAttributes((err, data) => {
        if (DEBUG_MODE) console.log('SettingsPage.constructor() - getUserAttributes: ', data);
        this.attributes = data;
        this.username = user.getUser().getUsername().toString();
        for (let element of data) {
          if (element.Name == "email") this.email = element.Value;
          if (element.Name == "email_verified") this.email_verified = element.Value;
        }
        if (DEBUG_MODE) console.log('ResumeUploaderPage.constructor() - getUserAttributes: email, verified', this.email, this.email_verified);
      });

      this.get();
  }

  ionViewDidLoad() {
    if (DEBUG_MODE) console.log('ResumeUploaderPage.ionViewDidLoad()');
  }

  get() {
    if (DEBUG_MODE) console.log('ResumeUploaderPage.get()');
    this.s3.getSignedUrl('getObject', { 'Key': 'protected/' + this.userFolder + '/resume.jpg' }, (err, url) => {
      this.url = url;
      if (DEBUG_MODE) console.log('ResumeUploaderPage.get() - got', url);
    });
  }



  add(event) {
    if (DEBUG_MODE) console.log('ResumeUploaderPage.add()');
  }

  delete() {
    if (DEBUG_MODE) console.log('ResumeUploaderPage.delete()');

  }

  refresh(refresher) {
    setTimeout(() => {
      if (DEBUG_MODE) console.log('ResumeUploaderPage.refresh()');
      this.get();
      refresher.complete();
    }, 500);
  }

  private new(Key, Body, ContentType) {
      return {
        Key: Key,
        Body: Body,
        ContentType: ContentType
      };
  }

  private dataURItoBlob(dataURI) {
    if (DEBUG_MODE) console.log('SettingsPage.dataURItoBlob()');
    // code adapted from: http://stackoverflow.com/questions/33486352/cant-upload-image-to-aws-s3-from-ionic-camera
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  };

  uploadFromFile(event) {
    if (DEBUG_MODE) console.log('SettingsPage.uploadFromFile()');
    const files = (<HTMLInputElement>event.target).files;
    console.log('Uploading', files)
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.fileContent = this.dataURItoBlob(reader.result);
      this.upload();
    };
    reader.onerror = (error) => {
      alert('Unable to load file. Please try another.')
    }
  }

  upload() {
    if (DEBUG_MODE) console.log('SettingsPage.upload()');
    let loading = this.loadingCtrl.create({
      content: 'Uploading ...'
    });
    loading.present();

    var s3file: S3File = this.new('protected/' + this.userFolder + '/resume.jpg', this.fileContent, 'image/jpeg');

    if (this.fileContent) {
      this.s3.upload(s3file).promise()
      .then(
        (data) => {
        if (DEBUG_MODE) console.log('SettingsPage.upload() - s3.upload - success');
        this.get();
      }, (err) => {
        if (DEBUG_MODE) console.log('SettingsPage.upload() - s3.upload - failure', err);
      });
    }
    loading.dismiss();

  }



}
