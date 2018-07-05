import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { LoggingService } from '../utils/logging.service';
import { SessionService } from '../session/session.service';
import { Sessioncontext } from '../../../model/session/sessioncontext';
import { Extent } from '../../../model/ol-model/extent';
import { RestMapperTrafficOgn, TrafficOgnResponse } from "../../../model/rest-mapper/rest-mapper-traffic-ogn";


const OGN_TRAFFIC_BASE_URL = environment.restApiBaseUrl + 'php/ogntraffic.php';


@Injectable()
export class TrafficOgnService {
    private session: Sessioncontext;


    constructor(
        private http: HttpClient,
        private sessionService: SessionService) {
        this.session = this.sessionService.getSessionContext();
    }


    public readTraffic(
        extent: Extent,
        maxAgeSec: number,
        waitForDataSec: number,
        successCallback: (Traffic) => void,
        errorCallback: (string) => void) {

        const url = OGN_TRAFFIC_BASE_URL + '?minlon=' + extent[0] + '&minlat=' + extent[1] + '&maxlon=' + extent[2] + '&maxlat=' + extent[3]
            + '&maxagesec=' + maxAgeSec + '&sessionid=' + this.session.sessionId + '&waitDataSec=' + waitForDataSec;


        this.http
            .jsonp<TrafficOgnResponse>(url, 'callback')
            .subscribe(
                response => {
                    const trafficList = RestMapperTrafficOgn.getTrafficListFromResponse(response);
                    successCallback(trafficList);
                },
                err => {
                    const message = 'ERROR reading ogn traffic!';
                    LoggingService.logResponseError(message, err);
                    errorCallback(message);
                }
            );
    }
}
