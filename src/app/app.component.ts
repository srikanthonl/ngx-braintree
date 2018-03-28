import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  paymentResponse: any;
  chargeAmount = 55.55;

  constructor(private http: HttpClient) { }

  onPaymentStatus(response): void {
    this.paymentResponse = response;
  }

  // ES 5 Function
  getClientToken(): Observable<string> {
    return this.http
      .get('api/braintree/getclienttoken', { responseType: 'json' })
      .map((response: any) => {
        return response.token;
      })
      .catch((error) => {
        return Observable.throw(error);
      });
  }

  // ES 5 Function
  createPurchase(nonce: string, chargeAmount: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
    .post('api/braintree/createpurchase', { nonce: nonce, chargeAmount: chargeAmount }, { 'headers': headers })
      .map((response: any) => {
        return response;
      });
  }

  // ES 2015 Function
  // getClientToken = () => {
  //   return this.http
  //     .get('api/braintree/getclienttoken', { responseType: 'json' })
  //     .map((response: any) => {
  //       return response.token;
  //     })
  //     .catch((error) => {
  //       return Observable.throw(error);
  //     });
  // }

  // ES 2015 Function
  // createPurchase = (nonce: string, chargeAmount: number) => {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http
  //     .post('api/braintree/createpurchase', { nonce: nonce, chargeAmount: chargeAmount }, { 'headers': headers })
  //     .map((response: any) => {
  //       return response;
  //     });
  // }

}
