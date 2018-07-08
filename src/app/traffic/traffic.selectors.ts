import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TrafficState} from './model/traffic-state';


export const getTrafficState = createFeatureSelector<TrafficState>('trafficState');
export const getTrafficStatus = createSelector(getTrafficState, state => state.status);
export const getTrafficIsWatching = createSelector(getTrafficState, state => state.isWatching);
