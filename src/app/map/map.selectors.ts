import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MapState} from './model/map-state';


export const getMapState = createFeatureSelector<MapState>('mapState');
export const getMapPosition = createSelector(getMapState, state => state.position);
export const getMapZoom = createSelector(getMapState, state => state.zoom);
export const getMapRotation = createSelector(getMapState, state => state.rotation);
export const getMapExtent = createSelector(getMapState, state => state.extent);
export const getSelectedDataItem = createSelector(getMapState, state => state.selectedDataItem);
export const getClickPos = createSelector(getMapState, state => state.clickPos);
