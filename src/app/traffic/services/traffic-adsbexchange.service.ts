import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggingService } from '../../shared/services/logging/logging.service';
import {Extent} from '../../shared/model/extent';
import {RestMapperTrafficAdexbEx, TrafficAdsbExResponse} from '../model/rest-mapper-traffic-adexb-ex';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {Traffic} from '../model/traffic';
import {throwError} from 'rxjs';


const ADSBEXCHANGE_BASE_URL = 'https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json';


@Injectable({
    providedIn: 'root'
})
export class TrafficAdsbexchangeService {
    constructor(private http: HttpClient) {
    }


    public readTraffic(
        extent: Extent,
        maxHeightFt): Observable<Traffic[]> {

        const url = ADSBEXCHANGE_BASE_URL + '?fAltL=0&fAltU=' + maxHeightFt + '&fWBnd='
            + extent[0] + '&fSBnd=' + extent[1] + '&fEBnd=' + extent[2] + '&fNBnd=' + extent[3];
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
