import {createFeatureSelector, createSelector} from '@ngrx/store';
import {BaseMapState} from '../state-model/base-map-state';


export const getMapState = createFeatureSelector<BaseMapState>('baseMapState');
export const getMapPosition = createSelector(getMapState, state => state.position);
export const getMapZoom = createSelector(getMapState, state => state.zoom);
export const getMapRotation = createSelector(getMapState, state => state.rotation);
export const getMapExtent = createSelector(getMapState, state => state.extent);
export const getShowImage = createSelector(getMapState, state => state.showImage);
export const getShowBaseMapSelection = createSelector(getMapState, state => state.showBaseMapSelection);
export const getSelectedMapBaseLayerType = createSelector(getMapState, state => state.baseMapType);
