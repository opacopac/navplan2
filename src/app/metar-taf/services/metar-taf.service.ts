import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../shared/services/logging/logging.service';
import {Extent} from '../../shared/model/extent';
import {MetarTafList} from '../model/metar-taf';
import {MetarTafResponse, RestMapperMetarTaf} from '../model/rest-mapper-metar-taf';


const MIN_ZOOM_LEVEL = 8;
const MAXAGESEC = 5 * 60 * 1000; // 5 min
const METAR_TAF_BASE_URL = 'https://www.aviationweather.gov/gis/scripts/MetarJSON.php?taf=true&density=all&bbox='; // 6.0,44.0,10.0,48.0';


@Injectable()
export class MetarTafService {
    constructor(private http: HttpClient) {
    }


    public getOversizeFactor(): number {
        return environment.mapOversizeFactor;
    }


    public isTimedOut(ageSec: number): boolean {
        return (ageSec > MAXAGESEC);
    }


    public load(extent: Extent, zoom: number): Observable<MetarTafList> {
        // TODO
        if (zoom <= MIN_ZOOM_LEVEL) {
            return of(new MetarTafList());
        }

        const url = METAR_TAF_BASE_URL + extent[0] + ',' + extent[1] + ',' + extent[2] + ',' + extent[3];
        return this.http
            .jsonp<MetarTafResponse>(url, 'jsonp')
            .pipe(
                map(response => RestMapperMetarTaf.getMetarTafListFromResponse(response)),
                catchError((error, subject) => {
                    LoggingService.logResponseError('ERROR reading METAR/TAF!', error);
                    return subject;
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
