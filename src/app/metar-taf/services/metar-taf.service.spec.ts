import {TestBed, inject} from '@angular/core/testing';
import {MetarTafService} from './metar-taf.service';


xdescribe('MetarTafService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MetarTafService]
        });
    });

    it('should be created', inject([MetarTafService], (service: MetarTafService) => {
        expect(service).toBeTruthy();
    }));
});
