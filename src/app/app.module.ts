import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxBraintreeModule } from './modules/ngx-braintree/ngx-braintree.module';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxBraintreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
