import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {Traffic} from '../../../traffic/domain/model/traffic';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {IRestTrafficDetailsResponse} from '../model/i-rest-traffic-details-response';
import {TrafficDetails} from '../../domain/model/traffic-details';
import {RestTrafficDetailsResponseConverter} from '../model/rest-traffic-details-response-converter';
import {RestTrafficDetailsRequestConverter} from '../model/rest-traffic-details-request-converter';
import {ITrafficDetailsService} from '../../domain/service/i-traffic-details-service';


@Injectable({
    providedIn: 'root'
})
export class TrafficDetailsService implements ITrafficDetailsService {
    constructor(private http: HttpClient) {
    }


    public readDetails(trafficList: Traffic[]): Observable<TrafficDetails[]> {
        const requestBody = RestTrafficDetailsRequestConverter.toRest(trafficList);
        if (requestBody.aclist.length <= 0) {
            return of([]);
        }

        return this.http
            .post<IRestTrafficDetailsResponse>(
                environment.trafficDetailApiBaseUrl,
                JSON.stringify(requestBody))
            .pipe(
                map(response => RestTrafficDetailsResponseConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading traffic details', err);
                    return throwError(err);
                })
            );
    }
}
