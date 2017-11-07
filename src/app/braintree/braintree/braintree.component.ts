import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
declare var braintree: any;
import { BraintreeService } from '../services/braintree.service';

@Component({
  selector: 'app-braintree',
  templateUrl: './braintree.component.html',
  styleUrls: ['./braintree.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BraintreeComponent implements OnInit {

  @Input() clientTokenURL: string;
  @Input() createPurchaseURL: string;
  @Output() paymentStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  clientToken: string;
  instance: any;
  showDropinUI: boolean = true;
  interval: any;

  constructor(private braintreeService: BraintreeService) { }

  ngOnInit() {
    this.braintreeService
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
        this.braintreeService
          .createPurchase(this.createPurchaseURL, payload.nonce)
          .subscribe((status: boolean) => {
            if (status)
              this.paymentStatus.emit(true);
            else
              this.paymentStatus.emit(false);
          });
      });
    }
  }

}
