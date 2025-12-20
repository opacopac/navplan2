import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {IRouteNotamRepoService} from '../../domain/service/i-route-notam-repo.service';
import {RestRouteNotamConverter} from '../model/rest-route-notam-converter';
import {IRestNotamResponse} from '../../../notam/rest/model/i-rest-notam-response';
import {RestFlightrouteConverter} from '../../../flightroute/rest/converter/rest-flightroute-converter';
import {RestLengthConverter} from '../../../geo-physics/rest/model/rest-length-converter';
import {Notam} from '../../../notam/domain/model/notam';
import {of} from 'rxjs';
import {TimestampInterval} from '../../../geo-physics/domain/model/quantities/timestamp-interval';
import {RestTimestampIntervalConverter} from '../../../geo-physics/rest/model/rest-timestamp-interval-converter';


@Injectable()
export class RestRouteNotamRepo implements IRouteNotamRepoService {
    constructor(private http: HttpClient) {
    }


    public getRouteNotams(flightroute: Flightroute, maxRadius: Length, interval: TimestampInterval): Observable<Notam[]> {
        if (!flightroute || flightroute.waypoints.length === 0) {
            return of([]);
        }

        const url = environment.notamRestApiBaseUrl;
        const body = {
            flightroute: RestFlightrouteConverter.toRest(flightroute),
            maxdist: RestLengthConverter.toRest(maxRadius),
            ...RestTimestampIntervalConverter.toRestBody(interval)
        };

        return this.http
            .post<IRestNotamResponse>(url, body)
            .pipe(
                map(response => RestRouteNotamConverter.fromRest(response)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading NOTAMs by route!', error);
                    return throwError(error);
                })
            );
    }
}
