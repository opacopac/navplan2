import { TestBed, inject } from '@angular/core/testing';

import { ArrayService } from './array.service';

describe('ArrayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArrayService]
    });
  });

  it('should be created', inject([ArrayService], (service: ArrayService) => {
    expect(service).toBeTruthy();
  }));
});
