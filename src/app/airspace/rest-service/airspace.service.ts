import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Airspace} from '../domain-model/airspace';
import {IRestAirspace} from '../rest-model/i-rest-airspace';
import {RestAirspaceConverter} from '../rest-model/rest-airspace-converter';


@Injectable()
export class AirspaceService {
    constructor(private http: HttpClient) {
    }


    public readAirspacesByExtent(extent: Extent2d, zoom: number): Observable<Airspace[]> {
        const url: string = environment.airspaceServiceUrl + '?action=getAirspacesByExtent'
            + '&minlon=' + extent.minLon
            + '&minlat=' + extent.minLat
            + '&maxlon=' + extent.maxLon
            + '&maxlat=' + extent.maxLat
            + '&zoom=' + zoom;

        return this.http
            .get<IRestAirspace[]>(url, {observe: 'response'})
            .pipe(
                map((response) => RestAirspaceConverter.fromRestList(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airspace list by extent', err);
                    return throwError(err);
                })
            );
    }
}
