import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggingService } from '../../shared/services/logging/logging.service';
import {Extent} from '../../shared/model/extent';
import {RestMapperTrafficAdexbEx, TrafficAdsbExResponse} from '../model/rest-mapper-traffic-adexb-ex';


const ADSBEXCHANGE_BASE_URL = 'https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json';


@Injectable()
export class TrafficAdsbexchangeService {
    constructor(private http: HttpClient) {
    }


    public readTraffic(
        extent: Extent,
        maxHeightFt,
        successCallback: (Traffic) => void,
        errorCallback: (string) => void) {

        const url = ADSBEXCHANGE_BASE_URL + '?fAltL=0&fAltU=' + maxHeightFt + '&fWBnd=' + extent[0] + '&fSBnd=' + extent[1] + '&fEBnd=' + extent[2] + '&fNBnd=' + extent[3];
        this.http
            .jsonp<TrafficAdsbExResponse>(url, 'callback')
            .subscribe(
                response => {
                    const trafficList = RestMapperTrafficAdexbEx.getTrafficListFromResponse(response);
                    successCallback(trafficList);
                },
                err => {
                    const message = 'ERROR reading ac traffic from ADSBExchange!';
                    LoggingService.logResponseError(message, err);
                    errorCallback(message);
                }
            );
    }
}
