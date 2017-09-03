/*====================================================================
* McDaniel Aug-2017
*
* For candidate entity from agility REST api
* ====================================================================*/
import { Injectable } from '@angular/core';
import { Cognito } from './aws.cognito';
import { Candidate } from '../shared/candidate';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../services/httpService';
import { apiURL, apiHttpOptions, DEBUG_MODE } from '../shared/constants';
import { ProcessHttpmsgProvider } from './process-httpmsg';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class CandidateProvider {

  config: string;

  constructor(public http: HttpService,
    private cognito: Cognito,
    private ProcessHttpmsgService: ProcessHttpmsgProvider) {

    if (DEBUG_MODE) console.log('CandidateProvider.constructor()');
    this.config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";
  }

  url() {
    return apiURL + 'candidates/' + this.username();
  }

  get(): Observable<Candidate> {
    if (DEBUG_MODE) console.log('ProcessHttpmsgProvider.get() with username: ', this.username());

    return this.http.get(this.url(), apiHttpOptions)
      .map(res => { return this.ProcessHttpmsgService.extractData(res) })
      .catch(error => { return this.ProcessHttpmsgService.handleError(error) });
  }

  add(obj: Candidate): Observable<Candidate> {

    if (DEBUG_MODE) console.log('CandidateProvider.add() - adding', obj);

    return this.http.post(this.url(), obj, this.config)
      .map(
      res => {
        if (DEBUG_MODE) console.log('CandidateProvider.add() - success', res);
        return this.ProcessHttpmsgService.extractData(res)
      }
      )
      .catch(
      error => {
        if (DEBUG_MODE) console.log('CandidateProvider.add() - error while posting', this.url, this.config, obj, error);
        return this.ProcessHttpmsgService.handleError(error)
      }
      );

  }



  update(candidate: Candidate): Observable<Candidate[]> {

    return this.http.patch(this.url(), candidate, this.config)
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

  delete() {

    if (DEBUG_MODE) console.log('CandidateProvider.delete()');
    this.http.delete(this.url + this.username(), this.config)
      .catch(error => { return this.ProcessHttpmsgService.handleError(error) });

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

  username() {
    var user = this.cognito.getCurrentUser();
    return user.username;
  }


}
