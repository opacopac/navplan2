import { TestBed, inject } from '@angular/core/testing';

import { TrafficAdsbexchangeService } from './traffic-adsbexchange.service';

describe('TrafficAdsbexchangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrafficAdsbexchangeService]
    });
  });

  it('should be created', inject([TrafficAdsbexchangeService], (service: TrafficAdsbexchangeService) => {
    expect(service).toBeTruthy();
  }));
});
