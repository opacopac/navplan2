import {MetarTaf} from '../domain/metar-taf';
import {StringnumberService} from '../../shared/services/stringnumber/stringnumber.service';
import {IRestMetarTafFeature} from './i-rest-metar-taf-feature';


export class RestMetarTaf {
    public static fromRest(restMetarTafFeature: IRestMetarTafFeature): MetarTaf {
        return new MetarTaf(
            restMetarTafFeature.properties.id,
            restMetarTafFeature.properties.obsTime ? Date.parse(restMetarTafFeature.properties.obsTime) : undefined,
            this.getTafObsTimestamp(restMetarTafFeature.properties.rawTaf),
            restMetarTafFeature.properties.cover,
            restMetarTafFeature.properties.wx ? restMetarTafFeature.properties.wx : '',
            restMetarTafFeature.properties.wdir,
            restMetarTafFeature.properties.wspd,
            restMetarTafFeature.properties.rawOb,
            restMetarTafFeature.properties.rawTaf
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
