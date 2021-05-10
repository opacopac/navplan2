import {Track} from '../domain-model/track';
import {IRestTrackResponse} from './i-rest-track-response';
import {RestTrackConverter} from './rest-track-converter';


export class RestTrackResponseConverter {
    public static fromRest(restResponse: IRestTrackResponse): Track {
        if (!restResponse.track) {
            return undefined;
        }

        return RestTrackConverter.fromRest(restResponse.track);
    }
}
