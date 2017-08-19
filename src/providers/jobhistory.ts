/*====================================================================
* McDaniel Aug-2017
*
* For Job History array from agility REST api
* ====================================================================*/
import { Injectable } from '@angular/core';
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

  constructor(public http: Http,
    private ProcessHttpmsgService: ProcessHttpmsgProvider) {

    console.log('instantiated JobHistoryProvider');
    console.log('baseURL: ', baseURL);
  }

  newJob() {
    return  {
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

  getJobHistory(username: string): Observable<Job[]> {

    console.log('ProcessHttpmsgProvider.getJobHistory() with username: ', username);

    return this.http.get(baseURL + 'candidates/' + username + '/jobhistory')
      .map(res => {return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});
  }

  addJobHistory(username: string, job: Job) {
      var url = baseURL + 'candidates/' + username + '/jobhistory';
      var config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";

      this.http.post(url, job, config)
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});

      /* Requery the database for fresh data. */
      return this.http.get(baseURL + 'candidates/' + username + '/jobhistory/inserted')
        .map(res => {return this.ProcessHttpmsgService.extractData(res)})
        .catch(error => {return this.ProcessHttpmsgService.handleError(error)});
  }

  updateJobHistory(username: string, job: Job): Observable<Job> {
      var url = baseURL + 'candidates/' + username + '/jobhistory';
      var config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";

      this.http.patch(url, job, config)
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});

      /* Requery the database for fresh data. */
      return this.http.get(baseURL + 'candidates/' + username + '/jobhistory/' + job.id)
        .map(res => {return this.ProcessHttpmsgService.extractData(res)})
        .catch(error => {return this.ProcessHttpmsgService.handleError(error)});
  }

  deleteJobHistory(username: string, id: number): Observable<Job[]> {
      var url = baseURL + 'candidates/' + username + '/jobhistory/' + id;
      var config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";

      this.http.delete(url, config)
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});

      /* refresh our screen data by returning a fresh query of the Job History data after the delete has executed. */
      return this.getJobHistory(username);
  }

}
