import {MetarTaf} from '../../domain/model/metar-taf';
import {StringnumberHelper} from '../../../system/domain/service/stringnumber/stringnumber-helper';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {IRestMetarTafEntry} from './i-rest-metar-taf-entry';


export class RestMetarTafConverter {
    public static listFromRest(restMetarTafEntries: IRestMetarTafEntry[]): MetarTaf[] {
        return restMetarTafEntries
            .filter(restMetarTaf => restMetarTaf.lon !== undefined && restMetarTaf.lat !== undefined)
            .map(restMetarTaf => RestMetarTafConverter.fromRest(restMetarTaf));
    }


    public static fromRest(restMetarTafEntry: IRestMetarTafEntry): MetarTaf {
        return new MetarTaf(
            restMetarTafEntry.icaoId,
            restMetarTafEntry.obsTime ? parseInt(restMetarTafEntry.obsTime, 10) * 1000 : undefined,
            this.getTafObsTimestamp(restMetarTafEntry.rawTaf),
            restMetarTafEntry.cover,
            restMetarTafEntry.wxString ? restMetarTafEntry.wxString : '',
            restMetarTafEntry.wdir,
            restMetarTafEntry.wspd,
            restMetarTafEntry.rawOb,
            restMetarTafEntry.rawTaf,
            new Position2d(restMetarTafEntry.lon, restMetarTafEntry.lat),
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
