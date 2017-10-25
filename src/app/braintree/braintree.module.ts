import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

//Directives
import { BraintreescriptDirective } from './directives/braintreescript.directive';

//Services
import { BraintreeService } from './services/braintree.service';

//Components
import { BraintreeComponent } from './braintree/braintree.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [BraintreeComponent, BraintreescriptDirective],
  exports:[
    BraintreeComponent
  ],
  providers:[
    { provide: BraintreeService, useClass: BraintreeService }
  ]
})
export class BraintreeModule { }
