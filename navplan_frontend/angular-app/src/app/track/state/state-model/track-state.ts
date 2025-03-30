import {Track} from '../../domain/model/track';
import {TrackProfile} from '../../domain/model/track-profile';
import {TableState} from '../../../common/state/model/table-state';


export interface TrackState {
    trackList: Track[];
    selectedTrack: Track;
    selectedTrackProfile: TrackProfile;
    trackTableState: TableState;
    selectedTrackTab: string;
}
