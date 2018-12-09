import {TestBed, inject} from '@angular/core/testing';
import {TrafficOgnService} from './traffic-ogn.service';


xdescribe('TrafficOgnService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TrafficOgnService]
        });
    });

    it('should be created', inject([TrafficOgnService], (service: TrafficOgnService) => {
        expect(service).toBeTruthy();
    }));
});
