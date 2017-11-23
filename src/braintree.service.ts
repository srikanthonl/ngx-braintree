import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BraintreeService {

  constructor(private http: HttpClient) {}

  getClientToken(clientTokenURL: string): Observable<string> {
    return this.http
      .get(clientTokenURL)
      .map((response: any) => {
        return response;
      })
      .catch((error) => {
        return Observable.throw(error);
      });
  }

  createPurchase(createPurchaseURL: string, nonce: string): Observable<boolean> {
    return this.http
      .post(createPurchaseURL, { nonce: nonce })
      .map((response: any) => {
        if (!response.Errors) {
          return true;
        } else {
          return false;
        }
      });
  }
}
