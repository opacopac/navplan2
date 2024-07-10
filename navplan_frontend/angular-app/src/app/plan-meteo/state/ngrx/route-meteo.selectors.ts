import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RouteMeteoState} from '../state-model/route-meteo-state';


export const getRouteMeteoState = createFeatureSelector<RouteMeteoState>('routeMeteoState');
export const getRouteMetarTafs = createSelector(getRouteMeteoState, state => state.routeMetarTafs);
