import {inject, TestBed} from '@angular/core/testing';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {RestMetarTafService} from './rest-metar-taf.service';


describe('RestMetarTafService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RestMetarTafService, HttpClient, HttpHandler]
        });
    });

    it('should be created', inject([RestMetarTafService], (service: RestMetarTafService) => {
        expect(service).toBeTruthy();
    }));
});
