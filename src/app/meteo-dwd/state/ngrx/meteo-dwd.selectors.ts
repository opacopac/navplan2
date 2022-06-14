import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MeteoDwdState} from '../../domain/model/meteo-dwd-state';


export const getMeteoDwdState = createFeatureSelector<MeteoDwdState>('meteoDwdState');
export const getMeteoDwdButtonStatus = createSelector(getMeteoDwdState, state => state.buttonStatus);
export const getMeteoDwdShowWeather = createSelector(getMeteoDwdState, state => state.showWeatherForecast);
export const getMeteoDwdShowWind = createSelector(getMeteoDwdState, state => state.showWindForecast);
export const getMeteoDwdSelectedInterval = createSelector(getMeteoDwdState, state => state.selectedInterval);
export const getMeteoDwdWindGrid = createSelector(getMeteoDwdState, state => state.windGrid);
export const getMeteoDwdWeatherGrid = createSelector(getMeteoDwdState, state => state.weatherGrid);
