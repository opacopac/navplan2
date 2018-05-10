import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../utils/logging.service';
import { SessionService } from '../utils/session.service';
import { Sessioncontext } from '../../model/sessioncontext';
import { CachingExtentLoader } from '../map/caching-extent-loader';
import { Extent } from '../../model/ol-model/extent';
import { MetarTaf, MetarTafList } from '../../model/metar-taf';
import { StringnumberService } from '../utils/stringnumber.service';


const MIN_ZOOM_LEVEL = 8;
const MAXAGESEC = 5 * 60 * 1000; // 5 min
const METAR_TAF_BASE_URL = 'https://www.aviationweather.gov/gis/scripts/MetarJSON.php?taf=true&density=all&bbox='; // 6.0,44.0,10.0,48.0';


// region interfaces

interface MetarTafResponse {
    type: string;
    features: MetarTafFeature[];
}

interface MetarTafFeature {
    type: string;
    properties: MetarTafProperties;
    geometry: MetarTafGeometry;
}


interface MetarTafProperties {
    id: string;
    site: string;
    prior: string; // TODO?
    obsTime: string;
    temp: number;
    dewp: number;
    wspd: number;
    wdir: number;
    ceil: number;
    cover: string;
    wx: string;
    visib: number;
    fltcat: string;
    altim: number;
    rawOb: string;
    rawTaf: string;
}


interface MetarTafGeometry {
    type: string;
    coordinates: [number, number];
}

// endregion


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
                    const metarTafList = this.getMetarTafList(response);
                    successCallback(metarTafList);
                },
                err => {
                    const message = 'ERROR reading METAR/TAF!';
                    LoggingService.logResponseError(message, err);
                    errorCallback(message);
                });
    }


    private getMetarTafList(response: MetarTafResponse): MetarTafList {
        const metarTafList: MetarTafList = new MetarTafList();

        for (const metarTafRestItem of response.features) {
            const metarTaf = new MetarTaf(
                metarTafRestItem.properties.id,
                metarTafRestItem.properties.obsTime ? Date.parse(metarTafRestItem.properties.obsTime) : undefined,
                this.getTafObsTimestamp(metarTafRestItem.properties.rawTaf),
                metarTafRestItem.properties.cover,
                metarTafRestItem.properties.wx ? metarTafRestItem.properties.wx : '',
                metarTafRestItem.properties.wdir,
                metarTafRestItem.properties.wspd,
                metarTafRestItem.properties.rawOb,
                metarTafRestItem.properties.rawTaf
            );
            metarTafList.items.push(metarTaf);
        }

        return metarTafList;
    }


    private getTafObsTimestamp(rawTaf: string): number {
        if (!rawTaf) {
           return undefined;
        }

        const matches = rawTaf.match(/^TAF( [A-Z]{3})? [A-Z]{4} (\d\d)(\d\d)(\d\d)Z.*$/);

        if (!matches || matches.length !== 5) {
           return undefined;
        }

        const d = new Date();
        const datestring = d.getFullYear() + '-'
            + StringnumberService.zeroPad(d.getMonth() + 1) + '-'
            + matches[2] + 'T' + matches[3] + ':' + matches[4] + ':00Z';

        return Date.parse(datestring);
    }
}
