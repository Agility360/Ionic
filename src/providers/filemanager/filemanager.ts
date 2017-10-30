import { Injectable } from '@angular/core';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../services/httpService';
import { apiURL, apiHttpOptions, DEBUG_MODE, HTTP_RETRIES } from '../../shared/constants';
import { ProcessHttpmsgProvider } from '.././process-httpmsg';
import { S3File } from '../../shared/s3file';

/*
  Generated class for the FilemanagerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FilemanagerProvider {

  constructor(public http: HttpService,
    private ProcessHttpmsgService: ProcessHttpmsgProvider) {

    if (DEBUG_MODE) console.log('FilemanagerProvider.constructor()');

  }

private url() {
  return '';
}

get(): Observable<S3File> {

  if (DEBUG_MODE) console.log('FilemanagerProvider.get()');
  return this.http.get(this.url(), apiHttpOptions)
    .retry(HTTP_RETRIES)
    .map(res => { return this.ProcessHttpmsgService.extractData(res) })
    .catch(error => { return this.ProcessHttpmsgService.handleError(error) });

}

add(file: S3File): Observable<S3File> {

  if (DEBUG_MODE) console.log('FilemanagerProvider.add()');
  return this.http.post(this.url(), file, apiHttpOptions)
    .retry(HTTP_RETRIES)
    .map(
    res => {
      if (DEBUG_MODE) console.log('FilemanagerProvider.add() - success', res);
      return this.ProcessHttpmsgService.extractData(res)
    }
    )
    .catch(
    error => {
      if (DEBUG_MODE) console.log('FilemanagerProvider.add() - error while posting', this.url(), apiHttpOptions, file, error);
      return this.ProcessHttpmsgService.handleError(error)
    }
    );


}

delete(file: S3File): Observable<S3File> {

  if (DEBUG_MODE) console.log('FilemanagerProvider.delete()');

  return this.http.delete(this.url() + file.Key, apiHttpOptions)
    .retry(HTTP_RETRIES)
    .map(res => {
      if (DEBUG_MODE) console.log('FilemanagerProvider.delete() - success.', res);
      return this.ProcessHttpmsgService.extractData(res)
    })
    .catch(error => {
      if (DEBUG_MODE) console.log('FilemanagerProvider.delete() - error while deleting', this.url() + file.toString(), apiHttpOptions, error);
      return this.ProcessHttpmsgService.handleError(error)
    });

}

}
