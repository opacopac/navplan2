import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../shared/services/logging/logging.service';
import {Extent2d} from '../../shared/model/extent2d';
import {RestMapperTrafficOgn, TrafficOgnResponse} from '../rest-mapper/rest-mapper-traffic-ogn';
import {Traffic} from '../model/traffic';
import {throwError} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class TrafficOgnService {
    public static readonly OGN_TRAFFIC_BASE_URL = environment.restApiBaseUrl + 'php/Navplan/Traffic/TrafficService.php?action=readogntraffic';


    constructor(private http: HttpClient) {
    }


    public readTraffic(
        extent: Extent2d,
        maxAgeSec: number,
        waitForDataSec: number,
        sessionId: string): Observable<Traffic[]> {

        const url = TrafficOgnService.OGN_TRAFFIC_BASE_URL + '&minlon=' + extent.minLon + '&minlat=' + extent.minLat + '&maxlon=' + extent.maxLon + '&maxlat=' + extent.maxLat
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
