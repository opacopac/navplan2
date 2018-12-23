import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TrafficMock} from '../tests/traffic-mock';
import {TrafficOgnService} from './traffic-ogn.service';


describe('TrafficOgnService', () => {
    let httpMock: HttpTestingController;
    let trafficOgnService: TrafficOgnService;
    const maxHeightFt = 15000;
    const maxAgeSec = 120;
    const waitForDataSec = 1;
    const sessionId = '12345';


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TrafficOgnService]
        });

        httpMock = TestBed.get(HttpTestingController);
        trafficOgnService = TestBed.get(TrafficOgnService);
    });


    afterEach(() => {
        httpMock.verify(); // Verify that no unmatched requests are outstanding
    });


    it('should be created', () => {
        expect(trafficOgnService).toBeTruthy();
    });


    it('makes a GET call to the ogn server after calling readTraffic', () => {
        trafficOgnService.readTraffic(
            TrafficMock.MOCK_EXTENT_1,
            maxAgeSec,
            waitForDataSec,
            sessionId).subscribe(() => {});

        const request = httpMock.expectOne(req => req.url.startsWith(TrafficOgnService.OGN_TRAFFIC_BASE_URL));
        expect(request.request.method).toBe('GET');

        request.flush(TrafficMock.OGN_MOCK_RESPONSE_1);
    });


    it('returns a traffic list after calling readTraffic', () => {
        trafficOgnService.readTraffic(
            TrafficMock.MOCK_EXTENT_1,
            maxAgeSec,
            waitForDataSec,
            sessionId).subscribe(trafficList => {
            expect(trafficList).toBeDefined();
            expect(trafficList.length).toEqual(1);
            expect(trafficList[0].acAddress).toEqual(TrafficMock.OGN_MOCK_RESPONSE_1_ITEM_1.id.toUpperCase());
        });

        const request = httpMock.expectOne(() => true);

        request.flush(TrafficMock.OGN_MOCK_RESPONSE_1);
    });
});
