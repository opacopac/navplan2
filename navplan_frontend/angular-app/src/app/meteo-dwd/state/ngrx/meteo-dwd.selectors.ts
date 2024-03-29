import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MeteoDwdState} from '../model/meteo-dwd-state';


export const getMeteoDwdState = createFeatureSelector<MeteoDwdState>('meteoDwdState');
export const getMeteoDwdLayer = createSelector(getMeteoDwdState, state => state.showLayer);
export const getMeteoDwdWindValues = createSelector(getMeteoDwdState, state => state.windValues);
export const getMeteoDwdWeatherValues = createSelector(getMeteoDwdState, state => state.weatherValues);
export const getMeteoDwdMapTilesUrl = createSelector(getMeteoDwdState, state => state.mapTilesUrl);
export const getMeteoDwdForecastRun = createSelector(getMeteoDwdState, state => state.forecastRun);
export const getMeteoDwdSelectedStep = createSelector(getMeteoDwdState, state => state.selectedStep);
