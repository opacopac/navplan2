import {TestBed, inject} from '@angular/core/testing';
import {ClientstorageHelper} from './clientstorage-helper';


xdescribe('ClientstorageHelper', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ClientstorageHelper]
        });
    });

    it('should be created', inject([ClientstorageHelper], (service: ClientstorageHelper) => {
        expect(service).toBeTruthy();
    }));
});
