import { IonicPage, NavParams, LoadingController, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { DEBUG_MODE } from '../../shared/constants';
import { User } from '../../providers/providers';
import { S3File } from '../../shared/s3file';
import { DocumentViewer } from '@ionic-native/document-viewer';

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
  private documentViewerOptions: any;

  /* AWS variables */
  private s3: any;
  public url: string;
  public username: string;

  constructor(
    public user: User,
    public resume: DocumentViewer,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController) {

      if (DEBUG_MODE) console.log('ResumeUploaderPage.constructor()');

      this.url = null;
      this.s3 = new AWS.S3({
        'params': {
          'Bucket': aws_user_files_s3_bucket
        },
        'region': aws_user_files_s3_bucket_region
      });

      this.documentViewerOptions = {
        title: 'My Resume'
      };

      this.username = user.getUser().getUsername().toString();
      this.get();
  }

  ionViewDidLoad() {
    if (DEBUG_MODE) console.log('ResumeUploaderPage.ionViewDidLoad()');
  }
  private key(): string {
    if (DEBUG_MODE) console.log('ResumeUploaderPage.key(): ', 'uploads/' + this.username + '.jpg');
    return 'uploads/' + this.username + '.jpg';
  }
  get() {
    if (DEBUG_MODE) console.log('ResumeUploaderPage.get()');
      this.s3.getSignedUrl('getObject', { 'Key': this.key() }, (err, url) => {

        if (err) {
          if (DEBUG_MODE) console.log('ResumeUploaderPage.get() - this.s3.getSignedUrl - error', err);
          return;
        }
        if (DEBUG_MODE) console.log('ResumeUploaderPage.get() - this.s3.getSignedUrl - success', url);

        this.url = url;

        var docViewerOnShow = function() {
          if (DEBUG_MODE) console.log('ResumeUploaderPage.docViewerOnShow()');
        };

        var docViewerOnClose = function() {
          if (DEBUG_MODE) console.log('ResumeUploaderPage.docViewerOnClose()');
        };

        var docViewerOnMissing = function() {
          if (DEBUG_MODE) console.log('ResumeUploaderPage.docViewerOnMissing()');
        }
        var docViewerOnError = function() {
          if (DEBUG_MODE) console.log('ResumeUploaderPage.docViewerOnError()');
        }

        this.resume.viewDocument(
          this.url,
          'application/pdf',
          this.documentViewerOptions,
          docViewerOnShow,
          docViewerOnClose,
          docViewerOnMissing,
          docViewerOnError
        )
    });
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


  private dataURItoBlob(dataURI) {
    if (DEBUG_MODE) console.log('ResumeUploaderPage.dataURItoBlob()');
    // code adapted from: http://stackoverflow.com/questions/33486352/cant-upload-image-to-aws-s3-from-ionic-camera
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  };

  uploadFromFile(event) {
    if (DEBUG_MODE) console.log('ResumeUploaderPage.uploadFromFile()');
    const files = (<HTMLInputElement>event.target).files;
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      if (DEBUG_MODE) console.log('ResumeUploaderPage.uploadFromFile() - file read.');
      this.fileContent = this.dataURItoBlob(reader.result);

      let loading = this.loadingCtrl.create({
        content: 'Uploading'
      });
      loading.present();

      var s3file: S3File = this.new(this.key(), this.fileContent, 'image/jpeg');

      this.s3.upload(s3file).promise()
      .then(
        (data) => {
          if (DEBUG_MODE) console.log('ResumeUploaderPage.upload() - s3.upload - success');
          this.get();
        },
        (err) => {
          if (DEBUG_MODE) console.log('ResumeUploaderPage.upload() - s3.upload - failure', err);
        });

      loading.dismiss();
    };
    reader.onerror = (error) => {
      alert('Unable to load file. Please try another.')
    }
  }

  private new(Key, Body, ContentType) {
      return {
        Key: Key,
        Body: Body,
        ContentType: ContentType
      };
  }



}
