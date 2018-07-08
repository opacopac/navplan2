import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MapState} from './model/map-state';

export const getSearchState = createFeatureSelector<MapState>('mapState');
export const getMapPosition = createSelector(getSearchState, state => state.position);
export const getMapZoom = createSelector(getSearchState, state => state.zoom);
export const getMapRotation = createSelector(getSearchState, state => state.rotation);
export const getMapExtent = createSelector(getSearchState, state => state.extent);
