import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {IRestOgnTrafficResponse} from '../model/ogn/i-rest-ogn-traffic-response';
import {RestOgnTrafficResponseConverter} from '../model/ogn/rest-ogn-traffic-response-converter';
import {OgnTraffic} from '../../domain/model/ogn-traffic';
import {IOgnTrafficService} from '../../domain/service/ogn-traffic/i-ogn-traffic-service';
import {HttpHelper} from '../../../system/domain/service/http/http-helper';
import {RestExtent2dConverter} from '../../../geo-physics/rest/model/rest-extent2d-converter';


@Injectable()
export class OgnTrafficService implements IOgnTrafficService {
    constructor(private http: HttpClient) {
    }


    public readTraffic(extent: Extent2d, maxAgeSec: number, waitForDataSec: number, sessionId: string): Observable<OgnTraffic[]> {
        const params = HttpHelper.mergeParameters([
            RestExtent2dConverter.getUrlParams(extent),
            new HttpParams()
                .set('maxagesec', maxAgeSec.toString())
                .set('sessionid', sessionId)
                .set('waitDataSec', waitForDataSec.toString())
        ]);
        const url = environment.trafficOgnApiBaseUrl;

        return this.http
            .get<IRestOgnTrafficResponse>(url, {params})
            .pipe(
                map((response) => RestOgnTrafficResponseConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading ogn traffic', err);
                    return throwError(err);
                })
            );
    }
}
