/*====================================================================
* McDaniel Aug-2017
*
* For candidate entity from agility REST api
* ====================================================================*/
import { Injectable } from '@angular/core';
import { Candidate } from '../shared/candidate';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { apiURL } from '../shared/constants';
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
    return this.http.get(apiURL + 'candidates/' + username)
      .map(res => {return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});
  }

  addCandidate(candidate: Candidate) {
      var url = apiURL + 'candidates';
      var config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";

      this.http.post(url, candidate, config)
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});

      return true;
  }

  updateCandidate(candidate: Candidate) {
      var url = apiURL + 'candidates/' + candidate.account_name + '/jobhistory';
      var config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";

      this.http.patch(url, candidate, config)
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});

      return true;
  }

  deleteCandidate(username: string) {
      var url = apiURL + 'candidates/' + username;
      var config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";

      this.http.delete(url, config)
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});

      return true;
  }

}
