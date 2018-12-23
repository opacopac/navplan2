import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Extent} from '../../shared/model/extent';
import {Observable, throwError} from 'rxjs';
import {Traffic} from '../model/traffic';
import {catchError, map} from 'rxjs/operators';
import {LoggingService} from '../../shared/services/logging/logging.service';
import {RestMapperTrafficOpensky, TrafficOpenskyResponse} from '../model/rest-mapper-traffic-opensky';


@Injectable({
    providedIn: 'root'
})
export class TrafficOpenskyService {
    public static readonly OPENSKY_TRAFFIC_BASE_URL = 'https://opensky-network.org/api/states/all'; // '?lamin=45.8389&lomin=5.9962&lamax=47.8229&lomax=10.5226';


    constructor(private http: HttpClient) {
    }


    public readTraffic(extent: Extent): Observable<Traffic[]> {
        const url = TrafficOpenskyService.OPENSKY_TRAFFIC_BASE_URL + '?lamin=' + extent.minLat + '&lomin=' + extent.minLon
            + '&lamax=' + extent.maxLat + '&lomax=' + extent.maxLon;

        return this.http
            .get<TrafficOpenskyResponse>(url)
            .pipe(
                map((response) => RestMapperTrafficOpensky.getTrafficListFromResponse(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading ac traffic from opensky network', err);
                    return throwError(err);
                })
            );
    }
}
