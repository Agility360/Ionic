import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DEBUG_MODE } from '../../shared/constants';

/*
  Generated class for the FilemanagerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FilemanagerProvider {

  constructor(public http: Http) {

    if (DEBUG_MODE) console.log('FilemanagerProvider.constructor()');

  }

get() {

  if (DEBUG_MODE) console.log('FilemanagerProvider.get()');

}

add() {

  if (DEBUG_MODE) console.log('FilemanagerProvider.add()');

}

delete() {

  if (DEBUG_MODE) console.log('FilemanagerProvider.delete()');

}

}
