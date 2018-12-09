import {TestBed, inject} from '@angular/core/testing';
import {TimerService} from './timer.service';


xdescribe('TimerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TimerService]
        });
    });

    it('should be created', inject([TimerService], (service: TimerService) => {
        expect(service).toBeTruthy();
    }));
});
