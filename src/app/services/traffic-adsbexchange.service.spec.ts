import { TestBed, inject } from '@angular/core/testing';

import { AdsbexchangeTrafficService } from './traffic-adsbexchange.service';

describe('AdsbexchangeTrafficService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdsbexchangeTrafficService]
    });
  });

  it('should be created', inject([AdsbexchangeTrafficService], (service: AdsbexchangeTrafficService) => {
    expect(service).toBeTruthy();
  }));
});
