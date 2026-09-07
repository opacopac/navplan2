import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {RestExtent2dConverter} from '../../../geo-physics/rest/model/rest-extent2d-converter';
import {RestZoomConverter} from '../../../geo-physics/rest/model/rest-zoom-converter';
import {HttpHelper} from '../../../system/domain/service/http/http-helper';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';


/**
 * Generic base class for the recurring "read domain items by map extent/zoom" REST pattern
 * (used e.g. by navaid, airspace, airport, ...). Subclasses only need to provide the API url,
 * an error-log message and the REST -> domain model conversion.
 */
export abstract class RestReadByExtentService<TDomain, TRest> {
    protected constructor(
        protected readonly http: HttpClient,
        private readonly apiBaseUrl: string,
        private readonly readErrorMessage: string
    ) {
    }


    public readByExtent(extent: Extent2d, zoom: number): Observable<TDomain[]> {
        const params = HttpHelper.mergeParameters([
            RestExtent2dConverter.getUrlParams(extent),
            RestZoomConverter.getUrlParam(zoom),
            ...this.getAdditionalUrlParams()
        ]);

        return this.http
            .get<TRest[]>(this.apiBaseUrl, {params})
            .pipe(
                map((response) => this.convertList(response)),
                catchError(err => {
                    LoggingService.logResponseError(this.readErrorMessage, err);
                    return throwError(err);
                })
            );
    }


    /**
     * Override to add domain-specific url parameters (e.g. filters) in addition to extent & zoom.
     */
    protected getAdditionalUrlParams(): HttpParams[] {
        return [];
    }


    protected abstract convertList(restItems: TRest[]): TDomain[];
}
