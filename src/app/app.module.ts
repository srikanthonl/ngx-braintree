import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Custom modules
import { BraintreeModule } from './braintree/braintree.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BraintreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
