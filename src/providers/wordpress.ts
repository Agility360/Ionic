/*------------------------------------------------------
 * written by: mcdaniel
 * date: august 2017
 *
 * usage: Wordpress provider for Wordpress REST api
 *        see: https://developer.wordpress.org/rest-api/
 *------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { WPPost, WPMedia } from '../shared/wppost';
import { Observable } from 'rxjs/Observable';
import { cmsURL, DEBUG_MODE } from '../shared/constants';
import { ProcessHttpmsgProvider } from './process-httpmsg';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpService } from '../services/httpService';


@Injectable()
export class WordpressProvider {

  config: string;

  constructor(
    public http: HttpService,
    private ProcessHttpmsgService: ProcessHttpmsgProvider) {

    if (DEBUG_MODE) console.log('instantiated JobHistoryProvider');

    this.config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";

  }

  urlPosts() {
    return cmsURL + 'posts/';
  }

  urlMedia() {
    return cmsURL + 'media/';
  }

  paramsJobs() {
     return {categories: '5'};
  }

  paramsNews() {
    return {categories: '3'};
  }

  paramsResume() {
    return {categories: '4'};
  }


getPosts(params: any): Observable<WPPost[]> {
  return this.http.get(this.urlPosts(), {
                                       params: params
                                     })
    .map(res => {return this.ProcessHttpmsgService.extractData(res)})
    .catch(error => {return this.ProcessHttpmsgService.handleError(error)});
}


  getMedia(id: number): Observable<WPMedia> {
    return this.http.get(this.urlMedia() + id.toString())
      .map(res => {return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});
  }

  newMedia() {

    return  {
      id: null,
      date: '',
      date_gmt: '',
      guid: {},
      modified: '',
      modified_gmt: '',
      slug: '',
      status: '',
      type: '',
      link: '',
      title: '',
      author: '',
      comment_status: '',
      ping_status: '',
      template: '',
      meta: [],
      description: {},
      caption: {},
      alt_text: '',
      media_type: '',
      mime_type: '',
      media_details: {},
      post: null,
      source_url: '',
      _links: {}
    };
  }


}
