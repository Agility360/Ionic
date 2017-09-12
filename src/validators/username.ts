import { FormControl } from '@angular/forms';
import { DEBUG_MODE } from '../shared/constants';

export class UsernameValidator {

  static checkUsername(control: FormControl): any {
    if (DEBUG_MODE) console.log('UsernameValidator.checkUsername()');

    return new Promise(resolve => {

      //Fake a slow response from server

      setTimeout(() => {
        if(control.value.toLowerCase() === "mcdaniel"){

          resolve({
            "username taken": true
          });

        } else {
          resolve(null);
        }
      }, 2000);

    });
  }

}
