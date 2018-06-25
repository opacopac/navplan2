import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../utils/logging.service';
import {GeocalcService} from '../utils/geocalc.service';
import {Position2d} from '../../model/geometry/position2d';
import {Extent} from '../../model/ol-model/extent';
import {RestMapperSearch, SearchResponse} from '../../model/rest-mapper/rest-mapper-search';
import {User} from '../../user/model/user';
import {Observable} from 'rxjs/Observable';
import {SearchItemList} from '../../search/model/search-item-list';


const SEARCH_BASE_URL = environment.restApiBaseUrl + 'php/search/SearchService.php';


@Injectable()
export class SearchService {
    private textSearchTimestamp;
    private positionSearchTimestamp;


    constructor(
        private http: HttpClient) {
    }


    public searchByExtent(
        extent: Extent,
        minNotamTimestamp: number,
        maxNotamTimestamp: number,
        successCallback: (SearchItemList) => void,
        errorCallback: (string) => void) {
    }


    public searchByPosition(
        position: Position2d,
        maxRadius_deg: number,
        minNotamTimestamp: number,
        maxNotamTimestamp: number,
        successCallback: (SearchItemList) => void,
        errorCallback: (string) => void) {

        this.executePositionSearch(
            position,
            maxRadius_deg,
            minNotamTimestamp,
            maxNotamTimestamp,
            successCallback,
            errorCallback
        );
    }


    public searchByText(queryString: string, user: User): Observable<SearchItemList> {
        // try to find coordinates in text
        const pos = GeocalcService.tryParseCoordinates(queryString);
        if (pos) {
            // TODO: create single object search result with coordinates
            return Observable.of(undefined);
        } else {
            let url = SEARCH_BASE_URL + '?action=searchByText&searchText=' + queryString
                + '&searchItems=airports,navaids,reportingpoints,userpoints,geonames';
            if (user) {
                url += '&email=' + user.email + '&token=' + user.token;
            }

            return this.http
                .jsonp<SearchResponse>(url, 'callback')
                .map(response => RestMapperSearch.getSearchItemListFromResponse(response));
        }
    }


    private executePositionSearch(
        position: Position2d,
        maxRadius_deg: number,
        minNotamTimestamp: number,
        maxNotamTimestamp: number,
        successCallback: (NotamList) => void,
        errorCallback: (string) => void) {

        const url = SEARCH_BASE_URL + '?action=searchByPosition&lat=' + position.latitude + '&lon=' + position.longitude
            + '&rad=' + maxRadius_deg + '&minnotamtime=' + minNotamTimestamp + '&maxnotamtime=' + maxNotamTimestamp
            + '&searchItems=airports,navaids,reportingpoints,userpoints,geonames';

        const timestamp = Date.now();
        this.positionSearchTimestamp = timestamp;
        this.http
            .jsonp<SearchResponse>(url, 'callback')
            .subscribe(
                response => {
                    if (timestamp !== this.positionSearchTimestamp) {
                        return;
                    }
                    const searchItemList = RestMapperSearch.getSearchItemListFromResponse(response);
                    successCallback(searchItemList);
                },
                err => {
                    const message = 'ERROR performing position search!';
                    LoggingService.logResponseError(message, err);
                    errorCallback(message);
            });
    }
}
