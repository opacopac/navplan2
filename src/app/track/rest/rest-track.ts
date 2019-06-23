import {Track} from '../domain/track';
import {Timestamp} from '../../shared/model/quantities/timestamp';
import {IRestTrackListEntry} from './i-rest-track-list-entry';
import {Position4d} from '../../shared/model/geometry/position4d';
import {Altitude} from '../../shared/model/geometry/altitude';
import {AltitudeUnit} from '../../shared/model/geometry/altitude-unit';
import {AltitudeReference} from '../../shared/model/geometry/altitude-reference';
import {IRestTrack} from './i-rest-track';


export class RestTrack {
    public static fromListEntryRest(restListEntry: IRestTrackListEntry): Track {
        return new Track(
            restListEntry.id,
            restListEntry.name,
            undefined,
            Timestamp.createFromSec(restListEntry.timestamp)
        );
    }


    public static fromRest(restTrack: IRestTrack): Track {
        const positions: Position4d[] = [];
        restTrack.positions.forEach(pos => positions.push(this.getPos4dFrom4Tuple(pos)));

        return new Track(
            restTrack.id,
            restTrack.name,
            positions,
            Timestamp.createFromSec(restTrack.timestamp)
        );
    }


    // TODO
    private static getPos4dFrom4Tuple(posTuple: number[]): Position4d {
        if (!posTuple || posTuple.length !== 4) {
            return undefined;
        }

        return new Position4d(
            posTuple[1],
            posTuple[0],
            new Altitude(posTuple[2], AltitudeUnit.M, AltitudeReference.MSL),
            Timestamp.createFromSec(posTuple[3])
        );
    }
}
