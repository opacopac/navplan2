import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { LoggingService } from '../utils/logging.service';
import { SessionService } from '../session/session.service';
import { Sessioncontext } from '../../../model/session/sessioncontext';
import { CachingExtentLoader } from '../map/caching-extent-loader';
import { Extent } from '../../../model/ol-model/extent';
import { MetarTafList } from '../../../model/metar-taf';
import { MetarTafResponse, RestMapperMetarTaf} from '../../../model/rest-mapper/rest-mapper-metar-taf';
import {User} from '../../../user/model/user';


const MIN_ZOOM_LEVEL = 8;
const MAXAGESEC = 5 * 60 * 1000; // 5 min
const METAR_TAF_BASE_URL = 'https://www.aviationweather.gov/gis/scripts/MetarJSON.php?taf=true&density=all&bbox='; // 6.0,44.0,10.0,48.0';


@Injectable()
export class MetarTafService extends CachingExtentLoader<MetarTafList> {
    private session: Sessioncontext;


    constructor(
        private http: HttpClient,
        private sessionService: SessionService) {

        super();
        this.session = this.sessionService.getSessionContext();
    }


    public getOversizeFactor(): number {
        return environment.mapOversizeFactor;
    }


    public isTimedOut(ageSec: number): boolean {
        return (ageSec > MAXAGESEC);
    }


    protected loadFromSource(
        extent: Extent,
        zoom: number,
        user: User,
        successCallback: (MetarTafList) => void,
        errorCallback: (string) => void) {

        // TODO
        if (zoom <= MIN_ZOOM_LEVEL) {
            return;
        }

        const url = METAR_TAF_BASE_URL + extent[0] + ',' + extent[1] + ',' + extent[2] + ',' + extent[3];
        this.http
            .jsonp<MetarTafResponse>(url, 'jsonp')
            .subscribe(
                response => {
                    const metarTafList = RestMapperMetarTaf.getMetarTafListFromResponse(response);
                    successCallback(metarTafList);
                },
                err => {
                    const message = 'ERROR reading METAR/TAF!';
                    LoggingService.logResponseError(message, err);
                    errorCallback(message);
                });
    }


    public loadByIcao(
        icao: string,
        successCallback: (MetarTaf) => void,
        errorCallback: (string) => void) {

        // search in cache
        for (const cacheItem of this.cacheItemList) {
            for (const metarTaf of cacheItem.item.items) {
                if (metarTaf.ad_icao === icao) {
                    if (successCallback) {
                        successCallback(metarTaf);
                    }

                    return;
                }
            }
        }

        // TODO: load from aviationweather
    }
}
