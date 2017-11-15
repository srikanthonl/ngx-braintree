import { Directive, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[appBraintreescript]'
})
export class BraintreescriptDirective implements OnInit, OnDestroy {

  script: any;

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.script = this.renderer.createElement('script');
    this.script.type = 'text/javascript';
    this.script.src = 'https://js.braintreegateway.com/web/dropin/1.8.0/js/dropin.min.js';
    this.renderer.appendChild(this.document.body, this.script);
  }

  ngOnDestroy() {
    this.renderer.removeChild(this.document.body, this.script);
  }
}
