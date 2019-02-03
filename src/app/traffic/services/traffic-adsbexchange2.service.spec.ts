import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TrafficAdsbexchangeService2} from './traffic-adsbexchange2.service';
import {TrafficMock} from '../test/traffic-mock';


describe('TrafficAdsbexchangeService2', () => {
    let httpMock: HttpTestingController;
    let trafficAdsbexService2: TrafficAdsbexchangeService2;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TrafficAdsbexchangeService2]
        });

        httpMock = TestBed.get(HttpTestingController);
        trafficAdsbexService2 = TestBed.get(TrafficAdsbexchangeService2);
    });


    afterEach(() => {
        httpMock.verify(); // Verify that no unmatched requests are outstanding
    });


    it('should be created', () => {
        expect(trafficAdsbexService2).toBeTruthy();
    });


    it('makes a JSONP call to the adsb-exchange2 server after calling readTraffic', () => {
        trafficAdsbexService2.readTraffic(TrafficMock.MOCK_EXTENT_1).subscribe(() => {});

        const request = httpMock.expectOne(req => req.url.startsWith(TrafficAdsbexchangeService2.ADSBEX_TRAFFIC_BASE_URL));
        expect(request.request.method).toBe('JSONP');

        request.flush(TrafficMock.ADSBEX2_MOCK_RESPONSE_1);
    });


    it('returns a traffic list after calling readTraffic', () => {
        trafficAdsbexService2.readTraffic(TrafficMock.MOCK_EXTENT_1).subscribe(trafficList => {
            expect(trafficList).toBeDefined();
            expect(trafficList.length).toEqual(2);
            expect(trafficList[0].acAddress).toEqual(TrafficMock.ADSBEX2_MOCK_RESPONSE_1.ac[0].icao.toUpperCase());
        });

        const request = httpMock.expectOne(() => true);

        request.flush(TrafficMock.ADSBEX2_MOCK_RESPONSE_1);
    });
});
