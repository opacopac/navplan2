import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AirportChartState} from '../domain-model/airport-chart-state';


export const getAirportChartState = createFeatureSelector<AirportChartState>('airportChartState');
export const getAirportCharts = createSelector(getAirportChartState, state => state.airportCharts);
