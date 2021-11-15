import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {VerticalMap} from '../domain-model/vertical-map';
import {RestVerticalMapConverter} from '../rest-model/rest-vertical-map-converter';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {IRestVerticalMapResponse} from '../rest-model/i-rest-vertical-map-response';


@Injectable({
    providedIn: 'root'
})
export class RestVerticalMapService {
    constructor(private http: HttpClient) {
    }


    readVerticalMap(wpPositions: [number, number][]): Observable<VerticalMap> {
        const requestBody = {
            action: 'readvmap',
            positions: wpPositions
        };
        return this.http
            .post<IRestVerticalMapResponse>(
                environment.verticalMapServiceUrl,
                JSON.stringify(requestBody),
                { observe: 'response' }
            )
            .pipe(
                map(response => RestVerticalMapConverter.fromRest(response.body.verticalMap)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading vertical map', err);
                    return throwError(err);
                })
            );
    }
}
