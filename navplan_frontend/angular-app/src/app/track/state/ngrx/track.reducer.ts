import {TrackState} from '../state-model/track-state';
import {TrackActions} from './track.actions';
import {createReducer, on} from '@ngrx/store';


const initialState: TrackState = {
    trackList: [],
    selectedTrack: undefined,
    selectedTrackProfile: undefined
};


export const trackReducer = createReducer(
    initialState,
    on(TrackActions.readListSuccess, (state, action) => ({
        ...state,
        trackList: action.trackList
    })),

    on(TrackActions.readListError, (state, action) => ({
        ...state,
        trackList: []
    })),

    on(TrackActions.readSuccess, (state, action) => ({
        ...state,
        selectedTrack: action.track
    })),

    on(TrackActions.readError, TrackActions.clear, (state, action) => ({
        ...state,
        selectedTrack: undefined,
        selectedTrackProfile: undefined
    })),

    on(TrackActions.updateTrackProfile, (state, action) => ({
        ...state,
        selectedTrackProfile: action.trackProfile
    }))
);
