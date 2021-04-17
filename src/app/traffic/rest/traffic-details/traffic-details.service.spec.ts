import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TrafficDetailsService} from './traffic-details.service';
import {TrafficDetails1Mock} from '../../mocks/traffic-details1.mock';
import {environment} from '../../../../environments/environment';


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


    it('readDetails triggers a POST call to the traffic details server', () => {
        trafficDetailsService.readDetails([TrafficDetails1Mock.createTraffic()]).subscribe(() => {});

        const request = httpMock.expectOne(req => req.url.startsWith(environment.trafficDetailServiceUrl));
        expect(request.request.method).toBe('POST');

        request.flush(TrafficDetails1Mock.createRestResponse());
    });


    it('readDetails triggers NO call to the traffic details server for an empty list', () => {
        trafficDetailsService.readDetails([]).subscribe((trafficList) => {
            expect(trafficList.length).toBe(0);
        });

        httpMock.expectNone(req => req.url.startsWith(environment.trafficDetailServiceUrl));
    });
});
