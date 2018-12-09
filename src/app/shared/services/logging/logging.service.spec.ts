import {TestBed, inject} from '@angular/core/testing';
import {LoggingService} from './logging.service';


xdescribe('LoggingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoggingService]
        });
    });

    it('should be created', inject([LoggingService], (service: LoggingService) => {
        expect(service).toBeTruthy();
    }));
});
