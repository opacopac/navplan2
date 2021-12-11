import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Extent2d} from '../../geo-physics/domain-model/geometry/extent2d';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {RestOpenskyTrafficResponseConverter} from '../rest-model/opensky/rest-opensky-traffic-response-converter';
import {IRestOpenskyTrafficResponse} from '../rest-model/opensky/i-rest-opensky-traffic-response';
import {OpenskyTraffic} from '../../traffic/domain-model/opensky-traffic';
import {IOpenskyTrafficService} from '../../traffic/domain-service/opensky-traffic/i-opensky-traffic-service';


@Injectable({
    providedIn: 'root'
})
export class OpenskyTrafficService implements IOpenskyTrafficService {
    public static readonly BASE_URL = 'https://opensky-network.org/api/states/all'; // '?lamin=45.8389&lomin=5.9962&lamax=47.8229&lomax=10.5226';


    constructor(private http: HttpClient) {
    }


    public readTraffic(extent: Extent2d): Observable<OpenskyTraffic[]> {
        const url = OpenskyTrafficService.BASE_URL + '?lamin=' + extent.minLat + '&lomin=' + extent.minLon
            + '&lamax=' + extent.maxLat + '&lomax=' + extent.maxLon;

        return this.http
            .get<IRestOpenskyTrafficResponse>(url)
            .pipe(
                map((response) => RestOpenskyTrafficResponseConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading ac traffic from opensky network', err);
                    return throwError(err);
                })
            );
    }
}
