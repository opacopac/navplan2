import {createReducer, on} from '@ngrx/store';
import {AirportChartActions} from './airport-chart.actions';
import {AirportChartState} from '../../domain-model/airport-chart-state';


const initialState: AirportChartState = {
    airportCharts: []
};


export const airportChartReducer = createReducer(
    initialState,
    on(AirportChartActions.showAirportChart, (state, action) => ({
        ...state,
        airportCharts: [...state.airportCharts, action.chart ]
    })),
    on(AirportChartActions.closeAirportChart, (state, action) => ({
        ...state,
        airportCharts: [ ...state.airportCharts.filter(chart => chart.id !== action.chartId) ]
    })),
);
