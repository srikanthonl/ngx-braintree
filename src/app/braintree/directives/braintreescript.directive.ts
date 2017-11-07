import { Directive, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appBraintreescript]'
})
export class BraintreescriptDirective implements OnInit, OnDestroy {

  script: any;

  constructor() {
  }

  ngOnInit() {
    this.script = document.createElement("script");
    this.script.type = "text/javascript";
    this.script.src = "https://js.braintreegateway.com/web/dropin/1.8.0/js/dropin.min.js";
    document.getElementsByTagName('body')[0].appendChild(this.script);
  }

  ngOnDestroy() {
    document.getElementsByTagName('body')[0].removeChild(this.script);
  }
}