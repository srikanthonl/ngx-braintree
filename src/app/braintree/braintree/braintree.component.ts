import { Component, OnInit, Input } from '@angular/core';
declare var braintree: any;
import { BraintreeService } from '../services/braintree.service';

@Component({
selector: 'app-braintree',
templateUrl: './braintree.component.html',
styleUrls: ['./braintree.component.css']
})
export class BraintreeComponent implements OnInit {

@Input() clientTokenURL: string;
@Input() createPurchaseURL: string;
clientToken: string;
instance: any;

constructor(private braintreeService: BraintreeService) { }

ngOnInit() {
    this.braintreeService
    .getClientToken(this.clientTokenURL)
    .subscribe((clientToken: string) => {
        this.clientToken = clientToken;
        braintree.dropin.create({
        authorization: clientToken,
        container: '#dropin-container'
        }, (createErr, instance) => {
        this.instance = instance;
        console.log(this.instance);
        });
    });
}

pay(): void {
    if (this.instance) {
    this.instance.requestPaymentMethod((err, payload) => {
        this.braintreeService
        .createPurchase(this.createPurchaseURL, payload.nonce)
        .subscribe((status: boolean) => {
            if (status) {
                    console.log('Payment succeeded. Redirect to your thank you page here...');
            }
        });
    });
    }
}

}