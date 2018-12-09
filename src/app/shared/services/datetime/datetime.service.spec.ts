import {TestBed, inject} from '@angular/core/testing';
import {DatetimeService} from './datetime.service';


xdescribe('DatetimeService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DatetimeService]
        });
    });

    it('should be created', inject([DatetimeService], (service: DatetimeService) => {
        expect(service).toBeTruthy();
    }));
});
