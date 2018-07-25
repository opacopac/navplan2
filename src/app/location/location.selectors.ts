import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LocationState} from './model/location-state';

export const getLocationState = createFeatureSelector<LocationState>('locationState');
export const getLocationStatus = createSelector(getLocationState, state => state.status);
export const getLocationIsWatching = createSelector(getLocationState, state => state.isWatching);
export const getTrackList = createSelector(getLocationState, state => state.trackList);
export const getShowTrack = createSelector(getLocationState, state => state.showTrack);
