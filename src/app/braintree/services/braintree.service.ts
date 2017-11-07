import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BraintreeService {

  constructor(private http: Http) { }

  getClientToken(clientTokenURL: string): Observable<string> {
    return this.http
      .get(clientTokenURL)
      .map((response: Response) => {
        return response.json();
      })
      .catch((error) => {
        return Observable.throw(error);
      });
  }

  createPurchase(createPurchaseURL: string, nonce: string): Observable<boolean> {
    return this.http
      .post(createPurchaseURL, { nonce: nonce })
      .map((response) => {
        return response.ok;
      });
  }

}