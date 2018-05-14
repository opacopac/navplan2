import { MetarTaf } from '../metar-taf';
import { StringnumberService } from '../../services/utils/stringnumber.service';


export interface MetarTafFeature {
    type: string;
    properties: MetarTafProperties;
    geometry: MetarTafGeometry;
}


export interface MetarTafProperties {
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


export interface MetarTafGeometry {
    type: string;
    coordinates: [number, number];
}


export class RestMapperMetarTaf {
    public static getMetarTafFromRestItem(metarTafRestItem: MetarTafFeature): MetarTaf {
        return new MetarTaf(
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
    }


    private static getTafObsTimestamp(rawTaf: string): number {
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
