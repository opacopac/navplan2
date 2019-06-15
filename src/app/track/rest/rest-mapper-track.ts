import {Track} from '../domain/track';
import {Timestamp} from '../../shared/model/quantities/timestamp';
import {Position4d} from '../../shared/model/geometry/position4d';
import {Length} from '../../shared/model/quantities/length';
import {LengthUnit} from '../../shared/model/quantities/units';


export interface TrackListResponse {
    tracks: TrackListEntry[];
}


export interface TrackListEntry {
    id: number;
    timestamp: number;
    name: string;
}


export interface SingleTrackResponse {
    track: SingleTrack;
}


export interface SingleTrack {
    id: number;
    timestamp: number;
    name: string;
    positions: number[][];
}


export class RestMapperTrack {
    public static getTrackListFromResponse(response: TrackListResponse): Track[] {
        if (!response.tracks || response.tracks.length === 0) {
            return [];
        }

        const trackList: Track[] = [];
        for (let i = 0; i < response.tracks.length; i++) {
            const entry: TrackListEntry = response.tracks[i];
            const track = new Track(
                entry.id,
                entry.name,
                undefined,
                Timestamp.createFromSec(entry.timestamp));
            trackList.push(track);
        }

        return trackList;
    }


    public static getTrackFromResponse(response: SingleTrackResponse): Track {
        if (!response.track) {
            return undefined;
        }

        const positions: Position4d[] = [];
        response.track.positions.forEach(pos => positions.push(this.getPos4dFrom4Tuple(pos)));

        return new Track(
            response.track.id,
            response.track.name,
            positions,
            Timestamp.createFromSec(response.track.timestamp)
        );
    }


    public static getPos4dFrom4Tuple(posTuple: number[]): Position4d {
        if (!posTuple || posTuple.length !== 4) {
            return undefined;
        }

        return new Position4d(
            posTuple[1],
            posTuple[0],
            new Length(posTuple[2], LengthUnit.M),
            Timestamp.createFromSec(posTuple[3])
        );
    }
}
