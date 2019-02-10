import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TrafficDetailsService} from './traffic-details.service';


describe('TrafficDetailsService', () => {
    let httpMock: HttpTestingController;
    let trafficDetailsService: TrafficDetailsService;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TrafficDetailsService]
        });

        httpMock = TestBed.get(HttpTestingController);
        trafficDetailsService = TestBed.get(TrafficDetailsService);
    });


    afterEach(() => {
        httpMock.verify(); // Verify that no unmatched requests are outstanding
    });


    it('should be created', () => {
        const service: TrafficDetailsService = TestBed.get(TrafficDetailsService);
        expect(service).toBeTruthy();
    });


    /*it('makes a JSONP call to the traffic details server after calling readTrafficDetails', () => {
        trafficDetailsService.readTrafficDetails().subscribe(() => {});

        const request = httpMock.expectOne(req => req.url.startsWith(TrafficAdsbexchangeService2.ADSBEX_TRAFFIC_BASE_URL));
        expect(request.request.method).toBe('JSONP');

        request.flush(TrafficMock.ADSBEX2_MOCK_RESPONSE_1);
    });*/
});
