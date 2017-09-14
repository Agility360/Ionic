/*====================================================================
* McDaniel Aug-2017
* Auto-generated by Ionic CLI starter app for AWS.
* Stay out of this code!
* ====================================================================*/
import { Injectable } from '@angular/core';
import { Config } from 'ionic-angular';
import { Cognito } from './providers';
import { DEBUG_MODE } from '../shared/constants';

declare var AWS: any;
declare const aws_cognito_region;
declare const aws_cognito_identity_pool_id;
declare const aws_user_pools_id;
declare const aws_user_pools_web_client_id;

@Injectable()
export class User {

  private user: any;
  public loggedIn: boolean = false;

  constructor(
    public cognito: Cognito,
    public config: Config) {
    if (DEBUG_MODE) console.log('User.constructor()');
    this.user = this.getUser();
  }

  getUser() {
    if (DEBUG_MODE) console.log('User.getUser()');
    return this.user;
  }

  getUsername() {
    if (DEBUG_MODE) console.log('User.getUsername()');
    return this.getUser().getUsername();
  }

  login(username, password) {
    if (DEBUG_MODE) console.log('User.login()');
    return new Promise((resolve, reject) => {
      let user = this.cognito.makeUser(username);
      let authDetails = this.cognito.makeAuthDetails(username, password);

      user.authenticateUser(authDetails, {
        'onSuccess': (result: any) => {

          if (DEBUG_MODE) console.log('User.login() -- success.');
          var logins = {};
          var loginKey = 'cognito-idp.' +
            aws_cognito_region +
            '.amazonaws.com/' +
            aws_user_pools_id;
          logins[loginKey] = result.getIdToken().getJwtToken();

          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            'IdentityPoolId': aws_cognito_identity_pool_id,
            'Logins': logins
          });

          this.isAuthenticated().then(() => {
            resolve();
          }).catch((err) => {
            if (DEBUG_MODE) console.log('User.login() -- failed.');
          });

        },

        'onFailure': (err: any) => {

          if (DEBUG_MODE) console.log('User.login() -- failed.');
          reject(err);

        }
      });
    });
  }

  logout() {
    if (DEBUG_MODE) console.log('User.logout()');
    this.user = null;
    this.cognito.getUserPool().getCurrentUser().signOut();
  }

  register(username, password, attr) {
    if (DEBUG_MODE) console.log('User.register()');
    let attributes = [];

    for (var x in attr) {
      attributes.push(this.cognito.makeAttribute(x, attr[x]));
    }

    return new Promise((resolve, reject) => {
      this.cognito.getUserPool().signUp(username, password, attributes, null, function(err, result) {
        if (err) {
          if (DEBUG_MODE) console.log('User.register() -- error', err);
          reject(err);
        } else {
          if (DEBUG_MODE) console.log('User.register() -- success');
          resolve(result.user);
        }
      });
    });
  }

  confirmRegistration(username, code) {
    if (DEBUG_MODE) console.log('User.confirmRegistration()');
    return new Promise((resolve, reject) => {
      let user = this.cognito.makeUser(username);
      user.confirmRegistration(code, true, (err, result) => {
        if (err) {
          if (DEBUG_MODE) console.log('User.confirmRegistration() - error', err);
          reject(err);
        } else {
          if (DEBUG_MODE) console.log('User.confirmRegistration() - success', result);
          resolve(result);
        }
      });
    });
  }

  resendRegistrationCode(username) {
    if (DEBUG_MODE) console.log('User.resendRegistrationCode()', username);
    return new Promise((resolve, reject) => {
      let user = this.cognito.makeUser(username);
      user.resendConfirmationCode((err, result) => {
        if (err) {
          if (DEBUG_MODE) console.log('User.resendRegistrationCode() - error', err);
          reject(err);
        } else {
          if (DEBUG_MODE) console.log('User.resendRegistrationCode() - sucess');
          resolve();
        }
      });
    });
  }

  isAuthenticated() {
    if (DEBUG_MODE) console.log('User.isAuthenticated()');
    return new Promise((resolve, reject) => {
      let user = this.cognito.getCurrentUser();
      if (user != null) {
        user.getSession((err, session) => {
          if (err) {
            if (DEBUG_MODE) console.log('User.isAuthenticated() - error', err);
            reject()
          } else {
            if (DEBUG_MODE) console.log('User.isAuthenticated() - success');
            var logins = {};
            var loginKey = 'cognito-idp.' +
              aws_cognito_region +
              '.amazonaws.com/' +
              aws_user_pools_id;
            logins[loginKey] = session.getIdToken().getJwtToken();

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
              'IdentityPoolId': aws_cognito_identity_pool_id,
              'Logins': logins
            });

            this.user = user;
            resolve()
          }
        });
      } else {
        if (DEBUG_MODE) console.log('User.isAuthenticated() - failure. Null user');
        reject()
      }
    });
  }


  isAvailable(username) {
    if (DEBUG_MODE) console.log('User.isAvailable: ', username);

    this.register(username, "", { 'email': "mail@mail.com" })
      .then((user) => {
        if (DEBUG_MODE) console.log('User.isAvailable() - success. registered. WTF?');
      }).catch((err) => {
        if (DEBUG_MODE) console.log('User.isAvailable() - error.', err);
      });


    return true;
  }


}
