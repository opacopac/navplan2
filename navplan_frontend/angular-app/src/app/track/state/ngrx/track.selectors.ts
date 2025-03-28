import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TrackState} from '../state-model/track-state';


export const getTrackState = createFeatureSelector<TrackState>('trackState');
export const getTrackList = createSelector(getTrackState, state => state.trackList);
export const getSelectedTrack = createSelector(getTrackState, state => state.selectedTrack);
export const getSelectedTrackProfile = createSelector(getTrackState, state => state.selectedTrackProfile);
export const getTrackTableState = createSelector(getTrackState, state => state.trackTableState);
