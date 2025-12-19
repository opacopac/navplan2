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
import {IDate} from '../../../system/domain/service/date/i-date';
import {SystemConfig} from '../../../system/domain/service/system-config';
import {Notam} from '../../../notam/domain/model/notam';
import {of} from 'rxjs';


@Injectable()
export class RestRouteNotamRepo implements IRouteNotamRepoService {
    private readonly date: IDate;

    constructor(
        private http: HttpClient,
        config: SystemConfig
    ) {
        this.date = config.getDate();
    }


    public getRouteNotams(flightroute: Flightroute, maxRadius: Length): Observable<Notam[]> {
        if (!flightroute || flightroute.waypoints.length === 0) {
            return of([]);
        }

        const url = environment.notamRestApiBaseUrl;
        const body = {
            flightroute: RestFlightrouteConverter.toRest(flightroute),
            maxdist: RestLengthConverter.toRest(maxRadius),
            starttimestamp: this.date.getDayStartTimestamp(0),
            endtimestamp: this.date.getDayEndTimestamp(2)
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
