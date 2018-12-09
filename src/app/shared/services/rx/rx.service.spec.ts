import {TestBed, inject} from '@angular/core/testing';
import {RxService} from './rx.service';


xdescribe('RxService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RxService]
        });
    });

    it('should be created', inject([RxService], (service: RxService) => {
        expect(service).toBeTruthy();
    }));
});
