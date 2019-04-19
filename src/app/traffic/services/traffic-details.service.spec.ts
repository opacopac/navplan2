import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TrafficDetailsService} from './traffic-details.service';
import {TrafficMock} from '../test/traffic-mock';


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


    it('makes a POST call to the traffic details server upon calling readDetails', () => {
        trafficDetailsService.readDetails([TrafficMock.MOCK_TRAFFIC_1]).subscribe(() => {});

        const request = httpMock.expectOne(req => req.url.startsWith(TrafficDetailsService.TRAFFIC_DETAILS_BASE_URL));
        expect(request.request.method).toBe('POST');

        request.flush(TrafficMock.ADSBEX2_MOCK_RESPONSE_1);
    });


    it('makes NO call to the traffic details server upon calling readDetails with an empty list', () => {
        trafficDetailsService.readDetails([]).subscribe((trafficList) => {
            expect(trafficList.length).toBe(0);
        });

        httpMock.expectNone(req => req.url.startsWith(TrafficDetailsService.TRAFFIC_DETAILS_BASE_URL));
    });
});
