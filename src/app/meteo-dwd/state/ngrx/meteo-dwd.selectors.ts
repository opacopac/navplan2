import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MeteoDwdState} from '../model/meteo-dwd-state';


export const getMeteoDwdState = createFeatureSelector<MeteoDwdState>('meteoDwdState');
export const getShowMeteoDwdLayer = createSelector(getMeteoDwdState, state => state.showLayer);
export const getMeteoDwdWindGrid = createSelector(getMeteoDwdState, state => state.windGrid);
export const getMeteoDwdWeatherGrid = createSelector(getMeteoDwdState, state => state.weatherGrid);
export const getMeteoDwdMapTilesUrl = createSelector(getMeteoDwdState, state => state.mapTilesUrl);
export const getMeteoDwdForecastRun = createSelector(getMeteoDwdState, state => state.forecastRun);
export const getMeteoDwdSelectedStep = createSelector(getMeteoDwdState, state => state.selectedStep);
