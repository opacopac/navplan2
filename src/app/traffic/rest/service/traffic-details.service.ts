import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {Traffic} from '../../domain/model/traffic';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {IRestTrafficDetailsResponse} from '../model/traffic-details/i-rest-traffic-details-response';
import {TrafficDetails} from '../../domain/model/traffic-details';
import {RestTrafficDetailsResponseConverter} from '../model/traffic-details/rest-traffic-details-response-converter';
import {RestTrafficDetailsRequestConverter} from '../model/traffic-details/rest-traffic-details-request-converter';
import {ITrafficDetailsService} from '../../domain/service/traffic-details/i-traffic-details-service';


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
                environment.trafficDetailServiceUrl,
                JSON.stringify(requestBody),
                {observe: 'response'})
            .pipe(
                map(response => RestTrafficDetailsResponseConverter.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading traffic details', err);
                    return throwError(err);
                })
            );
    }
}
