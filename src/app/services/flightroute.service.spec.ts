import { TestBed, inject } from '@angular/core/testing';

import { FlightrouteService } from './flightroute.service';

describe('FlightrouteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlightrouteService]
    });
  });

  it('should be created', inject([FlightrouteService], (service: FlightrouteService) => {
    expect(service).toBeTruthy();
  }));
});
