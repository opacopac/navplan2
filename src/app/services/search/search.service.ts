import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Sessioncontext } from '../../model/sessioncontext';
import { SessionService } from '../utils/session.service';
import { LoggingService } from '../utils/logging.service';
import { GeocalcService } from '../utils/geocalc.service';
import { SearchItem, SearchItemList } from '../../model/search-item';
import { Position2d } from '../../model/position';
import { Notam } from '../../model/notam';


const SEARCH_BASE_URL = environment.restApiBaseUrl + 'php/geopoint.php';


// region INTERFACES

interface SearchResponse {
    geonames: SearchResponseItem[],
    notams: SearchResponseNotam[]
}

interface SearchResponseItem {
    type: string;
    id: string;
    name: string;
    wpname: string;
    country: string;
    admin1: string;
    admin2: string;
    frequency: string;
    callsign: string;
    airport_icao: string;
    latitude: number;
    longitude: number;
    elevation: number;
}


interface SearchResponseNotam {
    notam: string; // TODO
}

// endregion


@Injectable()
export class SearchService {
    private session: Sessioncontext;

    constructor(
        private http: HttpClient,
        private sessionService: SessionService) {

        this.session = this.sessionService.getSessionContext();
    }


    public searchByQuery(
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


    public searchByCoordinates(
        position: Position2d,
        maxRadius_m: number,
        minNotamTimestamp: number,
        maxNotamTimestamp: number,
        successCallback: (SearchItemList) => void,
        errorCallback: (string) => void) {

        this.executePositionSearch(
            position,
            maxRadius_m,
            minNotamTimestamp,
            maxNotamTimestamp,
            successCallback,
            errorCallback
        );
    }


    private executeTextSearch(
        queryString: string,
        successCallback: (NotamList) => void,
        errorCallback: (string) => void) {

        const url = SEARCH_BASE_URL + '?action=searchByName&search=' + queryString;

        this.http
            .jsonp<SearchResponse>(url, 'callback')
            .subscribe(
                response => {
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
        maxRadius_m: number,
        minNotamTimestamp: number,
        maxNotamTimestamp: number,
        successCallback: (NotamList) => void,
        errorCallback: (string) => void) {

        const url = SEARCH_BASE_URL + '?action=searchByPosition&lat=' + position.latitude + '&lon=' + position.longitude
            + '&rad=' + maxRadius_m + '&minnotamtime=' + minNotamTimestamp + '&maxnotamtime=' + maxNotamTimestamp;

        this.http
            .jsonp<SearchResponse>(url, 'callback')
            .subscribe(
                response => {
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

        for (const item of response.geonames) {
            const searchItem = this.getSearchItem(item);
            searchItemList.items.push(searchItem);
        }

        return searchItemList;
    }


    private getSearchItem(responseItem: SearchResponseItem): SearchItem {
        return new SearchItem(
            responseItem.type,
            responseItem.id,
            responseItem.name,
            responseItem.wpname,
            responseItem.country,
            responseItem.admin1,
            responseItem.admin2,
            responseItem.frequency,
            responseItem.callsign,
            responseItem.airport_icao,
            responseItem.latitude,
            responseItem.longitude,
            responseItem.elevation);
    }


    private getNotam(responseNotem: SearchResponseNotam): Notam {
        return undefined; // TODO
    }
}
