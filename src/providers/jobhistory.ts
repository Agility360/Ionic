/*====================================================================
* McDaniel Aug-2017
*
* For Job History array from agility REST api
* ====================================================================*/
import { Injectable } from '@angular/core';
import { Cognito } from './aws.cognito';
import { Job } from '../shared/job';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgProvider } from './process-httpmsg';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class JobHistoryProvider {

  config: string;

  constructor(public http: Http,
    private cognito: Cognito,
    private ProcessHttpmsgService: ProcessHttpmsgProvider) {

    console.log('instantiated JobHistoryProvider');
    console.log('baseURL: ', baseURL);

    this.config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";

  }

  newJob() {
    var user = this.cognito.getCurrentUser();

    return  {
      account_name: user.username,
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

  url(username: string) {
    return baseURL + 'candidates/' + username + '/jobhistory/';
  }

  getJobHistory(username: string): Observable<Job[]> {

    console.log('ProcessHttpmsgProvider.getJobHistory() with username: ', username);

    return this.http.get(this.url(username))
      .map(res => {return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});
  }

  addJobHistory(username: string, job: Job): Observable<Job> {

      console.log('JobHistoryProvider.addJobHistory() - adding', job);

      return this.http.post(this.url(username), job, this.config)
      .map(res => {return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {
              console.log('JobHistoryProvider.addJobHistory() - error while posting', this.url(username), this.config, job, error);
              return this.ProcessHttpmsgService.handleError(error)
            });

  }

  updateJobHistory(username: string, job: Job): Observable<Job> {

      return this.http.patch(this.url(username), job, this.config)
      .map(res => {return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {
            console.log('JobHistoryProvider.addJobHistory() - error while posting', this.url(username), this.config, job, error);
            return this.ProcessHttpmsgService.handleError(error)
          });

  }

  deleteJobHistory(username: string, id: number): Observable<Job[]> {

      return this.http.delete(this.url(username) + id, this.config)
      .map(res => {return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});

  }

}
