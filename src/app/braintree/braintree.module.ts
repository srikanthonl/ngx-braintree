import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

//Directives
import { BraintreescriptDirective } from './directives/braintreescript.directive';

//Services
import { BraintreeService } from './services/braintree.service';

//Components
import { BraintreeComponent } from './braintree/braintree.component';
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
  ],
  providers: [
    { provide: BraintreeService, useClass: BraintreeService }
  ]
})
export class BraintreeModule { }
