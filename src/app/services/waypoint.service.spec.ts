import { TestBed, inject } from '@angular/core/testing';

import { WaypointService } from './waypoint.service';

describe('WaypointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WaypointService]
    });
  });

  it('should be created', inject([WaypointService], (service: WaypointService) => {
    expect(service).toBeTruthy();
  }));
});
