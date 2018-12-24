import {TestBed} from '@angular/core/testing';
import {TrafficOpenskyService} from './traffic-opensky.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TrafficMock} from '../test/traffic-mock';


describe('TrafficOpenskyService', () => {
    let httpMock: HttpTestingController;
    let trafficOpenskyService: TrafficOpenskyService;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TrafficOpenskyService]
        });

        httpMock = TestBed.get(HttpTestingController);
        trafficOpenskyService = TestBed.get(TrafficOpenskyService);
    });


    afterEach(() => {
        httpMock.verify(); // Verify that no unmatched requests are outstanding
    });


    it('should be created', () => {
        expect(trafficOpenskyService).toBeTruthy();
    });


    it('makes a GET call to the open sky server after calling readTraffic', () => {
        trafficOpenskyService.readTraffic(TrafficMock.MOCK_EXTENT_1).subscribe(() => {});

        const request = httpMock.expectOne(req => req.url.startsWith(TrafficOpenskyService.OPENSKY_TRAFFIC_BASE_URL));
        expect(request.request.method).toBe('GET');

        request.flush(TrafficMock.OPENSKY_MOCK_RESPONSE_1);
    });


    it('returns a traffic list after calling readTraffic', () => {
        trafficOpenskyService.readTraffic(TrafficMock.MOCK_EXTENT_1).subscribe(trafficList => {
            expect(trafficList).toBeDefined();
            expect(trafficList.length).toEqual(1);
            expect(trafficList[0].acAddress).toEqual(TrafficMock.OPENSKY_MOCK_RESPONSE_1.states[0][0].toUpperCase());
        });

        const request = httpMock.expectOne(() => true);

        request.flush(TrafficMock.OPENSKY_MOCK_RESPONSE_1);
    });
});
