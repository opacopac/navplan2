import {Track} from '../../domain/model/track';
import {TrackProfile} from '../../domain/model/track-profile';


export interface TrackState {
    trackList: Track[];
    selectedTrack: Track;
    selectedTrackProfile: TrackProfile;
}
