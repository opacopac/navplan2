import {Track} from '../track';
import {Timestamp} from '../timestamp';


export interface TrackListResponse {
    tracks: TrackListEntry[];
}


export interface TrackListEntry {
    id: number;
    timestamp: number;
    name: string;
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
                null,
                new Timestamp(entry.timestamp));
            trackList.push(track);
        }

        return trackList;
    }
}
