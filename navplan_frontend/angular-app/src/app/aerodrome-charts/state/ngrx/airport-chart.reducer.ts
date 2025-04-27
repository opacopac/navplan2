import {createReducer, on} from '@ngrx/store';
import {AirportChartActions} from './airport-chart.actions';
import {AirportChartState} from '../state-model/airport-chart-state';
import {PdfParameters} from '../../domain/model/pdf-parameters';


const initialState: AirportChartState = {
    airportCharts: [],
    selectedChartFile: null,
    pdfParameters: PdfParameters.createDefault(),
    uploadedChartInfo: null,
    isUploading: false,
    chartReference1: null,
    chartReference2: null,
    mapReference1: null,
    mapReference2: null
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

    on(AirportChartActions.chartFileSelected, (state, action) => ({
        ...state,
        selectedChartFile: action.file
    })),

    on(AirportChartActions.uploadAirportChart, (state, action) => ({
        ...state,
        uploadedChartInfo: null,
        isUploading: true,
        pdfParameters: action.chartUploadParameters.pdfParameters
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
    })),

    on(AirportChartActions.chartReference1Changed, (state, action) => ({
        ...state,
        chartReference1: action.chartReference1,
    })),

    on(AirportChartActions.chartReference2Changed, (state, action) => ({
        ...state,
        chartReference2: action.chartReference2
    })),

    on(AirportChartActions.mapReference1Changed, (state, action) => ({
        ...state,
        mapReference1: action.mapReference1
    })),

    on(AirportChartActions.mapReference2Changed, (state, action) => ({
        ...state,
        mapReference2: action.mapReference2
    })),
);
