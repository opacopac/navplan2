import { TestBed, inject } from '@angular/core/testing';

import { UnitconversionService } from './unitconversion.service';

describe('UnitconversionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitconversionService]
    });
  });

  it('should be created', inject([UnitconversionService], (service: UnitconversionService) => {
    expect(service).toBeTruthy();
  }));
});
