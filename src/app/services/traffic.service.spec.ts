import {TestBed, inject} from '@angular/core/testing';

import {TrafficIntegratorService} from './traffic.service';

describe('TrafficIntegratorService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TrafficIntegratorService]
        });
    });

    it('should be created', inject([TrafficIntegratorService], (service: TrafficIntegratorService) => {
        expect(service).toBeTruthy();
    }));
});
