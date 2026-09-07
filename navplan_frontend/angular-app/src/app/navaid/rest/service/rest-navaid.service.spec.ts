import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RestNavaidService} from './rest-navaid.service';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {NavaidType} from '../../domain/model/navaid-type';
import {environment} from '../../../../environments/environment';
import {IRestNavaid} from '../model/i-rest-navaid';


describe('RestNavaidService', () => {
    let service: RestNavaidService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RestNavaidService]
        });

        service = TestBed.inject(RestNavaidService);
        httpMock = TestBed.inject(HttpTestingController);
    });


    afterEach(() => {
        httpMock.verify();
    });


    it('should be created', () => {
        expect(service).toBeTruthy();
    });


    it('should read navaids by extent and map the rest response to domain models', () => {
        const extent = new Extent2d(1, 2, 3, 4);
        const restResponse: IRestNavaid[] = [{
            id: 42,
            type: 'VOR-DME',
            kuerzel: 'ZH',
            name: 'Zurich',
            pos: [8.5, 47.4],
            elevation: [1500, 'FT', 'MSL'],
            frequency: [110.0, 'MHZ'],
            declination: 2.5,
            truenorth: false
        }];

        let result;
        service.readNavaidsByExtent(extent, 8).subscribe(navaids => result = navaids);

        const req = httpMock.expectOne(r => r.url === environment.navaidApiBaseUrl);
        expect(req.request.method).toEqual('GET');
        expect(req.request.params.get('minlon')).toEqual('1');
        expect(req.request.params.get('minlat')).toEqual('2');
        expect(req.request.params.get('maxlon')).toEqual('3');
        expect(req.request.params.get('maxlat')).toEqual('4');
        req.flush(restResponse);

        expect(result.length).toEqual(1);
        expect(result[0].id).toEqual(42);
        expect(result[0].name).toEqual('Zurich');
        expect(result[0].type).toEqual(NavaidType.VOR_DME);
    });


    it('should propagate an error when the request fails', () => {
        const extent = new Extent2d(1, 2, 3, 4);
        let error;

        service.readNavaidsByExtent(extent, 8).subscribe({
            next: () => fail('expected an error'),
            error: (err) => error = err
        });

        const req = httpMock.expectOne(r => r.url === environment.navaidApiBaseUrl);
        req.flush('server error', {status: 500, statusText: 'Internal Server Error'});

        expect(error).toBeTruthy();
    });
});
