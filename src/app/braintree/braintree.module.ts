import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Directives
import { BraintreescriptDirective } from './directives/braintreescript.directive';

// Components
import { BraintreeComponent } from './containers/braintree/braintree.component';
import { DropinComponent } from './components/dropin/dropin.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
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
