import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AirportChartState} from '../state-model/airport-chart-state';


export const getAirportChartState = createFeatureSelector<AirportChartState>('airportChartState');
export const getAirportCharts = createSelector(getAirportChartState, state => state.airportCharts);
export const getUploadedChartInfo = createSelector(getAirportChartState, state => state.uploadedChartInfo);
