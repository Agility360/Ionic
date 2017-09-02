/*------------------------------------------------------------------------------
  McDaniel
  Date:   Aug 2017

  Usage:  HTTP Interceptor to implement app-level behavior for
          http errors, waiting prompts, timeout, etc.

  Original code base from https://github.com/appwebhouse/ionic2-interceptors-app
 ------------------------------------------------------------------------------*/

import { Injectable } from '@angular/core';
import { Http, XHRBackend, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { App, LoadingController } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { HttpErrorPage } from '../pages/http-error/http-error';
import 'rxjs/Rx';
import { DEBUG_MODE } from '../shared/constants';

export const TIMEOUT = 10000

@Injectable()
export class HttpService extends Http {

  loading: any;

  constructor(
    xhrBackend: XHRBackend,
    requestOptions: RequestOptions,
    private app: App,
    public loadingCtrl: LoadingController) {

    super(xhrBackend, requestOptions);
    if (DEBUG_MODE) console.log('HttpService.constructor()');

  }

  /**
   * Performs any type of http request.
   * @param url
   * @param options
   * @returns {Observable<Response>}
   */
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    if (DEBUG_MODE) console.log('HttpService.request()', url, options);

    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Loading ...',
      showBackdrop: false,
      enableBackdropDismiss: true
    });
    this.loading.present();
    return super.request(url, options)
      .timeout(TIMEOUT);
  }

  /**
   * Performs a request with `get` http method.
   * @param url
   * @param options
   * @returns {Observable<>}
   */
  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    if (DEBUG_MODE) console.log('HttpService.get()', url, options);
    this.requestInterceptor();
    return super.get(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  getLocal(url: string, options?: RequestOptionsArgs): Observable<any> {
    if (DEBUG_MODE) console.log('HttpService.getLocal()', url, options);
    return super.get(url, options);
  }

  /**
   * Performs a request with `post` http method.
   * @param url
   * @param body
   * @param options
   * @returns {Observable<>}
   */
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    if (DEBUG_MODE) console.log('HttpService.post()', url, options);
    this.requestInterceptor();
    return super.post(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  /**
   * Performs a request with `put` http method.
   * @param url
   * @param body
   * @param options
   * @returns {Observable<>}
   */
  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    if (DEBUG_MODE) console.log('HttpService.put()', url, options);
    this.requestInterceptor();
    return super.put(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  /**
   * Performs a request with `put` http method.
   * @param url
   * @param body
   * @param options
   * @returns {Observable<>}
   */
  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    if (DEBUG_MODE) console.log('HttpService.patch()', url, options);
    this.requestInterceptor();
    return super.patch(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }


  /**
   * Performs a request with `delete` http method.
   * @param url
   * @param options
   * @returns {Observable<>}
   */
  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    if (DEBUG_MODE) console.log('HttpService.delete()', url, options);
    this.requestInterceptor();
    return super.delete(this.getFullUrl(url), options)
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }


  /**
   * Request options.
   * @param options
   * @returns {RequestOptionsArgs}
   */
  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (DEBUG_MODE) console.log('HttpService.requestOptions()', options);
    return options;
  }

  /**
   * Build API url.
   * @param url
   * @returns {string}
   */
  private getFullUrl(url: string): string {
    if (DEBUG_MODE) console.log('HttpService.getFullUrl()');
    return url;
  }

  /**
   * Request interceptor.
   */
  private requestInterceptor(): void {
    if (DEBUG_MODE) console.log('HttpService.requestInterceptor()');
  }

  /**
   * Response interceptor.
   */
  private responseInterceptor(): void {
    if (DEBUG_MODE) console.log('HttpService.responseInterceptor()');
  }

  /**
   * Error handler.
   * @param error
   * @param caught
   * @returns {ErrorObservable}
   */
  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    if (DEBUG_MODE) console.log('HttpService.onCatch()');
    return Observable.throw(error);
  }

  /**
   * onSubscribeSuccess
   * @param res
   */
  private onSubscribeSuccess(res: Response): void {
    this.loading.dismiss();
    if (DEBUG_MODE) console.log('HttpService.onSubscribeSuccess() - res:', res);
  }

  /**
   * onSubscribeError
   * @param error
   */
  private onSubscribeError(error: any): void {
    if (DEBUG_MODE) console.log('HttpService.onSubscribeError() - error:', error);

    if (error.name) {
      if (error.name == "TimeoutError") {
        this.loading.dismiss();
        this.moveToHttpError();
      }
    }


    switch (error.status) {
      case 401:
        this.moveToLogin();
        break;
      default:
        break;

    }
  }

  /**
   * onFinally
   */
  private onFinally(): void {
    if (DEBUG_MODE) console.log('HttpService.onFinally()');
    this.responseInterceptor();
  }

  /**
   * moveToLogin
   */
  private moveToLogin(): void {
    if (DEBUG_MODE) console.log('HttpService.moveToLogin()');
    let view = this.app.getRootNav().getActive();
    if (view.instance instanceof LoginPage) { }
    else { this.app.getRootNav().setRoot(LoginPage); }
  }

  private moveToHttpError(): void {
    if (DEBUG_MODE) console.log('HttpService.moveToHttpError()');
    this.app.getRootNav().push(HttpErrorPage);
  }

}
