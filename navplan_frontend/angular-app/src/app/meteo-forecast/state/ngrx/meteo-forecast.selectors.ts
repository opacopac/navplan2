import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MeteoForecastState} from '../model/meteo-forecast-state';


export const getMeteoForecastState = createFeatureSelector<MeteoForecastState>('meteoForecastState');
export const getMeteoForecastLayer = createSelector(getMeteoForecastState, state => state.showLayer);
export const getMeteoForecastWindValues = createSelector(getMeteoForecastState, state => state.windValues);
export const getMeteoForecastWeatherValues = createSelector(getMeteoForecastState, state => state.weatherValues);
export const getMeteoForecastMapTilesUrl = createSelector(getMeteoForecastState, state => state.mapTilesUrl);
export const getMeteoForecastForecastRun = createSelector(getMeteoForecastState, state => state.selectedFcRun);
export const getMeteoForecastSelectedStep = createSelector(getMeteoForecastState, state => state.selectedStep);
export const getMeteoForecastAvailableForecastRuns = createSelector(getMeteoForecastState, state => state.availableFcRuns);
export const getMeteoForecastMaxZoomLevel = createSelector(getMeteoForecastState, state => state.selectedFcRun?.model?.maxZoomLevel);
