import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpHelper} from '../../../system/domain/service/http/http-helper';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {IRestSuccessResponse} from '../../../flightroute/rest/model/i-rest-success-response';


/**
 * Generic base class for the recurring id-based REST CRUD pattern
 * (read/create-or-update/duplicate/delete a single entity by id, e.g. aircraft).
 * Subclasses only need to provide the API url, the entity name (used in log messages)
 * and the REST <-> domain model conversions.
 */
export abstract class RestCrudService<TDomain, TRest> {
    protected constructor(
        protected readonly http: HttpClient,
        private readonly apiBaseUrl: string,
        private readonly entityName: string
    ) {
    }


    public read(id: number): Observable<TDomain> {
        return this.http
            .get<TRest>(`${this.apiBaseUrl}/${id}`, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS)
            .pipe(
                map((response) => this.convertFromRest(response)),
                catchError(err => this.handleError(`ERROR reading ${this.entityName}`, err))
            );
    }


    public save(item: TDomain, id: number): Observable<TDomain> {
        const requestBody = this.convertToRest(item);

        const request$ = id > 0
            ? this.http.put<TRest>(`${this.apiBaseUrl}/${id}`, requestBody, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS)
            : this.http.post<TRest>(this.apiBaseUrl, requestBody, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS);

        return request$.pipe(
            map((response) => this.convertFromRest(response)),
            catchError(err => this.handleError(`ERROR ${id > 0 ? 'updating' : 'creating'} ${this.entityName}`, err))
        );
    }


    public duplicate(id: number): Observable<TDomain> {
        return this.http
            .post<TRest>(`${this.apiBaseUrl}/${id}/duplicate`, HttpHelper.HTTP_EMPTY_BODY, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS)
            .pipe(
                map((response) => this.convertFromRest(response)),
                catchError(err => this.handleError(`ERROR duplicating ${this.entityName}`, err))
            );
    }


    public delete(id: number): Observable<boolean> {
        return this.http
            .delete<IRestSuccessResponse>(`${this.apiBaseUrl}/${id}`, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS)
            .pipe(
                map((response) => response.success),
                catchError(err => this.handleError(`ERROR deleting ${this.entityName}`, err))
            );
    }


    protected abstract convertFromRest(restItem: TRest): TDomain;


    protected abstract convertToRest(item: TDomain): unknown;


    private handleError(message: string, err: any): Observable<never> {
        LoggingService.logResponseError(message, err);
        return throwError(err);
    }
}
