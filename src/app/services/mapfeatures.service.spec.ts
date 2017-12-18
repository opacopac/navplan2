import { TestBed, inject } from '@angular/core/testing';

import { MapfeaturesService } from './mapfeatures.service';

describe('MapfeaturesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapfeaturesService]
    });
  });

  it('should be created', inject([MapfeaturesService], (service: MapfeaturesService) => {
    expect(service).toBeTruthy();
  }));
});
