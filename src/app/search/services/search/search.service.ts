import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../shared/services/logging/logging.service';
import {GeocalcService} from '../../../shared/services/geocalc/geocalc.service';
import {Position2d} from '../../../shared/model/geometry/position2d';
import {Extent} from '../../../shared/model/extent';
import {RestMapperSearch, SearchResponse} from '../../model/rest-mapper-search';
import {User} from '../../../user/model/user';
import {SearchItemList} from '../../model/search-item-list';

const SEARCH_BASE_URL = environment.restApiBaseUrl + 'php/Navplan/Search/SearchService.php';


@Injectable({
    providedIn: 'root'
})
export class SearchService {
    constructor(private http: HttpClient) {}


    public searchByExtent(
        extent: Extent,
        minNotamTimestamp: number,
        maxNotamTimestamp: number): Observable<SearchItemList> {

        return of(undefined); // TODO
    }


    public searchByPosition(
        position: Position2d,
        maxRadius_deg: number,
        minNotamTimestamp: number,
        maxNotamTimestamp: number): Observable<SearchItemList> {

        return this.executePositionSearch(
            position,
            maxRadius_deg,
            minNotamTimestamp,
            maxNotamTimestamp,
        );
    }


    public searchByText(queryString: string, user: User): Observable<SearchItemList> {
        // try to find coordinates in text
        const pos = GeocalcService.tryParseCoordinates(queryString);
        if (pos) {
            // TODO: create single object search result with coordinates
            return of(undefined);
        } else {
            let url = SEARCH_BASE_URL + '?action=searchByText&searchText=' + queryString
                + '&searchItems=airports,navaids,reportingpoints,userpoints,geonames';
            if (user) {
                url += '&email=' + user.email + '&token=' + user.token;
            }

            return this.http
                .jsonp<SearchResponse>(url, 'callback')
                .pipe(
                    map(response => RestMapperSearch.getSearchItemListFromResponse(response)),
                    catchError(error => {
                        LoggingService.logResponseError('ERROR performing text search', error);
                        return throwError(error);
                    })
                );
        }
    }


    private executePositionSearch(
        position: Position2d,
        maxRadius_deg: number,
        minNotamTimestamp: number,
        maxNotamTimestamp: number): Observable<SearchItemList> {

        const url = SEARCH_BASE_URL + '?action=searchByPosition&lat=' + position.latitude + '&lon=' + position.longitude
            + '&rad=' + maxRadius_deg + '&minnotamtime=' + minNotamTimestamp + '&maxnotamtime=' + maxNotamTimestamp
            + '&searchItems=airports,navaids,reportingpoints,userpoints,geonames';

        return this.http
            .jsonp<SearchResponse>(url, 'callback')
            .pipe(
                map(response => RestMapperSearch.getSearchItemListFromResponse(response)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR performing position search', error);
                    return throwError(error);
                })
            );
    }
}
