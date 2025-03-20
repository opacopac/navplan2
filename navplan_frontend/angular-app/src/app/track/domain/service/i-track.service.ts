import {Track} from '../model/track';
import {TrackProfile} from '../model/track-profile';


export abstract class ITrackService {
    abstract calculateTrackProfile(track: Track): TrackProfile;
}
