import { TestBed, inject } from '@angular/core/testing';

import { NgxBraintreeService } from './ngx-braintree.service';

describe('NgxBraintreeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxBraintreeService]
    });
  });

  it('should be created', inject([NgxBraintreeService], (service: NgxBraintreeService) => {
    expect(service).toBeTruthy();
  }));
});
