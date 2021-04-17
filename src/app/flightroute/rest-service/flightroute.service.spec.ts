import {inject, TestBed} from '@angular/core/testing';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {FlightrouteService} from './flightroute.service';


describe('FlightrouteService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FlightrouteService, HttpClient, HttpHandler]
        });
    });

    it('should be created', inject([FlightrouteService], (service: FlightrouteService) => {
        expect(service).toBeTruthy();
    }));
});
