import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxBraintreeService } from './ngx-braintree.service';

import { NgxBraintreeComponent } from './ngx-braintree.component';
import { NgxBraintreeDirective } from './ngx-braintree.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgxBraintreeComponent, NgxBraintreeDirective],
  exports: [
    NgxBraintreeComponent
  ],
  providers: [
    { provide: NgxBraintreeService, useClass: NgxBraintreeService }
  ]
})
export class NgxBraintreeModule { }
