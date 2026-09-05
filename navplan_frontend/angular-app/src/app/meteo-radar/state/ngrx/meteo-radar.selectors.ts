import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MeteoRadarState} from '../model/meteo-radar-state';


export const getMeteoRadarState = createFeatureSelector<MeteoRadarState>('meteoRadarState');
export const getShowMeteoRadarLayer = createSelector(getMeteoRadarState, state => state.showLayer);
export const getMeteoRadarMapTilesUrl = createSelector(getMeteoRadarState, state => state.mapTilesUrl);
export const getMeteoRadarSelectedImage = createSelector(getMeteoRadarState, state => state.selectedRadarImage);
export const getMeteoRadarAvailableImages = createSelector(getMeteoRadarState, state => state.availableRadarImages);
export const getMeteoRadarMaxZoomLevel = createSelector(getMeteoRadarState, state => 8); // TODO
