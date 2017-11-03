import { Directive, OnInit } from '@angular/core';

@Directive({
    selector: '[appBraintreescript]'
})
export class BraintreescriptDirective implements OnInit {

    constructor() {
    }

    ngOnInit() {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://js.braintreegateway.com/web/dropin/1.8.0/js/dropin.min.js";
        document.getElementsByTagName('body')[0].appendChild(script);
    }
}