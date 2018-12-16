import {TestBed} from '@angular/core/testing';
import {TrafficOpenskyService} from './traffic-opensky.service';
import {HttpClient, HttpHandler} from '@angular/common/http';


describe('TrafficOpenskyService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HttpClient, HttpHandler]
        });
    });


    it('should be created', () => {
        const service: TrafficOpenskyService = TestBed.get(TrafficOpenskyService);
        expect(service).toBeTruthy();
    });
});
