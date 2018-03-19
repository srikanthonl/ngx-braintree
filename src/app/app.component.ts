import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  paymentResponse: any;
  chargeAmount = 55.55;

  onPaymentStatus(response): void {
    this.paymentResponse = response;
  }
}
