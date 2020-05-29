import { Directive, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[ngxBraintreeDirective]'
})
export class NgxBraintreeDirective implements OnInit, OnDestroy {

  script: any;

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
    this.script = this.renderer.createElement('script');
    this.script.type = 'text/javascript';
    this.script.src = 'https://js.braintreegateway.com/web/dropin/1.22.1/js/dropin.min.js';
    this.renderer.appendChild(this.document.body, this.script);
  }

  ngOnDestroy() {
    this.renderer.removeChild(this.document.body, this.script);
  }

}
