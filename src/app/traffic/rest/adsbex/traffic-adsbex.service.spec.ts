import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TrafficAdsbexService} from './traffic-adsbex.service';
import {Extent4dMock} from '../../mocks/extent4d.mock';
import {TrafficAdsbex1Mock} from '../../mocks/traffic-adsbex1.mock';
import {environment} from '../../../../environments/environment';


describe('TrafficAdsbexService', () => {
    let httpMock: HttpTestingController;
    let trafficAdsbexService: TrafficAdsbexService;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TrafficAdsbexService]
        });

        httpMock = TestBed.get(HttpTestingController);
        trafficAdsbexService = TestBed.get(TrafficAdsbexService);
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
