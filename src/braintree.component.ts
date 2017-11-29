import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BraintreeService } from './braintree.service';
declare var braintree: any;

@Component({
  selector: 'ngx-braintree',
  template: `<div *ngIf="showDropinUI && clientToken" ngxBraintreeDirective>
    <div id="dropin-container"></div>
    <button (click)="pay()" *ngIf="clientToken">Pay</button>
  </div>
  <div *ngIf="!showDropinUI && !paymentSucceeded">Please wait...</div>
  <div *ngIf="paymentSucceeded">Payment Succeeded. Thank you</div>`
})
export class BraintreeComponent implements OnInit {

  @Input() clientTokenURL: string;
  @Input() createPurchaseURL: string;
  @Output() paymentStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  clientToken: string;
  showDropinUI = true;
  paymentSucceeded = false;
  interval: any;
  instance: any;

  constructor(private service: BraintreeService) { }

  ngOnInit() {
    this.service
      .getClientToken(this.clientTokenURL)
      .subscribe((clientToken: string) => {
        this.clientToken = clientToken;
        this.interval = setInterval(() => { this.createDropin(); }, 0);
      }, (error) => {
        console.log(`Please make sure your braintree server api is configured properly
               in proxy.config.json and running. For more information please refer the readme
               file of this project.`);
      });
  }

  createDropin() {
    if (typeof braintree !== 'undefined') {
      braintree.dropin.create({
        authorization: this.clientToken,
        container: '#dropin-container'
      }, (createErr, instance) => {
        this.instance = instance;
      });
      clearInterval(this.interval);
    }
  }

  pay(): void {
    if (this.instance) {
      this.instance.requestPaymentMethod((err, payload) => {
        this.showDropinUI = false;
        this.service
          .createPurchase(this.createPurchaseURL, payload.nonce)
          .subscribe((status: boolean) => {
            if (status) {
              this.paymentSucceeded = true;
              this.paymentStatus.emit(true);
            } else {
              this.paymentStatus.emit(false);
            }
          });
      });
    }
  }
}
