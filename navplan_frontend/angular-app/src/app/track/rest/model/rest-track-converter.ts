import {Track} from '../../domain/model/track';
import {IRestTrack} from './i-rest-track';
import {Position4dConverter} from '../../../geo-physics/rest/model/position4d-converter';
import {RestTimestampConverter} from '../../../geo-physics/rest/model/rest-timestamp-converter';


export class RestTrackConverter {
    public static fromRest(restTrack: IRestTrack): Track {
        return new Track(
            restTrack.id,
            restTrack.name,
            Position4dConverter.fromRestList(restTrack.positions),
            RestTimestampConverter.fromRest(restTrack.savetime)
        );
    }


    public static fromRestList(restTrackList: IRestTrack[]): Track[] {
        return restTrackList.map(restTrack => this.fromRest(restTrack));
    }


    public static toRest(track: Track): IRestTrack {
        return {
            id: track.id,
            name: track.name,
            positions: Position4dConverter.toRestList(track.positionList),
            savetime: RestTimestampConverter.toRest(track.saveTime)
        };
    }
}
