import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AirportChartState} from '../state-model/airport-chart-state';


export const getAirportChartState = createFeatureSelector<AirportChartState>('airportChartState');
export const getAirportCharts = createSelector(getAirportChartState, state => state.airportCharts);
export const getUploadAirportChartState = createSelector(getAirportChartState, state => state.uploadAirportChartState);
export const getSelectedChartFile = createSelector(getUploadAirportChartState, state => state.selectedChartFile);
export const getPdfParameters = createSelector(getUploadAirportChartState, state => state.pdfParameters);
export const getSelectedAirport = createSelector(getUploadAirportChartState, state => state.selectedAirport);
export const getUploadedChartInfo = createSelector(getUploadAirportChartState, state => state.uploadedChartInfo);
export const getChartRegistrationType = createSelector(getUploadAirportChartState, state => state.chartRegistrationType);
export const getIsUploading = createSelector(getUploadAirportChartState, state => state.isUploading);
export const getChartName = createSelector(getUploadAirportChartState, state => state.chartName);
export const getChartReference1 = createSelector(getUploadAirportChartState, state => state.chartReference1);
export const getChartReference2 = createSelector(getUploadAirportChartState, state => state.chartReference2);
export const getChartScale = createSelector(getUploadAirportChartState, state => state.chartScale);
export const getGeoCoordinateType = createSelector(getUploadAirportChartState, state => state.geoCoordinateType);

export const getMapReference1 = createSelector(getUploadAirportChartState, state => state.mapReference1);

export const getMapReference2 = createSelector(getUploadAirportChartState, state => state.mapReference2);
