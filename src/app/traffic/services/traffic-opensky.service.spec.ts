import {TestBed} from '@angular/core/testing';
import {TrafficOpenskyService} from './traffic-opensky.service';


describe('TrafficOpenskyService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: TrafficOpenskyService = TestBed.get(TrafficOpenskyService);
        expect(service).toBeTruthy();
    });
});
