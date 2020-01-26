import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {LoggingService} from '../../system/use-case/logging/logging.service';
import {Extent2d} from '../../geo-math/domain/geometry/extent2d';
import {MetarTafList} from '../domain/metar-taf';
import {RestMetarTafList} from './rest-metar-taf-list';
import {IRestMetarTafResponse} from './i-rest-metar-taf-response';


const METAR_TAF_BASE_URL = 'https://www.aviationweather.gov/gis/scripts/MetarJSON.php?taf=true&density=all&bbox='; // 6.0,44.0,10.0,48.0';


@Injectable({
    providedIn: 'root'
})
export class MetarTafService {
    constructor(private http: HttpClient) {
    }


    public load(extent: Extent2d): Observable<MetarTafList> {
        const url = METAR_TAF_BASE_URL + extent.minLon + ',' + extent.minLat + ',' + extent.maxLon + ',' + extent.maxLat;
        return this.http
            .jsonp<IRestMetarTafResponse>(url, 'jsonp')
            .pipe(
                map(response => RestMetarTafList.fromRest(response)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading METAR/TAF!', error);
                    return throwError(error);
                }),
            );
    }


    public loadByIcao(
        icao: string,
        successCallback: (MetarTaf) => void,
        errorCallback: (string) => void) {

        // search in cache
        /*for (const cacheItem of this.cacheItemList) {
            for (const metarTaf of cacheItem.item.items) {
                if (metarTaf.ad_icao === icao) {
                    if (successCallback) {
                        successCallback(metarTaf);
                    }

                    return;
                }
            }
        }*/

        // TODO: load from aviationweather
    }
}