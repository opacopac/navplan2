import {TestBed, inject} from '@angular/core/testing';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {MetarTafService} from './metar-taf.service';


describe('MetarTafService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MetarTafService, HttpClient, HttpHandler]
        });
    });

    it('should be created', inject([MetarTafService], (service: MetarTafService) => {
        expect(service).toBeTruthy();
    }));
});
