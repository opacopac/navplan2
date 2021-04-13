import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/use-case/logging/logging.service';
import {Extent2d} from '../../../geo-math/domain/geometry/extent2d';
import {IRestAdsbexTrafficResponse} from './i-rest-adsbex-traffic-response';
import {RestMapperAdsbexTrafficResponse} from './rest-mapper-adsbex-traffic-response';
import {TrafficAdsbex} from '../../domain/traffic-adsbex';
import {IAdsbexTrafficService} from '../../use-case/adsbex-traffic/i-adsbex-traffic-service';


@Injectable({
    providedIn: 'root'
})
export class TrafficAdsbexService implements IAdsbexTrafficService {
    public static readonly BASE_URL = environment.restApiBaseUrl
        + 'php/Navplan/Traffic/RestService/TrafficService.php?action=readadsbextraffic';


    constructor(private http: HttpClient) {
    }


    public readTraffic(extent: Extent2d): Observable<TrafficAdsbex[]> {
        const url = TrafficAdsbexService.BASE_URL
            + '&minlon=' + extent.minLon + '&minlat=' + extent.minLat + '&maxlon=' + extent.maxLon + '&maxlat=' + extent.maxLat;


        return this.http
            .get<IRestAdsbexTrafficResponse>(url)
            .pipe(
                map((response) => RestMapperAdsbexTrafficResponse.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading ogn traffic', err);
                    return throwError(err);
                })
            );
    }
}
