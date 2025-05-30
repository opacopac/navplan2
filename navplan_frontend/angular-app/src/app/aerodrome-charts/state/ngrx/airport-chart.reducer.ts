import {createReducer, on} from '@ngrx/store';
import {AirportChartActions} from './airport-chart.actions';
import {AirportChartState} from '../state-model/airport-chart-state';
import {PdfParameters} from '../../domain/model/pdf-parameters';
import {FlightMapActions} from '../../../flight-map/state/ngrx/flight-map.actions';
import {ChartRegistrationType} from '../../domain/model/chart-registration-type';
import {GeoCoordinateType} from '../../domain/model/geo-coordinate-type';


const initialState: AirportChartState = {
    airportCharts: [],
    selectedAirport: undefined,
    selectedChartFile: undefined,
    pdfParameters: PdfParameters.createDefault(),
    uploadedChartInfo: undefined,
    isUploading: false,
    chartRegistrationType: ChartRegistrationType.POS1_POS2,
    chartReference1: undefined,
    chartReference2: undefined,
    chartScale: undefined,
    geoCoordinateType: GeoCoordinateType.LON_LAT,
    mapReference1: undefined,
    mapReference2: undefined
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

    on(FlightMapActions.showUploadChartSidebar, (state, action) => ({
        ...state,
        selectedAirport: action.selectedAirport,
    })),

    on(AirportChartActions.chartFileSelected, (state, action) => ({
        ...state,
        selectedChartFile: action.file,
        chartReference1: undefined,
        chartReference2: undefined,
        mapReference1: undefined,
        mapReference2: undefined
    })),

    on(AirportChartActions.uploadAirportChart, (state, action) => ({
        ...state,
        uploadedChartInfo: undefined,
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
        uploadedChartInfo: undefined,
        isUploading: false
    })),

    on(AirportChartActions.chartRegistrationTypeChanged, (state, action) => ({
        ...state,
        chartRegistrationType: action.chartRegistrationType
    })),

    on(AirportChartActions.chartReference1Changed, (state, action) => ({
        ...state,
        chartReference1: action.chartReference1,
    })),

    on(AirportChartActions.chartReference2Changed, (state, action) => ({
        ...state,
        chartReference2: action.chartReference2
    })),

    on(AirportChartActions.chartScaleChanged, (state, action) => ({
        ...state,
        chartScale: action.chartScale
    })),

    on(AirportChartActions.geoCoordinateTypeChanged, (state, action) => ({
        ...state,
        geoCoordinateType: action.geoCoordinateType
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
