import {Track} from './track';
import {Timestamp} from '../../shared/model/quantities/timestamp';
import {Position4d} from '../../shared/model/geometry/position4d';
import {Altitude} from '../../shared/model/quantities/altitude';
import {LengthUnit} from '../../shared/model/units';


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
                new Timestamp(entry.timestamp));
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
            new Timestamp(response.track.timestamp)
        );
    }


    public static getPos4dFrom4Tuple(posTuple: number[]): Position4d {
        if (!posTuple || posTuple.length !== 4) {
            return undefined;
        }

        return new Position4d(
            posTuple[0],
            posTuple[1],
            new Altitude(posTuple[2], LengthUnit.M),
            new Timestamp(posTuple[3])
        );
    }
}
