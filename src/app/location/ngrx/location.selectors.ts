import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LocationState} from './location-state';


export const getLocationState = createFeatureSelector<LocationState>('locationState');
export const getLocationStatus = createSelector(getLocationState, state => state.status);
export const getLocationIsWatching = createSelector(getLocationState, state => state.isWatching);
