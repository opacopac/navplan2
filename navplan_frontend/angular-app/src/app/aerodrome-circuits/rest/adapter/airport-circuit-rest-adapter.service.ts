import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {AirportCircuit} from '../../domain/model/airport-circuit';
import {RestAirportCircuitConverter} from '../converter/rest-airport-circuit-converter';
import {IRestAirportCircuit} from '../model/i-rest-airport-circuit';
import {IAirportCircuitRepoService} from '../../domain/service/i-airport-circuit-repo.service';
import {RestExtent2dConverter} from '../../../geo-physics/rest/model/rest-extent2d-converter';
import {RestZoomConverter} from '../../../geo-physics/rest/model/rest-zoom-converter';
import {HttpHelper} from '../../../system/domain/service/http/http-helper';


@Injectable()
export class AirportCircuitRestAdapterService implements IAirportCircuitRepoService {
    constructor(private http: HttpClient) {
    }


    public readAirportCircuitsByExtent(extent: Extent2d, zoom: number): Observable<AirportCircuit[]> {
        const params = HttpHelper.mergeParameters([
            RestExtent2dConverter.getUrlParams(extent),
            RestZoomConverter.getUrlParam(zoom)
        ]);
        const url: string = environment.airportCircuitApiBaseUrl;

        return this.http
            .get<IRestAirportCircuit[]>(url, { params })
            .pipe(
                map((response) => RestAirportCircuitConverter.fromRestList(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport circuits by extent', err);
                    return throwError(err);
                })
            );
    }
}
