import {Track} from '../../track/domain-model/track';
import {IRestTrackListResponse} from './i-rest-track-list-response';
import {RestTrackConverter} from './rest-track-converter';


export class RestTrackListResponseConverter {
    public static fromRest(restTrackList: IRestTrackListResponse): Track[] {
        if (!restTrackList.tracks || restTrackList.tracks.length === 0) {
            return [];
        }

        return RestTrackConverter.fromRestList(restTrackList.tracks);
    }
}
