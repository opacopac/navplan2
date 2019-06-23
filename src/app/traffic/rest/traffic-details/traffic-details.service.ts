import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {Traffic} from '../../domain/traffic';
import {LoggingService} from '../../../shared/services/logging/logging.service';
import {IRestTrafficDetailsResponse} from './i-rest-traffic-details-response';
import {TrafficDetails} from '../../domain/traffic-details';
import {RestTrafficDetailsResponse} from './rest-traffic-details-response';
import {RestTrafficDetailsRequest} from './rest-traffic-details-request';
import {ITrafficDetailsService} from '../../use-case/traffic-details/i-traffic-details-service';


@Injectable({
    providedIn: 'root'
})
export class TrafficDetailsService implements ITrafficDetailsService {
    public static readonly BASE_URL = environment.restApiBaseUrl + 'php/Navplan/Traffic/TrafficService.php';


    constructor(private http: HttpClient) {
    }


    public readDetails(trafficList: Traffic[]): Observable<TrafficDetails[]> {
        const requestBody = RestTrafficDetailsRequest.toRest(trafficList);
        if (requestBody.aclist.length <= 0) {
            return of([]);
        }

        return this.http
            .post<IRestTrafficDetailsResponse>(
                TrafficDetailsService.BASE_URL,
                JSON.stringify(requestBody),
                {observe: 'response'})
            .pipe(
                map(response => RestTrafficDetailsResponse.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading traffic details', err);
                    return throwError(err);
                })
            );
    }
}
