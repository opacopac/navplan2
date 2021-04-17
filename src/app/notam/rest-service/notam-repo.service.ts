import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {INotamRepo} from '../domain-service/i-notam-repo';
import {NotamListConverter} from '../rest-model/notam-list-converter';
import {IRestNotamResponse} from '../rest-model/i-rest-notam-response';
import {NotamList} from '../domain-model/notam-list';
import {ReadNotamByExtentRequest} from '../domain-model/read-notam-by-extent-request';
import {ReadNotamByIcaoRequest} from '../domain-model/read-notam-by-icao-request';
import {ReadNotamByExtentRequestConverter} from '../rest-model/read-notam-by-extent-request-converter';
import {ReadNotamByIcaoRequestConverter} from '../rest-model/read-notam-by-icao-request-converter';


@Injectable()
export class NotamRepoService implements INotamRepo {
    constructor(private http: HttpClient) {
    }


    public readByExtent(request: ReadNotamByExtentRequest): Observable<NotamList> {
        const url = ReadNotamByExtentRequestConverter.toUrl(request);
        return this.http
            .get<IRestNotamResponse>(url)
            .pipe(
                map(response => NotamListConverter.fromRest(response)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading NOTAMs by extent!', error);
                    return throwError(error);
                })
            );
    }


    public readByIcao(request: ReadNotamByIcaoRequest): Observable<NotamList> {
        const url = ReadNotamByIcaoRequestConverter.toUrl(request);
        return this.http
            .get<IRestNotamResponse>(url)
            .pipe(
                map(response => NotamListConverter.fromRest(response)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading NOTAMs by icao!', error);
                    return throwError(error);
                })
            );
    }
}
