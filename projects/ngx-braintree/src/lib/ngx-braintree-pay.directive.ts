import { Directive, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { NgxBraintreeComponent } from './ngx-braintree.component';

@Directive({
  selector: '[ngxPay]'
})
export class NgxBraintreePayDirective implements OnInit, OnDestroy {



  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private ngxBtComponent: NgxBraintreeComponent) {

    // Disable the pay button initially. This will be enabled after the user fills the dropin information.
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', true);

    // Subscribe the payButtonStatus event to enable disable the pay button
    this.ngxBtComponent
      .payButtonStatus
      .subscribe((status: boolean) => {
        this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', !status);
      });

    // Handle click event for the pay button
    this.renderer.listen(this.elementRef.nativeElement, 'click', (event) => {
      this.ngxBtComponent.pay();
    });
  }

  ngOnInit() {
    // Set the text on the button to the buttonText property that was sent. 
    // this.renderer.setProperty(this.elementRef.nativeElement, 'innerText', this.ngxBtComponent.buttonText);
  }

  ngOnDestroy() {
  }

}
