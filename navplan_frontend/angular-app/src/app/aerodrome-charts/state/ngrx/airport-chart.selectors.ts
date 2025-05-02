import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AirportChartState} from '../state-model/airport-chart-state';


export const getAirportChartState = createFeatureSelector<AirportChartState>('airportChartState');
export const getAirportCharts = createSelector(getAirportChartState, state => state.airportCharts);
export const getSelectedChartFile = createSelector(getAirportChartState, state => state.selectedChartFile);
export const getPdfParameters = createSelector(getAirportChartState, state => state.pdfParameters);
export const getSelectedAirport = createSelector(getAirportChartState, state => state.selectedAirport);
export const getUploadedChartInfo = createSelector(getAirportChartState, state => state.uploadedChartInfo);
export const getIsUploading = createSelector(getAirportChartState, state => state.isUploading);
export const getChartReference1 = createSelector(getAirportChartState, state => state.chartReference1);
export const getChartReference2 = createSelector(getAirportChartState, state => state.chartReference2);

export const getMapReference1 = createSelector(getAirportChartState, state => state.mapReference1);

export const getMapReference2 = createSelector(getAirportChartState, state => state.mapReference2);
