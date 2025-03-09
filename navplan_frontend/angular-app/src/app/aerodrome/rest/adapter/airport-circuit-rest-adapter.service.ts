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


@Injectable()
export class AirportCircuitRestAdapterService implements IAirportCircuitRepoService {
    constructor(private http: HttpClient) {
    }


    public readAirportCircuitsByExtent(extent: Extent2d, zoom: number): Observable<AirportCircuit[]> {
        const url: string = environment.airportCircuitApiBaseUrl
            + '?minlon=' + extent.minLon
            + '&minlat=' + extent.minLat
            + '&maxlon=' + extent.maxLon
            + '&maxlat=' + extent.maxLat
            + '&zoom=' + zoom;

        return this.http
            .get<IRestAirportCircuit[]>(url)
            .pipe(
                map((response) => RestAirportCircuitConverter.fromRestList(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport circuits by extent', err);
                    return throwError(err);
                })
            );
    }
}
