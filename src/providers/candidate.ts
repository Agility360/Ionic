import { Injectable } from '@angular/core';
import { Candidate } from '../shared/candidate';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgProvider } from './process-httpmsg';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class CandidateProvider {

  constructor(public http: Http,
    private ProcessHttpmsgService: ProcessHttpmsgProvider) {

    console.log('instantiated CandidateProvider');
  }

  getCandidate(username: string): Observable<Candidate[]> {
    return this.http.get(baseURL + 'candidates/' + username)
      .map(res => {return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});
  }

  addCandidate(candidate: Candidate) {
      var url = baseURL + 'candidates';
      var config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";

      this.http.post(url, candidate, config)
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});

      return true;
  }

  updateCandidate(candidate: Candidate) {
      var url = baseURL + 'candidates/' + candidate.account_name + '/jobhistory';
      var config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";

      this.http.patch(url, candidate, config)
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});

      return true;
  }

  deleteCandidate(username: string) {
      var url = baseURL + 'candidates/' + username;
      var config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";

      this.http.delete(url, config)
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});

      return true;
  }

}
