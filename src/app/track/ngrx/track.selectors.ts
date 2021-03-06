import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TrackState} from './track-state';


export const getTrackState = createFeatureSelector<TrackState>('trackState');
export const getTrackList = createSelector(getTrackState, state => state.trackList);
export const getShowTrack = createSelector(getTrackState, state => state.showTrack);
