/*====================================================================
* McDaniel Aug-2017
*
* For Certification array from agility REST api
* ====================================================================*/
import { Injectable } from '@angular/core';
import { Certification } from '../shared/certification';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgProvider } from './process-httpmsg';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class CertificationHistoryProvider {

  constructor(public http: Http,
    private ProcessHttpmsgService: ProcessHttpmsgProvider) {

    console.log('instantiated CertificationHistoryProvider');
  }

  getEducationHistory(username: string): Observable<Certification[]> {
    return this.http.get(baseURL + 'candidates/' + username + '/certification')
      .map(res => {return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});
  }

  addEducationHistory(username: string, certification: Certification) {
      var url = baseURL + 'candidates/' + username + '/certification';
      var config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";

      this.http.post(url, certification, config)
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});

      return true;
  }

  updateEducationHistory(username: string, certification: Certification) {
      var url = baseURL + 'candidates/' + username + '/certification';
      var config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";

      this.http.patch(url, certification, config)
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});

      return true;
  }

  deleteEducationHistory(username: string, id: number) {
      var url = baseURL + 'candidates/' + username + '/education/' + id;
      var config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";

      this.http.delete(url, config)
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});

      return true;
  }

}
