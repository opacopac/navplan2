import { TestBed, inject } from '@angular/core/testing';

import { FlighttimerService } from './flighttimer.service';

describe('FlighttimerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlighttimerService]
    });
  });

  it('should be created', inject([FlighttimerService], (service: FlighttimerService) => {
    expect(service).toBeTruthy();
  }));
});
