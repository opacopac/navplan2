import {Track} from '../domain-model/track';
import {IRestTrackListResponse} from './i-rest-track-list-response';
import {IRestTrackListEntry} from './i-rest-track-list-entry';
import {RestTrack} from './rest-track';


export class RestTrackList {
    public static fromRest(restTrackList: IRestTrackListResponse): Track[] {
        if (!restTrackList.tracks || restTrackList.tracks.length === 0) {
            return [];
        }

        const trackList: Track[] = [];
        for (let i = 0; i < restTrackList.tracks.length; i++) {
            const entry: IRestTrackListEntry = restTrackList.tracks[i];
            const track = RestTrack.fromListEntryRest(entry);
            trackList.push(track);
        }

        return trackList;
    }
}
