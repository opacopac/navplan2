import {TestBed, inject} from '@angular/core/testing';
import {ClientstorageService} from './clientstorage.service';


xdescribe('ClientstorageService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ClientstorageService]
        });
    });

    it('should be created', inject([ClientstorageService], (service: ClientstorageService) => {
        expect(service).toBeTruthy();
    }));
});
