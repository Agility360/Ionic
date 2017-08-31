/*====================================================================
* McDaniel Aug-2017
*
* For Certification array from agility REST api
* ====================================================================*/
import { Injectable } from '@angular/core';
import { Cognito } from './aws.cognito';
import { Certification } from '../shared/certification';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../services/httpService';
import { apiURL, DEBUG_MODE } from '../shared/constants';
import { ProcessHttpmsgProvider } from './process-httpmsg';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class CertificationHistoryProvider {

  config: string;

  constructor(public http: HttpService,
    private cognito: Cognito,
    private ProcessHttpmsgService: ProcessHttpmsgProvider) {

      if (DEBUG_MODE) console.log('constructor - CertificationHistoryProvider');
      if (DEBUG_MODE) console.log('apiURL: ', apiURL);

      this.config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";
  }

  url() {
    return apiURL + 'candidates/' + this.username() + '/certifications/';
  }

  get(): Observable<Certification[]> {

    if (DEBUG_MODE) console.log('ProcessHttpmsgProvider.get() with username: ', this.username());

    return this.http.get(this.url())
      .map(res => {return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});
  }

  add(obj: Certification): Observable<Certification> {

      if (DEBUG_MODE) console.log('CertificationHistoryProvider.add() - adding', obj);

      return this.http.post(this.url(), obj, this.config)
      .map(
        res => {
          if (DEBUG_MODE) console.log('CertificationHistoryProvider.add() - success', res);
          return this.ProcessHttpmsgService.extractData(res)
        }
      )
      .catch(
        error => {
              if (DEBUG_MODE) console.log('CertificationHistoryProvider.add() - error while posting', this.url(), this.config, obj, error);
              return this.ProcessHttpmsgService.handleError(error)
            }
      );

  }

  update(obj: Certification): Observable<Certification> {

      if (DEBUG_MODE) console.log('CertificationHistoryProvider.update() - error while posting', this.url() + obj.id.toString(), this.config, obj);

      return this.http.patch(this.url() + obj.id.toString(), obj, this.config)
      .map(res => {return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {
            if (DEBUG_MODE) console.log('CertificationHistoryProvider.update() - error while posting', this.url() + obj.id.toString(), this.config, obj, error);
            return this.ProcessHttpmsgService.handleError(error)
          });

  }

  delete(id: number): Observable<Certification[]> {

      return this.http.delete(this.url() + id.toString(), this.config)
      .map(res => {
            if (DEBUG_MODE) console.log('CertificationHistoryProvider.delete() - success.', res);
            return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {
            if (DEBUG_MODE) console.log('CertificationHistoryProvider.delete() - error while deleting', this.url() + id.toString(), this.config, error);
            return this.ProcessHttpmsgService.handleError(error)
          });

  }

  new() {
    return  {
      account_name: this.username(),
      id: null,
      candidate_id: null,
      institution_name: '',
      certification_name: '',
      date_received: '',
      expire_date: '',
      create_date: ''
    };
  }

  username() {
    var user = this.cognito.getCurrentUser();
    return user.username;
  }

}
