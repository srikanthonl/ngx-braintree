import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxBraintreeService } from './ngx-braintree.service';
declare var braintree: any;

@Component({
  selector: 'ngx-braintree',
  template: `
    <div *ngIf="showDropinUI && clientToken" ngxBraintreeDirective>
      <div id="dropin-container"></div>
      <button *ngIf="showPayButton" (click)="pay()">{{buttonText}}</button>
    </div>
    <div *ngIf="clientTokenNotReceived" class="error">
      Error! Client token not received.
    </div>`,
  styles: [`
    button {
      background-color: #009CDE;
      color: #f9f9f9;
      border: none;
      border-radius: 4px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      cursor: pointer; }
    .error{
			color: #D8000C;
      background-color: #FFBABA;
      border: none;
      border-radius: 4px;
      height: 40px;
      line-height: 40px;
		}`]
})
export class NgxBraintreeComponent implements OnInit {

  @Input() clientTokenURL: string;
  @Input() createPurchaseURL: string;
  @Output() paymentStatus: EventEmitter<any> = new EventEmitter<any>();
  clientToken: string;
  nonce: string;
  showDropinUI = true;

  showPayButton = false; // to display the pay button only after the dropin UI has rendered (well, almost)
  clientTokenNotReceived = false; // to show the error, "Error! Client token not received."
  interval: any;
  instance: any;

  // Optional inputs
  @Input() buttonText = 'Buy'; // to configure the pay button text
  @Input() allowChoose = false;
  @Input() showCardholderName = false;

  constructor(private service: NgxBraintreeService) { }

  ngOnInit() {
    this.service
      .getClientToken(this.clientTokenURL)
      .subscribe((clientToken: string) => {
        this.clientToken = clientToken;
        this.clientTokenNotReceived = false;
        this.interval = setInterval(() => { this.createDropin(); }, 0);
      }, (error) => {
        this.clientTokenNotReceived = true;
        console.error(`Client token not received.
          Please make sure your braintree server api is configured properly, running and accessible.`);
      });
  }

  createDropin() {
    var dropinConfig: any = {};

    dropinConfig.authorization = this.clientToken;
    dropinConfig.container = '#dropin-container';
    if (this.showCardholderName) {
      dropinConfig.card = {
        cardholderName: {
          required: this.showCardholderName
        }
      }
    }


    if (typeof braintree !== 'undefined') {
      braintree.dropin.create(dropinConfig, (createErr, instance) => {
        if (createErr) {
          console.error(createErr);
          return;
        }
        this.instance = instance;
      });
      clearInterval(this.interval);
      this.showPayButton = true;
    }
  }

  pay(): void {
    if (this.instance) {
      this.instance.requestPaymentMethod((err, payload) => {
        if (err) {
          console.error(err);
          return;
        }
        if (!this.allowChoose) { // process immediately after tokenization
          this.nonce = payload.nonce;
          this.showDropinUI = false;
          this.confirmPay();
        } else { // dont process immediately. Give user a chance to change his payment details.
          if (!this.nonce) { // previous nonce doesn't exist
            this.nonce = payload.nonce;
          } else { // a nonce exists already
            if (this.nonce === payload.nonce) { // go ahead with payment
              this.confirmPay();
            } else {
              this.nonce = payload.nonce;
            }
          }
        }
      });
    }
  }

  confirmPay(): void {
    this.showDropinUI = false;
    this.service
      .createPurchase(this.createPurchaseURL, this.nonce)
      .subscribe((status: any) => {
        this.paymentStatus.emit(status);
      });
  }
}
