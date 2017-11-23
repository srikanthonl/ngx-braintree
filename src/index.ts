import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BraintreeComponent } from './braintree.component';
import { BraintreeDirective } from './braintree.directive';
import { BraintreeService } from './braintree.service';

export * from './braintree.component';
export * from './braintree.directive';
export * from './braintree.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BraintreeComponent,
    BraintreeDirective
  ],
  exports: [
    BraintreeComponent,
    BraintreeDirective
  ]
})
export class BraintreeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BraintreeModule,
      providers: [BraintreeService]
    };
  }
}
