import {Track} from '../domain-model/track';
import {Timestamp} from '../../common/geo-math/domain-model/quantities/timestamp';
import {IRestTrack} from './i-rest-track';
import {Position4dConverter} from '../../common/geo-math/rest-model/position4d-converter';
import {TimestampConverter} from '../../common/geo-math/rest-model/timestamp-converter';


export class RestTrackConverter {
    public static fromRest(restTrack: IRestTrack): Track {
        return new Track(
            restTrack.id,
            restTrack.name,
            Position4dConverter.fromRestList(restTrack.positions),
            Timestamp.createFromSec(restTrack.savetime)
        );
    }


    public static toRest(track: Track): IRestTrack {
        return {
            id: track.id,
            name: track.name,
            positions: Position4dConverter.toRestList(track.positionList),
            savetime: TimestampConverter.toRest(track.saveTime)
        };
    }
}
