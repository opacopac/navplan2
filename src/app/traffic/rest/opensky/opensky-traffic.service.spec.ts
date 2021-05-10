import {TestBed} from '@angular/core/testing';
import {OpenskyTrafficService} from './opensky-traffic.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Extent4dMock} from '../../mocks/extent4d.mock';
import {TrafficOpensky1Mock} from '../../mocks/traffic-opensky1.mock';


describe('OpenskyTrafficService', () => {
    let httpMock: HttpTestingController;
    let trafficOpenskyService: OpenskyTrafficService;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [OpenskyTrafficService]
        });

        httpMock = TestBed.get(HttpTestingController);
        trafficOpenskyService = TestBed.get(OpenskyTrafficService);
    });


    afterEach(() => {
        httpMock.verify(); // Verify that no unmatched requests are outstanding
    });


    it('should be created', () => {
        expect(trafficOpenskyService).toBeTruthy();
    });


    it('readTraffic makes a GET call to the open sky server', () => {
        trafficOpenskyService.readTraffic(Extent4dMock.create()).subscribe(() => {});

        const request = httpMock.expectOne(req => req.url.startsWith(OpenskyTrafficService.BASE_URL));
        expect(request.request.method).toBe('GET');

        request.flush(TrafficOpensky1Mock.createRestResponse());
    });


    it('returns a traffic list after calling readTraffic', () => {
        trafficOpenskyService.readTraffic(Extent4dMock.create()).subscribe(trafficList => {
            expect(trafficList).toBeDefined();
            expect(trafficList.length).toEqual(1);
            expect(trafficList[0]).toEqual(TrafficOpensky1Mock.create());
        });

        const request = httpMock.expectOne(() => true);

        request.flush(TrafficOpensky1Mock.createRestResponse());
    });
});
