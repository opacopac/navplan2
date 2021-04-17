import {inject, TestBed} from '@angular/core/testing';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {MetarTafRepo} from './metar-taf-repo.service';


describe('MetarTafRepo', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MetarTafRepo, HttpClient, HttpHandler]
        });
    });

    it('should be created', inject([MetarTafRepo], (service: MetarTafRepo) => {
        expect(service).toBeTruthy();
    }));
});
