import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Traffic, TrafficAddressType} from '../model/traffic';
import {LoggingService} from '../../shared/services/logging/logging.service';
import {TrafficDetails} from '../model/traffic-details';
import {
    RestMapperTrafficDetails,
    TrafficDetailsRequest,
    TrafficDetailsRequestItem,
    TrafficDetailsResponse
} from '../rest-mapper/rest-mapper-traffic-details';


@Injectable({
    providedIn: 'root'
})
export class TrafficDetailsService {
    public static readonly TRAFFIC_DETAILS_BASE_URL = environment.restApiBaseUrl + 'php/Navplan/Traffic/TrafficService.php';


    constructor(private http: HttpClient) {
    }


    public readDetails(trafficList: Traffic[]): Observable<TrafficDetails[]> {
        const requestBody = this.getRequest(trafficList);

        return this.http
            .post<TrafficDetailsResponse>(
                TrafficDetailsService.TRAFFIC_DETAILS_BASE_URL,
                JSON.stringify(requestBody),
                {observe: 'response'})
            .pipe(
                map(response => RestMapperTrafficDetails.getTrafficDetailsListFromResponse(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading traffic details', err);
                    return throwError(err);
                })
            );
    }


    private getRequest(trafficList: Traffic[]): TrafficDetailsRequest {
        const aclist: TrafficDetailsRequestItem[] = [];

        for (const traffic of trafficList) {
            if (traffic.addressType === TrafficAddressType.ICAO) {
                aclist.push(this.getRequestItem(traffic));
            }
        }

        return {
            action: 'readtrafficdetails',
            aclist: aclist
        };
    }


    private getRequestItem(traffic: Traffic): TrafficDetailsRequestItem {
        return {
            icao24: traffic.acAddress,
            ac_type: undefined
        };
    }
}
