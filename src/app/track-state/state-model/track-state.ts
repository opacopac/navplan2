import {Track} from '../../track/domain-model/track';


export interface TrackState {
    trackList: Track[];
    showTrack: Track;
}
