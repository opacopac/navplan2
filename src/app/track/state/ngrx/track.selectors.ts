import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TrackState} from '../state-model/track-state';


export const getTrackState = createFeatureSelector<TrackState>('trackState');
export const getTrackList = createSelector(getTrackState, state => state.trackList);
export const getShowTrack = createSelector(getTrackState, state => state.showTrack);
