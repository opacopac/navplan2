import { TestBed, inject } from '@angular/core/testing';

import { MapActionService } from './map-action.service';

describe('MapActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapActionService]
    });
  });

  it('should be created', inject([MapActionService], (service: MapActionService) => {
    expect(service).toBeTruthy();
  }));
});
