import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../shared/services/logging/logging.service';
import {Extent} from '../../shared/model/extent';
import {Traffic} from '../model/traffic';
import {RestMapperTrafficAdexbEx, TrafficAdsbExResponse} from '../rest-mapper/rest-mapper-traffic-adexb-ex';


@Injectable({
    providedIn: 'root'
})
export class TrafficAdsbexchangeService {
    public static readonly ADSBEXCHANGE_BASE_URL = 'https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json';
    public static readonly ADSBEX_TRAFFIC_BASE_URL = environment.restApiBaseUrl + 'php/Navplan/Traffic/TrafficService.php?action=readadsbextraffic';


    constructor(private http: HttpClient) {
    }


    public readTraffic(
        extent: Extent,
        maxHeightFt): Observable<Traffic[]> {

        const url = TrafficAdsbexchangeService.ADSBEXCHANGE_BASE_URL + '?fAltL=0&fAltU=' + maxHeightFt + '&fWBnd='
            + extent[0] + '&fSBnd=' + extent[1] + '&fEBnd=' + extent[2] + '&fNBnd=' + extent[3];

        /*const midPos = extent.getMidPos();
        const radiusNm = extent.getRadius().nm;
        const url = ADSBEX_TRAFFIC_BASE_URL + '&lat=' + midPos.latitude + '&lon=' + midPos.longitude + '&dist=' + radiusNm;*/

        return this.http
            .jsonp<TrafficAdsbExResponse>(url, 'callback')
            .pipe(
                map((response) => RestMapperTrafficAdexbEx.getTrafficListFromResponse(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading ac traffic from ADSBExchange', err);
                    return throwError(err);
                })
            );
    }
}
