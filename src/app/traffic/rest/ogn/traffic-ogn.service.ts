import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain-service/logging/logging.service';
import {Extent2d} from '../../../common/geo-math/domain-model/geometry/extent2d';
import {IRestOgnTrafficResponse} from './i-rest-ogn-traffic-response';
import {RestMapperOgnTrafficResponse} from './rest-mapper-ogn-traffic-response';
import {TrafficOgn} from '../../domain-model/traffic-ogn';
import {IOgnTrafficService} from '../../domain-service/ogn-traffic/i-ogn-traffic-service';


@Injectable({
    providedIn: 'root'
})
export class TrafficOgnService implements IOgnTrafficService {
    constructor(private http: HttpClient) {
    }


    public readTraffic(extent: Extent2d, maxAgeSec: number, waitForDataSec: number, sessionId: string): Observable<TrafficOgn[]> {
        const url = environment.trafficOgnServiceUrl
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
