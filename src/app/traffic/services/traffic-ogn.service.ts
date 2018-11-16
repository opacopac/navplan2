import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../shared/services/logging/logging.service';
import {Extent} from '../../shared/model/extent';
import {RestMapperTrafficOgn, TrafficOgnResponse} from '../model/rest-mapper-traffic-ogn';
import {Traffic} from '../model/traffic';
import {throwError} from 'rxjs';


const OGN_TRAFFIC_BASE_URL = environment.restApiBaseUrl + 'php/ogntraffic.php';


@Injectable()
export class TrafficOgnService {
    constructor(private http: HttpClient) {
    }


    public readTraffic(
        extent: Extent,
        maxAgeSec: number,
        waitForDataSec: number,
        sessionId: string): Observable<Traffic[]> {

        const url = OGN_TRAFFIC_BASE_URL + '?minlon=' + extent[0] + '&minlat=' + extent[1] + '&maxlon=' + extent[2] + '&maxlat=' + extent[3]
            + '&maxagesec=' + maxAgeSec + '&sessionid=' + sessionId + '&waitDataSec=' + waitForDataSec;


        return this.http
            .jsonp<TrafficOgnResponse>(url, 'callback')
            .pipe(
                map((response) => RestMapperTrafficOgn.getTrafficListFromResponse(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading ogn traffic', err);
                    return throwError(err);
                })
            );
    }
}
