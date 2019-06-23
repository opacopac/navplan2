import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TrafficState} from '../domain/traffic-state';


export const getTrafficState = createFeatureSelector<TrafficState>('trafficState');
export const getTrafficIsWatching = createSelector(getTrafficState, state => state.isWatching);
export const getTrafficStatus = createSelector(getTrafficState, state => state.status);
