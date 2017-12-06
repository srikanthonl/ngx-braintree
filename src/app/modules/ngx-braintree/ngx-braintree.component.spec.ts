import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBraintreeComponent } from './ngx-braintree.component';

describe('NgxBraintreeComponent', () => {
  let component: NgxBraintreeComponent;
  let fixture: ComponentFixture<NgxBraintreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxBraintreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBraintreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
