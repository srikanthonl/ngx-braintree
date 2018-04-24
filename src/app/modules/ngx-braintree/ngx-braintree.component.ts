import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgxBraintreeService} from './ngx-braintree.service';
import {ConfigureDropinService} from './configure-dropin.service';

declare var braintree: any;

@Component({
  selector: 'ngx-braintree',
  template: `
    <div *ngIf="showLoader" style="position:relative; left: 50%; top: '50%';"><img src="/assets/images/loader.gif" /></div>
    <div class="error" *ngIf="errorMessage">Error</div>
    <div class="errorInfoDiv" *ngIf="errorMessage">{{errorMessage}}</div>
    <div *ngIf="showDropinUI && clientToken" ngxBraintreeDirective>
      <div id="dropin-container"></div>
      <div *ngIf="!enabledStyle && !disabledStyle">
        <button [disabled]="!enablePayButton" class=" {{ enablePayButton ? 'btn' : 'btn-disabled' }} " *ngIf="showPayButton" (click)="pay()">
          {{buttonText}}
        </button>
      </div>
      <div *ngIf="enabledStyle && disabledStyle">
        <button [disabled]="!enablePayButton" [ngStyle]="enablePayButton ? enabledStyle : disabledStyle" *ngIf="showPayButton" (click)="pay()">
          {{buttonText}}
        </button>
      </div>
    </div>
    <div *ngIf="clientTokenNotReceived">
      <div class="error">Error! Client token not received.</div>
      <div class="errorInfoDiv">Make sure your clientTokenURL's JSON response is as shown below:
        <pre>{{ '{' }}"token":"braintree_client_token_generated_on_your_server"{{'}'}}</pre>
      </div>
    </div>`,
  styles: [`
    .btn {
      background-color: #009CDE;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      cursor: pointer;
    }

    .btn-disabled {
      background-color: lightblue;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      cursor: not-allowed;
    }

    .error {
      color: #ffffff;
      background-color: red;
      font-weight: bolder;
      font-family: monospace;
      border: none;
      border-radius: 4px;
      height: 30px;
      line-height: 30px;
    }

    .errorInfoDiv {
      border-bottom: 2px solid red;
      border-left: 2px solid red;
      border-right: 2px solid red;
      font-family: monospace;
    }`]
})
export class NgxBraintreeComponent implements OnInit {
  @Output() paymentStatus: EventEmitter<any> = new EventEmitter<any>();

  @Input() clientTokenURL: string;
  @Input() createPurchaseURL: string;
  @Input() chargeAmount: number;

  // Optional inputs
  @Input() buttonText = 'Buy'; // to configure the pay button text
  @Input() allowChoose = false;
  @Input() showCardholderName = false;
  @Input() enablePaypalCheckout = false;
  @Input() enablePaypalVault = false;
  @Input() currency: string;
  @Input() locale: string;
  @Input() enabledStyle: any;
  @Input() disabledStyle: any;

  clientToken: string;
  nonce: string;
  showDropinUI = true;
  errorMessage: string;

  showPayButton = false; // to display the pay button only after the dropin UI has rendered.
  clientTokenNotReceived = false; // to show the error, "Error! Client token not received."
  interval: any;
  instance: any;
  dropinConfig: any = {};
  enablePayButton = false;
  showLoader = true;

  @Input() getClientToken: Function = () => this.service.getClientToken(this.clientTokenURL);
  @Input() createPurchase: Function = (nonce, chargeAmount) => this.service.createPurchase(this.createPurchaseURL, nonce, chargeAmount);

  constructor(
    private service: NgxBraintreeService,
    private configureDropinService: ConfigureDropinService,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (this.enablePaypalCheckout && this.enablePaypalVault) {
      this.errorMessage = 'Please make sure either Paypal Checkout or Paypal Vault is set to true. Both cannot be true at the same time.';
    } else if (this.enablePaypalCheckout && !this.currency) { // user should provide currency for paypal checkout.
      this.errorMessage = 'Please provide the currency for Paypal Checkout. ex: [currency]="\'USD\'"';
    } else {
      this.generateDropInUI();
    }
  }

  generateDropInUI() {
    this.getClientToken()
      .subscribe((clientToken: string) => {
        if (!clientToken) {
          this.clientTokenNotReceived = true;
        } else {
          this.clientToken = clientToken;
          this.clientTokenNotReceived = false;
          this.interval = setInterval(() => {
            this.createDropin();
          }, 0);
        }
      }, (error) => {
        this.clientTokenNotReceived = true;
        console.error(`Client token not received.
        Please make sure your braintree server api is configured properly, running and accessible.`);
      });
  }

  createDropin() {
    if (typeof braintree !== 'undefined') {
      this.dropinConfig.authorization = this.clientToken;
      this.dropinConfig.container = '#dropin-container';

      if (this.showCardholderName) {
        this.configureDropinService.configureCardHolderName(this.dropinConfig);
      }
      if (this.enablePaypalCheckout) {
        this.configureDropinService.configurePaypalCheckout(this.dropinConfig, this.chargeAmount, this.currency);
      }
      if (this.enablePaypalVault) {
        this.configureDropinService.configurePaypalVault(this.dropinConfig);
      }
      if (this.locale) {
        this.configureDropinService.configureLocale(this.dropinConfig, this.locale);
      }

      braintree.dropin.create(this.dropinConfig, (createErr, instance) => {
        if (createErr) {
          console.error(createErr);
          this.errorMessage = createErr;
          this.showLoader = false;  
          return;
        }
        this.showPayButton = true;
        this.showLoader = false;
        this.instance = instance;
        if (this.instance.isPaymentMethodRequestable()) {
          this.enablePayButton = true;
        }
        this.instance.on('paymentMethodRequestable', (event) => {
          this.enablePayButton = true;
          this.changeDetectorRef.detectChanges();
        });
        this.instance.on('noPaymentMethodRequestable', (event) => {
          this.enablePayButton = false;
          this.changeDetectorRef.detectChanges();
        });
      });
      clearInterval(this.interval);
    }
  }

  pay(): void {
    if (this.instance) {
      this.instance.requestPaymentMethod((err, payload) => {
        if (err) {
          console.error(err);
          this.errorMessage = err;
          return;
        } else {
          this.errorMessage = null;
        }
        if (!this.allowChoose) { // process immediately after tokenization
          this.nonce = payload.nonce;
          this.showDropinUI = false;
          this.showLoader = true;
          this.confirmPay();
        } else if (this.instance.isPaymentMethodRequestable()) {
          this.nonce = payload.nonce;
          this.showDropinUI = false;
          this.showLoader = true;
          this.confirmPay();
        }
      });
    }
  }

  confirmPay(): void {
    this.showDropinUI = false;
    this.createPurchase(this.nonce, this.chargeAmount)
      .subscribe((status: any) => {
        if (status.errors) {
          this.errorMessage = status.message;
          this.showDropinUI = true;
          this.generateDropInUI();
        }
        this.paymentStatus.emit(status);
        this.showLoader = false;
      });
  }
}
