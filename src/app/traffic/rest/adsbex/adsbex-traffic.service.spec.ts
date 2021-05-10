import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AdsbexTrafficService} from './adsbex-traffic.service';
import {Extent4dMock} from '../../mocks/extent4d.mock';
import {TrafficAdsbex1Mock} from '../../mocks/traffic-adsbex1.mock';
import {environment} from '../../../../environments/environment';


describe('AdsbexTrafficService', () => {
    let httpMock: HttpTestingController;
    let trafficAdsbexService: AdsbexTrafficService;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AdsbexTrafficService]
        });

        httpMock = TestBed.get(HttpTestingController);
        trafficAdsbexService = TestBed.get(AdsbexTrafficService);
    });


    afterEach(() => {
        httpMock.verify(); // Verify that no unmatched requests are outstanding
    });


    it('should be created', () => {
        expect(trafficAdsbexService).toBeTruthy();
    });


    it('readTraffic makes a get call to the server', () => {
        trafficAdsbexService.readTraffic(Extent4dMock.create()).subscribe(() => {});

        const request = httpMock.expectOne(req => req.url.startsWith(environment.trafficAdsbexServiceUrl));
        expect(request.request.method).toBe('GET');

        request.flush(TrafficAdsbex1Mock.createRestResponse());
    });


    it('readTraffic returns a traffic list', () => {
        trafficAdsbexService.readTraffic(Extent4dMock.create()).subscribe(trafficList => {
            expect(trafficList).toBeDefined();
            expect(trafficList.length).toEqual(1);
            expect(trafficList[0]).toEqual(TrafficAdsbex1Mock.create());
        });

        const request = httpMock.expectOne(() => true);

        request.flush(TrafficAdsbex1Mock.createRestResponse());
    });
});
