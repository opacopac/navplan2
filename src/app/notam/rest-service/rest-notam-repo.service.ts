import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {INotamRepo} from '../domain-service/i-notam-repo';
import {RestNotamListConverter} from '../rest-model/rest-notam-list-converter';
import {IRestNotamResponse} from '../rest-model/i-rest-notam-response';
import {NotamList} from '../domain-model/notam-list';
import {ReadNotamByExtentRequest} from '../domain-model/read-notam-by-extent-request';
import {ReadNotamByIcaoRequest} from '../domain-model/read-notam-by-icao-request';
import {RestReadNotamByExtentRequestConverter} from '../rest-model/rest-read-notam-by-extent-request-converter';
import {RestReadNotamByIcaoRequestConverter} from '../rest-model/rest-read-notam-by-icao-request-converter';
import {ReadNotamByPositionRequest} from '../domain-model/read-notam-by-position-request';
import {RestReadNotamByPositionRequestConverter} from '../rest-model/rest-read-notam-by-position-request-converter';


@Injectable()
export class RestNotamRepo implements INotamRepo {
    constructor(private http: HttpClient) {
    }


    public readByExtent(request: ReadNotamByExtentRequest): Observable<NotamList> {
        const url = RestReadNotamByExtentRequestConverter.toUrl(request);
        return this.http
            .get<IRestNotamResponse>(url)
            .pipe(
                map(response => RestNotamListConverter.fromRest(response)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading NOTAMs by extent!', error);
                    return throwError(error);
                })
            );
    }


    public readByPosition(request: ReadNotamByPositionRequest): Observable<NotamList> {
        const url = RestReadNotamByPositionRequestConverter.toUrl(request);
        return this.http
            .get<IRestNotamResponse>(url)
            .pipe(
                map(response => RestNotamListConverter.fromRest(response)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading NOTAMs by position!', error);
                    return throwError(error);
                })
            );
    }


    public readByIcao(request: ReadNotamByIcaoRequest): Observable<NotamList> {
        const url = RestReadNotamByIcaoRequestConverter.toUrl(request);
        return this.http
            .get<IRestNotamResponse>(url)
            .pipe(
                map(response => RestNotamListConverter.fromRest(response)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading NOTAMs by icao!', error);
                    return throwError(error);
                })
            );
    }
}
