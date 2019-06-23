import {TrackState} from '../domain/track-state';
import {TrackActions, TrackActionTypes} from './track.actions';


const initialState: TrackState = {
    trackList: [],
    showTrack: undefined,
};


export function trackReducer(state: TrackState = initialState, action: TrackActions) {
    switch (action.type) {
        case TrackActionTypes.TRACK_READ_LIST_SUCCESS:
            return { ...state,
                trackList: action.trackList };

        case TrackActionTypes.TRACK_READ_LIST_ERROR:
            return { ...state,
                trackList: [] };

        case TrackActionTypes.TRACK_READ_SUCCESS:
            return { ...state,
                showTrack: action.track };

        case TrackActionTypes.TRACK_READ_ERROR:
            return { ...state,
                showTrack: undefined };

        default:
            return state;
    }
}
