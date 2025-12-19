import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {RestSearchResponseConverter} from '../model/rest-search-response-converter';
import {SearchItemList} from '../../domain/model/search-item-list';
import {CoordinateHelper} from '../../../geo-physics/domain/service/geometry/coordinate-helper';
import {IRestSearchResponse} from '../model/i-rest-search-response';
import {ISearchRepoService} from '../../domain/service/i-search-repo.service';
import {RestPositionSearchResponseConverter} from '../model/rest-position-search-response-converter';
import {PositionSearchResultList} from '../../domain/model/position-search-result-list';
import {HttpHelper} from '../../../system/domain/service/http/http-helper';


@Injectable()
export class RestSearchService implements ISearchRepoService {
    constructor(private http: HttpClient) {
    }


    public searchByPosition(
        position: Position2d,
        maxRadius_deg: number,
        maxResults: number,
        minNotamTimestamp: number,
        maxNotamTimestamp: number
    ): Observable<PositionSearchResultList> {
        const params = new HttpParams()
            .set('lat', position.latitude.toString())
            .set('lon', position.longitude.toString())
            .set('rad', maxRadius_deg.toString())
            .set('maxresults', maxResults.toString())
            .set('minnotamtime', minNotamTimestamp.toString())
            .set('maxnotamtime', maxNotamTimestamp.toString())
            .set('searchItems', 'airports,navaids,airspaces,reportingpoints,userpoints,geonames,notams');
        const url = environment.searchPositionApiBaseUrl + '?' + params.toString();

        return this.http
            .get<IRestSearchResponse>(url, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS)
            .pipe(
                map(response => RestPositionSearchResponseConverter.fromRest(response)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR performing position search', error);
                    return throwError(error);
                })
            );
    }


    public searchByText(queryString: string): Observable<SearchItemList> {
        // try to find coordinates in text
        const pos = CoordinateHelper.tryParseCoordinates(queryString);
        if (pos) {
            // TODO: create single object search result with coordinates
            return of(undefined);
        } else {
            const params = new HttpParams()
                .set('searchText', queryString)
                .set('searchItems', 'airports,navaids,reportingpoints,userpoints,geonames');
            const url = environment.searchTextApiBaseUrl + '?' + params.toString();

            return this.http
                .get<IRestSearchResponse>(url, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS)
                .pipe(
                    map(response => RestSearchResponseConverter.fromRest(response)),
                    catchError(error => {
                        LoggingService.logResponseError('ERROR performing text search', error);
                        return throwError(error);
                    })
                );
        }
    }
}
