/*====================================================================
* McDaniel Aug-2017
*
* For Education array from agility REST api
* ====================================================================*/
import { Injectable } from '@angular/core';
import { Cognito } from './aws.cognito';
import { Education } from '../shared/education';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../services/httpService';
import { apiURL, apiHttpOptions, DEBUG_MODE } from '../shared/constants';
import { ProcessHttpmsgProvider } from './process-httpmsg';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class EducationHistoryProvider {


  constructor(public http: HttpService,
    private cognito: Cognito,
    private ProcessHttpmsgService: ProcessHttpmsgProvider) {

    if (DEBUG_MODE) console.log('constructor - EducationHistoryProvider');
    if (DEBUG_MODE) console.log('apiURL: ', apiURL);

  }

  url() {
    return apiURL + 'candidates/' + this.username() + '/education/';
  }

  get(): Observable<Education[]> {

    if (DEBUG_MODE) console.log('ProcessHttpmsgProvider.get() with username: ', this.username());

    return this.http.get(this.url(), apiHttpOptions)
      .map(res => { return this.ProcessHttpmsgService.extractData(res) })
      .catch(error => { return this.ProcessHttpmsgService.handleError(error) });
  }

  add(obj: Education): Observable<Education> {

    if (DEBUG_MODE) console.log('EducationHistoryProvider.add() - adding', obj);

    return this.http.post(this.url(), obj, apiHttpOptions)
      .map(
      res => {
        if (DEBUG_MODE) console.log('EducationHistoryProvider.add() - success', res);
        return this.ProcessHttpmsgService.extractData(res)
      }
      )
      .catch(
      error => {
        if (DEBUG_MODE) console.log('EducationHistoryProvider.add() - error while posting', this.url(), apiHttpOptions, obj, error);
        return this.ProcessHttpmsgService.handleError(error)
      }
      );

  }

  update(job: Education): Observable<Education> {

    return this.http.patch(this.url() + job.id.toString(), job, apiHttpOptions)
      .map(res => { return this.ProcessHttpmsgService.extractData(res) })
      .catch(error => {
        if (DEBUG_MODE) console.log('EducationHistoryProvider.update() - error while posting', this.url() + job.id.toString(), apiHttpOptions, job, error);
        return this.ProcessHttpmsgService.handleError(error)
      });

  }

  delete(id: number): Observable<Education[]> {

    return this.http.delete(this.url() + id.toString(), apiHttpOptions)
      .map(res => {
        if (DEBUG_MODE) console.log('EducationHistoryProvider.delete() - success.', res);
        return this.ProcessHttpmsgService.extractData(res)
      })
      .catch(error => {
        if (DEBUG_MODE) console.log('EducationHistoryProvider.delete() - error while deleting', this.url() + id.toString(), apiHttpOptions, error);
        return this.ProcessHttpmsgService.handleError(error)
      });

  }

  new() {
    return {
      account_name: this.username(),
      id: null,
      candidate_id: null,
      institution_name: '',
      degree: '',
      graduated: false,
      start_date: '',
      end_date: '',
      create_date: ''
    };
  }

  username() {
    var user = this.cognito.getCurrentUser();
    return user.username;
  }
}
