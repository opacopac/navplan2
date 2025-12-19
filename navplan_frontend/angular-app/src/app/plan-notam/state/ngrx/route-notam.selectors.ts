import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RouteNotamState} from '../state-model/route-notam-state';


export const getRouteNotamState = createFeatureSelector<RouteNotamState>('routeNotamState');
export const getNotams = createSelector(getRouteNotamState, state => state.notams);
