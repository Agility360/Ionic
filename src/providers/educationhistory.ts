import { Injectable } from '@angular/core';
import { Education } from '../shared/education';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgProvider } from './process-httpmsg';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class EducationHistoryProvider {

  constructor(public http: Http,
    private ProcessHttpmsgService: ProcessHttpmsgProvider) {

    console.log('instantiated JobHistoryProvider');
  }

  getEducationHistory(username: string): Observable<Education[]> {
    return this.http.get(baseURL + 'candidates/' + username + '/education')
      .map(res => {return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});
  }

  addEducationHistory(username: string, education: Education) {
      var url = baseURL + 'candidates/' + username + '/education';
      var config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";

      this.http.post(url, education, config)
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});

      return true;
  }

  updateEducationHistory(username: string, education: Education) {
      var url = baseURL + 'candidates/' + username + '/education';
      var config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";

      this.http.patch(url, education, config)
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
