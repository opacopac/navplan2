import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {StringnumberHelper} from '../../system/domain-service/stringnumber/stringnumber-helper';
import {IRestMetarTafFeature} from './i-rest-metar-taf-feature';
import {Position2d} from '../../geo-physics/domain-model/geometry/position2d';


export class RestMetarTafConverter {
    public static listFromRest(restMetarTafFeatureList: IRestMetarTafFeature[]): MetarTaf[] {
        return restMetarTafFeatureList
            .filter(restMetarTaf => restMetarTaf.geometry?.coordinates)
            .map(restMetarTaf => RestMetarTafConverter.fromRest(restMetarTaf));
    }


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
            restMetarTafFeature.properties.rawTaf,
            Position2d.createFromArray(restMetarTafFeature.geometry.coordinates),
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
            + StringnumberHelper.zeroPad(d.getMonth() + 1) + '-'
            + matches[2] + 'T' + matches[3] + ':' + matches[4] + ':00Z';

        return Date.parse(datestring);
    }
}
