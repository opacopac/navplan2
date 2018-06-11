import { TestBed, inject } from '@angular/core/testing';

import { ClientstorageService } from './clientstorage.service';

describe('ClientstorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientstorageService]
    });
  });

  it('should be created', inject([ClientstorageService], (service: ClientstorageService) => {
    expect(service).toBeTruthy();
  }));
});
