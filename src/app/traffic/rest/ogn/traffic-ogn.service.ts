import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/use-case/logging/logging.service';
import {Extent2d} from '../../../geo-math/domain/geometry/extent2d';
import {IRestOgnTrafficResponse} from './i-rest-ogn-traffic-response';
import {RestMapperOgnTrafficResponse} from './rest-mapper-ogn-traffic-response';
import {TrafficOgn} from '../../domain/traffic-ogn';
import {IOgnTrafficService} from '../../use-case/ogn-traffic/i-ogn-traffic-service';


@Injectable({
    providedIn: 'root'
})
export class TrafficOgnService implements IOgnTrafficService {
    public static readonly BASE_URL = environment.restApiBaseUrl + 'php/Navplan/Traffic/TrafficService.php?action=readogntraffic';


    constructor(private http: HttpClient) {
    }


    public readTraffic(extent: Extent2d, maxAgeSec: number, waitForDataSec: number, sessionId: string): Observable<TrafficOgn[]> {
        const url = TrafficOgnService.BASE_URL
            + '&minlon=' + extent.minLon + '&minlat=' + extent.minLat + '&maxlon=' + extent.maxLon + '&maxlat=' + extent.maxLat
            + '&maxagesec=' + maxAgeSec + '&sessionid=' + sessionId + '&waitDataSec=' + waitForDataSec;


        return this.http
            .get<IRestOgnTrafficResponse>(url)
            .pipe(
                map((response) => RestMapperOgnTrafficResponse.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading ogn traffic', err);
                    return throwError(err);
                })
            );
    }
}
