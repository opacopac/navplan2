import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Sessioncontext } from '../../model/sessioncontext';
import { SessionService } from '../utils/session.service';
import { LoggingService } from '../utils/logging.service';
import { GeocalcService } from '../utils/geocalc.service';
import { SearchItemList } from '../../model/search-item';
import { Position2d } from '../../model/position';
import { NotamRestItem } from '../notam/notam.service';
import { AirportRestItem, RestMapperAirport } from '../../model/rest-model/rest-mapper-airport';
import { NavaidRestItem, RestMapperNavaid } from '../../model/rest-model/rest-mapper-navaid';
import { AirspaceRestItem } from '../../model/rest-model/rest-mapper-airspace';
import { ReportingPointRestItem, RestMapperReportingpoint } from '../../model/rest-model/rest-mapper-reportingpoint';
import { RestMapperUserpoint, UserPointRestItem } from '../../model/rest-model/rest-mapper-userpoint';
import { WebcamRestItem } from '../../model/rest-model/rest-mapper-webcam';
import { GeonameRestItem, RestMapperGeoname} from '../../model/rest-model/rest-mapper-geoname';
import { Extent } from '../../model/ol-model/extent';


const SEARCH_BASE_URL = environment.restApiBaseUrl + 'php/search/SearchService.php';


// region INTERFACES

interface SearchResponse {
    airports: AirportRestItem[];
    navaids: NavaidRestItem[];
    airspaces: AirspaceRestItem[];
    reportingpoints: ReportingPointRestItem[];
    userpoints: UserPointRestItem[];
    webcams: WebcamRestItem[];
    geonames: GeonameRestItem[];
    notams: NotamRestItem[];
}


// endregion


@Injectable()
export class SearchService {
    private session: Sessioncontext;
    private textSearchTimestamp;
    private positionSearchTimestamp;


    constructor(
        private http: HttpClient,
        private sessionService: SessionService) {

        this.session = this.sessionService.getSessionContext();
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


    public searchByText(
        queryString: string,
        successCallback: (SearchItemList) => void,
        errorCallback: (string) => void) {

        // try to find coordinates in text
        const pos = GeocalcService.tryParseCoordinates(queryString);
        if (pos) {
            if (successCallback) {
                // TODO: create object
            }
        } else {
            // perform server query
            this.executeTextSearch(queryString, successCallback, errorCallback);
        }
    }


    private executeTextSearch(
        queryString: string,
        successCallback: (NotamList) => void,
        errorCallback: (string) => void) {

        let url = SEARCH_BASE_URL + '?action=searchByText&searchText=' + queryString
            + '&searchItems=airports,navaids,reportingpoints,userpoints,geonames';
        if (this.sessionService.isLoggedIn()) {
            url += '&email=' + this.session.user.email + '&token=' + this.session.user.token;
        }

        const timestamp = Date.now();
        this.textSearchTimestamp = timestamp;
        this.http
            .jsonp<SearchResponse>(url, 'callback')
            .subscribe(
                response => {
                    if (timestamp !== this.textSearchTimestamp) {
                        return;
                    }
                    const searchItemList = this.getSearchItemList(response);
                    successCallback(searchItemList);
                },
                err => {
                    const message = 'ERROR performing text search!';
                    LoggingService.logResponseError(message, err);
                    errorCallback(message);
                });
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
                    const searchItemList = this.getSearchItemList(response);
                    successCallback(searchItemList);
                },
                err => {
                    const message = 'ERROR performing position search!';
                    LoggingService.logResponseError(message, err);
                    errorCallback(message);
            });
    }


    private getSearchItemList(response: SearchResponse): SearchItemList {
        const searchItemList = new SearchItemList();

        for (const restItem of response.airports) {
            searchItemList.appendSearchItem(RestMapperAirport.getAirportFromRestItem(restItem));
        }

        for (const restItem of response.navaids) {
            searchItemList.appendSearchItem(RestMapperNavaid.getNavaidFromRestItem(restItem));
        }

        for (const restItem of response.reportingpoints) {
            switch (restItem.type) {
                case 'POINT':
                    searchItemList.appendSearchItem(RestMapperReportingpoint.getReportingpointFromRestItem(restItem));
                    break;
                case 'SECTOR':
                    searchItemList.appendSearchItem(RestMapperReportingpoint.getReportingSectorFromRestItem(restItem));
                    break;
            }
        }

        for (const restItem of response.userpoints) {
            searchItemList.appendSearchItem(RestMapperUserpoint.getUserpointFromRestItem(restItem));
        }

        for (const restItem of response.geonames) {
            searchItemList.appendSearchItem(RestMapperGeoname.getGeonameFromRestItem(restItem));
        }

        return searchItemList;
    }
}
