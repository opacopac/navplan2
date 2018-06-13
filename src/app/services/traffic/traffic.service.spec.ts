import {TestBed, inject} from '@angular/core/testing';

import {TrafficService} from './traffic.service';

describe('TrafficIntegratorService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TrafficService]
        });
    });

    it('should be created', inject([TrafficService], (service: TrafficService) => {
        expect(service).toBeTruthy();
    }));
});
