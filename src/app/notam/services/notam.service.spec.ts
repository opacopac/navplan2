import {TestBed, inject} from '@angular/core/testing';
import {NotamService} from './notam.service';


xdescribe('NotamService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NotamService]
        });
    });

    it('should be created', inject([NotamService], (service: NotamService) => {
        expect(service).toBeTruthy();
    }));
});
