import { TestBed, inject } from '@angular/core/testing';

import { BraintreeService } from './braintree.service';

describe('BraintreeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BraintreeService]
    });
  });

  it('should be created', inject([BraintreeService], (service: BraintreeService) => {
    expect(service).toBeTruthy();
  }));
});
