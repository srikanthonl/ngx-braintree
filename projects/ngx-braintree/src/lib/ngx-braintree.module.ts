import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxBraintreeService } from './ngx-braintree.service';
import { ConfigureDropinService } from './configure-dropin.service';

import { NgxBraintreeComponent } from './ngx-braintree.component';
import { NgxBraintreeDirective } from './ngx-braintree.directive';
import { NgxBraintreePayDirective } from './ngx-braintree-pay.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxBraintreeComponent,
    NgxBraintreeDirective,
    NgxBraintreePayDirective
  ],
  exports: [
    NgxBraintreeComponent,
    NgxBraintreePayDirective
  ],
  providers: [
    { provide: NgxBraintreeService, useClass: NgxBraintreeService },
    { provide: ConfigureDropinService, useClass: ConfigureDropinService }
  ]
})
export class NgxBraintreeModule { }
