import { TestBed, inject } from '@angular/core/testing';

import { StringnumberService } from './stringnumber.service';

describe('StringnumberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StringnumberService]
    });
  });

  it('should be created', inject([StringnumberService], (service: StringnumberService) => {
    expect(service).toBeTruthy();
  }));
});
