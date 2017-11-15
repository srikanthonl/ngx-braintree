import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Directives
import { BraintreescriptDirective } from './directives/braintreescript.directive';

// Components
import { BraintreeComponent } from './containers/braintree/braintree.component';
import { DropinComponent } from './components/dropin/dropin.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BraintreeComponent,
    BraintreescriptDirective,
    DropinComponent
  ],
  exports: [
    BraintreeComponent
  ]
})
export class BraintreeModule { }
