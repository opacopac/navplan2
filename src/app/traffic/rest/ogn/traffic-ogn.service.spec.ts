import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TrafficOgnService} from './traffic-ogn.service';
import {Extent4dMock} from '../../mocks/extent4d.mock';
import {TrafficOgn1Mock} from '../../mocks/traffic-ogn1.mock';
import {environment} from '../../../../environments/environment';


xdescribe('TrafficOgnService', () => {
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


    it('readTraffic makes a GET call to the ogn server', () => {
        trafficOgnService.readTraffic(
            Extent4dMock.create(),
            maxAgeSec,
            waitForDataSec,
            sessionId).subscribe(() => {});

        const request = httpMock.expectOne(req => req.url.startsWith(environment.trafficOgnServiceUrl));
        expect(request.request.method).toBe('GET');

        request.flush(TrafficOgn1Mock.createRestResponse());
    });


    it('readTraffic returns a traffic list', () => {
        trafficOgnService.readTraffic(
            Extent4dMock.create(),
            maxAgeSec,
            waitForDataSec,
            sessionId).subscribe(trafficList => {
            expect(trafficList).toBeDefined();
            expect(trafficList.length).toEqual(1);
            expect(trafficList[0]).toEqual(TrafficOgn1Mock.create());
        });

        const request = httpMock.expectOne(() => true);

        request.flush(TrafficOgn1Mock.createRestResponse());
    });
});
