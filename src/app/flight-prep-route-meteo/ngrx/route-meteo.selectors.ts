import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RouteMeteoState} from './route-meteo-state';


export const getRouteMeteoState = createFeatureSelector<RouteMeteoState>('routeMeteoState');
export const getRouteMetarTafList = createSelector(getRouteMeteoState, state => state.metarTafs);
