import { TestBed, inject } from '@angular/core/testing';

import { OlMapService } from './ol-map.service';

describe('OlMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OlMapService]
    });
  });

  it('should be created', inject([OlMapService], (service: OlMapService) => {
    expect(service).toBeTruthy();
  }));
});
