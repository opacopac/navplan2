import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Extent2d} from '../../../geo-math/domain/geometry/extent2d';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {LoggingService} from '../../../system/use-case/logging/logging.service';
import {RestMapperOpenskyTrafficResponse} from './rest-mapper-opensky-traffic-response';
import {IRestOpenskyTrafficResponse} from './i-rest-opensky-traffic-response';
import {TrafficOpensky} from '../../domain/traffic-opensky';
import {IOpenskyTrafficService} from '../../use-case/opensky-traffic/i-opensky-traffic-service';


@Injectable({
    providedIn: 'root'
})
export class TrafficOpenskyService implements IOpenskyTrafficService {
    public static readonly BASE_URL = 'https://opensky-network.org/api/states/all'; // '?lamin=45.8389&lomin=5.9962&lamax=47.8229&lomax=10.5226';


    constructor(private http: HttpClient) {
    }


    public readTraffic(extent: Extent2d): Observable<TrafficOpensky[]> {
        const url = TrafficOpenskyService.BASE_URL + '?lamin=' + extent.minLat + '&lomin=' + extent.minLon
            + '&lamax=' + extent.maxLat + '&lomax=' + extent.maxLon;

        return this.http
            .get<IRestOpenskyTrafficResponse>(url)
            .pipe(
                map((response) => RestMapperOpenskyTrafficResponse.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading ac traffic from opensky network', err);
                    return throwError(err);
                })
            );
    }
}
