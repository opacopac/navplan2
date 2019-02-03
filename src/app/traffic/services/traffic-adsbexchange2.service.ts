import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../shared/services/logging/logging.service';
import {Extent} from '../../shared/model/extent';
import {Traffic} from '../model/traffic';
import {RestMapperTrafficAdsbEx2, TrafficAdsbEx2Response} from '../rest-mapper/rest-mapper-traffic-adsb-ex2';


@Injectable({
    providedIn: 'root'
})
export class TrafficAdsbexchangeService2 {
    public static readonly ADSBEX_TRAFFIC_BASE_URL = environment.restApiBaseUrl + 'php/Navplan/Traffic/TrafficService.php?action=readadsbextraffic';


    constructor(private http: HttpClient) {
    }


    public readTraffic(extent: Extent): Observable<Traffic[]> {
        const midPos = extent.getMidPos();
        const radiusNm = extent.getRadius().nm;
        const url = TrafficAdsbexchangeService2.ADSBEX_TRAFFIC_BASE_URL + '&lat=' + midPos.latitude + '&lon=' + midPos.longitude + '&dist=' + radiusNm;

        return this.http
            .jsonp<TrafficAdsbEx2Response>(url, 'callback')
            .pipe(
                map((response) => RestMapperTrafficAdsbEx2.getTrafficListFromResponse(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading ac traffic from ADSBExchange2', err);
                    return throwError(err);
                })
            );
    }
}
