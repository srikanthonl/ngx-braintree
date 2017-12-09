import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxBraintreeService } from './ngx-braintree.service';
declare var braintree: any;

@Component({
  selector: 'ngx-braintree',
  template: `<div *ngIf="showDropinUI && clientToken" ngxBraintreeDirective>
    <div id="dropin-container"></div>
    <button (click)="pay()" *ngIf="clientToken">{{buttonText}}</button>
  </div>`,
  styles: [`button { background-color: #009CDE; color: #f9f9f9; border: none;
    border-radius: 4px; height: 40px; line-height: 40px; font-size: 16px; cursor: pointer; }`]
})
export class NgxBraintreeComponent implements OnInit {

  @Input() clientTokenURL: string;
  @Input() createPurchaseURL: string;
  @Output() paymentStatus: EventEmitter<any> = new EventEmitter<any>();
  clientToken: string;
  showDropinUI = true;
  interval: any;
  instance: any;

  // Optional inputs
  @Input() buttonText = 'Buy';

  constructor(private service: NgxBraintreeService) { }

  ngOnInit() {
    this.service
      .getClientToken(this.clientTokenURL)
      .subscribe((clientToken: string) => {
        this.clientToken = clientToken;
        this.interval = setInterval(() => { this.createDropin(); }, 0);
      }, (error) => {
        console.log(`Please make sure your braintree server api is configured properly
               running and accessible.`);
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
          .subscribe((status: any) => {
            this.paymentStatus.emit(status);
          });
      });
    }
  }

}
