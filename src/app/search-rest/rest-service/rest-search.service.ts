import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {RestSearchResponseConverter} from '../rest-model/rest-search-response-converter';
import {User} from '../../user/domain-model/user';
import {SearchItemList} from '../../search/domain-model/search-item-list';
import {CoordinateHelper} from '../../common/geo-math/domain-service/coordinate-helper';
import {IRestSearchResponse} from '../rest-model/i-rest-search-response';
import {ISearchRepoService} from '../../search/domain-service/i-search-repo.service';
import {RestPositionSearchResponseConverter} from '../rest-model/rest-position-search-response-converter';
import {PositionSearchResultList} from '../../search/domain-model/position-search-result-list';


@Injectable()
export class RestSearchService implements ISearchRepoService {
    constructor(private http: HttpClient) {}


    public searchByPosition(
        position: Position2d,
        maxRadius_deg: number,
        maxResults: number,
        minNotamTimestamp: number,
        maxNotamTimestamp: number
    ): Observable<PositionSearchResultList> {
        const url = environment.searchServiceUrl + '?action=searchByPosition&lat=' + position.latitude + '&lon=' + position.longitude
            + '&rad=' + maxRadius_deg + '&maxresults=' + maxResults + '&minnotamtime=' + minNotamTimestamp
            + '&maxnotamtime=' + maxNotamTimestamp + '&searchItems=airports,navaids,airspaces,reportingpoints,userpoints,geonames';

        return this.http
            .get<IRestSearchResponse>(url)
            .pipe(
                map(response => RestPositionSearchResponseConverter.fromRest(response)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR performing position search', error);
                    return throwError(error);
                })
            );
    }


    public searchByText(
        queryString: string,
        user: User
    ): Observable<SearchItemList> {
        // try to find coordinates in text
        const pos = CoordinateHelper.tryParseCoordinates(queryString);
        if (pos) {
            // TODO: create single object search result with coordinates
            return of(undefined);
        } else {
            let url = environment.searchServiceUrl + '?action=searchByText&searchText=' + queryString
                + '&searchItems=airports,navaids,reportingpoints,userpoints,geonames';
            if (user) {
                url += '&email=' + user.email + '&token=' + user.token;
            }

            return this.http
                // .jsonp<SearchResponse>(url, 'callback')
                .get<IRestSearchResponse>(url)
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
