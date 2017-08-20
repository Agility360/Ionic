/*====================================================================
* McDaniel Aug-2017
*
* For Job History array from agility REST api
* ====================================================================*/
import { Injectable } from '@angular/core';
import { Post } from '../shared/wppost';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL, cmsURL } from '../shared/baseurl';
import { ProcessHttpmsgProvider } from './process-httpmsg';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class WordpressProvider {

  config: string;

  constructor(public http: Http,
    private ProcessHttpmsgService: ProcessHttpmsgProvider) {

    console.log('instantiated JobHistoryProvider');
    console.log('baseURL: ', baseURL);

    this.config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";

  }

  urlJobs() {
    return cmsURL + 'posts/?categories=5';
  }

  getJobs(): Observable<Post[]> {

    return this.http.get(this.urlJobs())
      .map(res => {return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});
  }


}
