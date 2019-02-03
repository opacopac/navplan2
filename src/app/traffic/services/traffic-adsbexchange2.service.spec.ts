import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TrafficAdsbexchangeService} from './traffic-adsbexchange.service';
import {TrafficMock} from '../test/traffic-mock';


describe('TrafficAdsbexchangeService', () => {
    let httpMock: HttpTestingController;
    let trafficAdsbexService: TrafficAdsbexchangeService;
    const maxHeightFt = 15000;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TrafficAdsbexchangeService]
        });

        httpMock = TestBed.get(HttpTestingController);
        trafficAdsbexService = TestBed.get(TrafficAdsbexchangeService);
    });


    afterEach(() => {
        httpMock.verify(); // Verify that no unmatched requests are outstanding
    });


    it('should be created', () => {
        expect(trafficAdsbexService).toBeTruthy();
    });


    it('makes a JSONP call to the adsb-exchange server after calling readTraffic', () => {
        trafficAdsbexService.readTraffic(TrafficMock.MOCK_EXTENT_1, maxHeightFt).subscribe(() => {});

        const request = httpMock.expectOne(req => req.url.startsWith(TrafficAdsbexchangeService.ADSBEXCHANGE_BASE_URL));
        expect(request.request.method).toBe('JSONP');

        request.flush(TrafficMock.ADSBEX_MOCK_RESPONSE_1);
    });


    it('returns a traffic list after calling readTraffic', () => {
        trafficAdsbexService.readTraffic(TrafficMock.MOCK_EXTENT_1, maxHeightFt).subscribe(trafficList => {
            expect(trafficList).toBeDefined();
            expect(trafficList.length).toEqual(1);
            expect(trafficList[0].acAddress).toEqual(TrafficMock.ADSBEX_MOCK_RESPONSE_1.acList[0].Icao.toUpperCase());
        });

        const request = httpMock.expectOne(() => true);

        request.flush(TrafficMock.ADSBEX_MOCK_RESPONSE_1);
    });
});
