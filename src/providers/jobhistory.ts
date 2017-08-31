/*====================================================================
* McDaniel Aug-2017
*
* For Job History array from agility REST api
* ====================================================================*/
import { Injectable } from '@angular/core';
import { Cognito } from './aws.cognito';
import { Job } from '../shared/job';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../services/httpService';
import { apiURL, DEBUG_MODE } from '../shared/constants';
import { ProcessHttpmsgProvider } from './process-httpmsg';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class JobHistoryProvider {

  config: string;

  constructor(public http: HttpService,
    private cognito: Cognito,
    private ProcessHttpmsgService: ProcessHttpmsgProvider) {

    if (DEBUG_MODE) console.log('constructor - JobHistoryProvider');
    if (DEBUG_MODE) console.log('apiURL: ', apiURL);

    this.config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";

  }


  url() {
    return apiURL + 'candidates/' + this.username() + '/jobhistory/';
  }

  get(): Observable<Job[]> {

    if (DEBUG_MODE) console.log('ProcessHttpmsgProvider.get() with username: ', this.username());

    return this.http.get(this.url())
      .map(res => {return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});
  }

  add(job: Job): Observable<Job> {

      if (DEBUG_MODE) console.log('JobHistoryProvider.add() - adding', job);

      return this.http.post(this.url(), job, this.config)
      .map(
        res => {
          if (DEBUG_MODE) console.log('JobHistoryProvider.add() - success', res);
          return this.ProcessHttpmsgService.extractData(res)
        }
      )
      .catch(
        error => {
              if (DEBUG_MODE) console.log('JobHistoryProvider.add() - error while posting', this.url(), this.config, job, error);
              return this.ProcessHttpmsgService.handleError(error)
            }
      );

  }

  update(job: Job): Observable<Job> {

      return this.http.patch(this.url() + job.id.toString(), job, this.config)
      .map(res => {return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {
            if (DEBUG_MODE) console.log('JobHistoryProvider.update() - error while posting', this.url() + job.id.toString(), this.config, job, error);
            return this.ProcessHttpmsgService.handleError(error)
          });

  }

  delete(id: number): Observable<Job[]> {

      return this.http.delete(this.url() + id.toString(), this.config)
      .map(res => {
            if (DEBUG_MODE) console.log('JobHistoryProvider.delete() - success.', res);
            return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {
            if (DEBUG_MODE) console.log('JobHistoryProvider.delete() - error while deleting', this.url() + id.toString(), this.config, error);
            return this.ProcessHttpmsgService.handleError(error)
          });

  }

  new() {
    return  {
      account_name: this.username(),
      id: null,
      candidate_id: null,
      company_name: '',
      department: null,
      job_title: '',
      start_date: '',
      end_date: '',
      description: '',
      final_salary: null,
      create_date: ''
    };
  }

  username() {
    var user = this.cognito.getCurrentUser();
    return user.username;
  }


}
