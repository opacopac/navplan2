import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {IRestOgnTrafficResponse} from '../rest-model/ogn/i-rest-ogn-traffic-response';
import {RestOgnTrafficResponseConverter} from '../rest-model/ogn/rest-ogn-traffic-response-converter';
import {OgnTraffic} from '../../traffic/domain-model/ogn-traffic';
import {IOgnTrafficService} from '../../traffic/domain-service/ogn-traffic/i-ogn-traffic-service';


@Injectable()
export class OgnTrafficService implements IOgnTrafficService {
    constructor(private http: HttpClient) {
    }


    public readTraffic(extent: Extent2d, maxAgeSec: number, waitForDataSec: number, sessionId: string): Observable<OgnTraffic[]> {
        const url = environment.trafficOgnServiceUrl
            + '&minlon=' + extent.minLon + '&minlat=' + extent.minLat + '&maxlon=' + extent.maxLon + '&maxlat=' + extent.maxLat
            + '&maxagesec=' + maxAgeSec + '&sessionid=' + sessionId + '&waitDataSec=' + waitForDataSec;


        return this.http
            .get<IRestOgnTrafficResponse>(url)
            .pipe(
                map((response) => RestOgnTrafficResponseConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading ogn traffic', err);
                    return throwError(err);
                })
            );
    }
}
