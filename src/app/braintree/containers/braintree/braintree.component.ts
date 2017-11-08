import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { BraintreeService } from '../../services/braintree.service';

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
  showDropinUI: boolean = true;

  constructor(private braintreeService: BraintreeService) { }

  ngOnInit() {
    this.braintreeService
      .getClientToken(this.clientTokenURL)
      .subscribe((clientToken: string) => {
        this.clientToken = clientToken;
      }, (error) => {
        console.log(`Please make sure your braintree server api is configured properly
               in proxy.config.json and running. For more information please refer the readme 
               file of this project.`);
      });
  }

  pay(instance): void {
    console.log('in here: ' + instance);
    if (instance) {
      instance.requestPaymentMethod((err, payload) => {
        this.showDropinUI = false;
        this.braintreeService
          .createPurchase(this.createPurchaseURL, payload.nonce)
          .subscribe((status: boolean) => {
            console.log(status);
            if (status)
              this.paymentStatus.emit(true);
            else
              this.paymentStatus.emit(false);
          });
      });
    }
  }

}
