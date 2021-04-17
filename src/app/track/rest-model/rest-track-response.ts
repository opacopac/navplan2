import {Track} from '../domain-model/track';
import {IRestTrackResponse} from './i-rest-track-response';
import {RestTrack} from './rest-track';


export class RestTrackResponse {
    public static fromRest(restResponse: IRestTrackResponse): Track {
        if (!restResponse.track) {
            return undefined;
        }

        return RestTrack.fromRest(restResponse.track);
    }
}
