import {createFeatureSelector, createSelector} from '@ngrx/store';
import {OlMapState} from '../domain/ol-map-state';


export const getMapState = createFeatureSelector<OlMapState>('baseMapState');
export const getMapPosition = createSelector(getMapState, state => state.position);
export const getMapZoom = createSelector(getMapState, state => state.zoom);
export const getMapRotation = createSelector(getMapState, state => state.rotation);
export const getMapExtent = createSelector(getMapState, state => state.extent);
export const getShowOverlay = createSelector(getMapState, state => state.showOverlay);
