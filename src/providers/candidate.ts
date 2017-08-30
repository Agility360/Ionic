/*====================================================================
* McDaniel Aug-2017
*
* For candidate entity from agility REST api
* ====================================================================*/
import { Injectable } from '@angular/core';
import { Candidate } from '../shared/candidate';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { apiURL, DEBUG_MODE } from '../shared/constants';
import { ProcessHttpmsgProvider } from './process-httpmsg';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class CandidateProvider {

  config: string;
  url: string;

  constructor(public http: Http,
    private ProcessHttpmsgService: ProcessHttpmsgProvider) {

    if (DEBUG_MODE) console.log('instantiated CandidateProvider');
    this.config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";
    this.url = apiURL + 'candidates/';
  }

  get(username: string): Observable<Candidate[]> {
    return this.http.get(this.url + username)
      .map(res => {return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});
  }

  add(candidate: Candidate): Observable<Candidate[]> {

      return this.http.post(this.url, candidate, this.config)
      .map(
        res => {
          if (DEBUG_MODE) console.log('CandidateProvider.add() - success', res);
          return this.ProcessHttpmsgService.extractData(res)
        }
      )
      .catch(
        error => {
              if (DEBUG_MODE) console.log('CandidateProvider.add() - error while posting', this.url, this.config, candidate, error);
              return this.ProcessHttpmsgService.handleError(error)
            }
      );

  }

  update(candidate: Candidate): Observable<Candidate[]> {

      return this.http.patch(this.url, candidate, this.config)
      .map(
        res => {
          if (DEBUG_MODE) console.log('CandidateProvider.update() - success', res);
          return this.ProcessHttpmsgService.extractData(res)
        }
      )
      .catch(
        error => {
              if (DEBUG_MODE) console.log('CandidateProvider.update() - error while posting', this.url, this.config, candidate, error);
              return this.ProcessHttpmsgService.handleError(error)
            }
      );
  }

  delete(username: string) {

      if (DEBUG_MODE) console.log('CandidateProvider.delete()');
      this.http.delete(this.url + username, this.config)
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});

      return true;
  }

  new() {
    if (DEBUG_MODE) console.log('CandidateProvider.new()');
    return {
      candidate_id: null,
      account_name: '',
      email: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      city: '',
      state: '',
      phone_number: '',
      job_hunting: false,
      industry_id: null,
      subindustry_id: null,
      profession_id: null,
      subprofession_id: null,
      update_date: null,
      create_date: null
    };
  }

}
