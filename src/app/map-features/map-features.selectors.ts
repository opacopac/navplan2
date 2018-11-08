import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MapFeaturesState} from './map-features-state';


export const getMapFeaturesState = createFeatureSelector<MapFeaturesState>('mapFeaturesState');
export const getMapFeatures = createSelector(getMapFeaturesState, mapFeaturesState => mapFeaturesState.mapFeatures);
export const getMapFeaturesAirports = createSelector(getMapFeaturesState, mapFeaturesState => mapFeaturesState.mapFeatures ? mapFeaturesState.mapFeatures.airports : []);
export const getMapFeaturesExtent = createSelector(getMapFeaturesState, mapFeaturesState => mapFeaturesState.extent);
export const getMapFeaturesZoom = createSelector(getMapFeaturesState, mapFeaturesState => mapFeaturesState.zoom);
