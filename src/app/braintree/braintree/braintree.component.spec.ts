import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BraintreeComponent } from './braintree.component';

describe('BraintreeComponent', () => {
  let component: BraintreeComponent;
  let fixture: ComponentFixture<BraintreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BraintreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BraintreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
