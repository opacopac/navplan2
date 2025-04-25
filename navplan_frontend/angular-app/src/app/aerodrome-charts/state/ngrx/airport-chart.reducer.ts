import {createReducer, on} from '@ngrx/store';
import {AirportChartActions} from './airport-chart.actions';
import {AirportChartState} from '../state-model/airport-chart-state';


const initialState: AirportChartState = {
    airportCharts: [],
    uploadedChartInfo: null,
    isUploading: false
};


export const airportChartReducer = createReducer(
    initialState,
    on(AirportChartActions.showAirportChart, (state, action) => ({
        ...state,
        airportCharts: [...state.airportCharts, action.chart]
    })),

    on(AirportChartActions.closeAirportChart, (state, action) => ({
        ...state,
        airportCharts: [...state.airportCharts.filter(chart => chart.id !== action.chartId)]
    })),

    on(AirportChartActions.uploadAirportChart, (state, action) => ({
        ...state,
        uploadedChartInfo: null,
        isUploading: true
    })),

    on(AirportChartActions.uploadAirportChartSuccess, (state, action) => ({
        ...state,
        uploadedChartInfo: action.chartInfo,
        isUploading: false
    })),

    on(AirportChartActions.uploadAirportChartError, (state, action) => ({
        ...state,
        uploadedChartInfo: null,
        isUploading: false
    }))
);
