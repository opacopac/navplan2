import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {select, Store} from '@ngrx/store';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Extent2d} from '../../shared/model/geometry/extent2d';
import {OpenAipItems} from '../domain/open-aip-items';
import {User} from '../../user/domain/user';
import {LoggingService} from '../../shared/services/logging/logging.service';
import {Position2d} from '../../shared/model/geometry/position2d';
import {DataItem} from '../../shared/model/data-item';
import {getOpenAipItems} from '../ngrx/open-aip.selectors';
import {RestOpenAipItems} from '../rest/rest-open-aip-items';
import {IRestOpenAipItems} from '../rest/i-rest-open-aip-items';


const OPEN_AIP_BASE_URL = environment.restApiBaseUrl + 'php/Navplan/Search/SearchService.php';


@Injectable({
    providedIn: 'root'
})
export class OpenAipService  {
    private loadedOpenAipItems$: Observable<OpenAipItems>;


    constructor(
        private http: HttpClient,
        private appStore: Store<any>) {
        this.loadedOpenAipItems$ = this.appStore.pipe(select(getOpenAipItems));
    }


    public static findLoadedMapFeatureByPosition(openAipItems: OpenAipItems, position: Position2d, precisionDigits = 4): DataItem {
        // search airports
        for (const airport of openAipItems.airports) {
            if (airport.position.equals(position, precisionDigits)) {
                return airport;
            }
        }

        // search navaids
        for (const navaid of openAipItems.navaids) {
            if (navaid.position.equals(position, precisionDigits)) {
                return navaid;
            }
        }

        // search user points
        for (const userpoint of openAipItems.userpoints) {
            if (userpoint.position.equals(position, precisionDigits)) {
                return userpoint;
            }
        }

        // search reporting point
        for (const reportingpoint of openAipItems.reportingpoints) {
            if (reportingpoint.position.equals(position, precisionDigits)) {
                return reportingpoint;
            }
        }

        // search reporting sectors
        for (const reportingsector of openAipItems.reportingsectors) {
            if (reportingsector.polygon.containsPoint(position)) {
                return reportingsector;
            }
        }

        return undefined;
    }


    public load(
        extent: Extent2d,
        zoom: number,
        user: User): Observable<OpenAipItems> {

        return this.http
            .get<IRestOpenAipItems>(this.buildRequestUrl(extent, zoom, user))
            .pipe(
                map(response => RestOpenAipItems.fromRest(response)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading map features', error);
                    return throwError(error);
                }),
            );
    }


    public getOversizeFactor(): number {
        return environment.mapOversizeFactor;
    }


    public isTimedOut(ageSec: number): boolean {
        return false;
    }


    private buildRequestUrl(extent: Extent2d, zoom: number, user: User): string {
        let url = OPEN_AIP_BASE_URL + '?action=searchByExtent' + '&minlon=' + extent.minLon + '&minlat=' + extent.minLat
            + '&maxlon=' + extent.maxLon + '&maxlat=' + extent.maxLat + '&zoom=' + zoom;
        url += '&searchItems=airports,navaids,airspaces';
        if (zoom >= 10) {
            url += ',webcams';
        }
        if (zoom >= 11) {
            url += ',reportingpoints,userpoints';
        }
        if (user) {
            url += '&email=' + user.email + '&token=' + user.token;
        }
        return url;
    }
}
