import {createReducer, on} from '@ngrx/store';
import {AirportChartActions} from './airport-chart.actions';
import {AirportChartState} from '../state-model/airport-chart-state';
import {PdfParameters} from '../../domain/model/pdf-parameters';
import {FlightMapActions} from '../../../flight-map/state/ngrx/flight-map.actions';
import {ChartRegistrationType} from '../../domain/model/chart-registration-type';
import {GeoCoordinateType} from '../../domain/model/geo-coordinate-type';
import {GeoCoordinate} from '../../../geo-physics/domain/model/geometry/geo-coordinate';


const initialUploadAdChartState = {
    selectedAirport: undefined,
    selectedChartFile: undefined,
    pdfParameters: PdfParameters.createDefault(),
    uploadedChartInfo: undefined,
    isUploading: false,
    chartName: undefined,
    chartRegistrationType: ChartRegistrationType.POS1_POS2,
    chartReference1: undefined,
    chartReference2: undefined,
    chartScale: undefined,
    geoCoordinateType: GeoCoordinateType.LON_LAT,
    mapReference1: undefined,
    mapReference2: undefined
};

const initialState: AirportChartState = {
    airportCharts: [],
    uploadAirportChartState: initialUploadAdChartState
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

    // upload airport chart actions

    on(FlightMapActions.showUploadChartSidebar, (state, action) => ({
        ...state,
        uploadAirportChartState: {
            ...initialUploadAdChartState,
            selectedAirport: action.selectedAirport
        }
    })),

    on(AirportChartActions.chartFileSelected, (state, action) => ({
        ...state,
        uploadAirportChartState: {
            ...state.uploadAirportChartState,
            selectedChartFile: action.file,
            chartReference1: undefined,
            chartReference2: undefined,
            mapReference1: undefined,
            mapReference2: undefined
        }
    })),

    on(AirportChartActions.uploadAirportChart, (state, action) => ({
        ...state,
        uploadAirportChartState: {
            ...state.uploadAirportChartState,
            uploadedChartInfo: undefined,
            isUploading: true,
            pdfParameters: action.chartUploadParameters.pdfParameters
        }
    })),

    on(AirportChartActions.uploadAirportChartSuccess, (state, action) => ({
        ...state,
        uploadAirportChartState: {
            ...state.uploadAirportChartState,
            uploadedChartInfo: action.chartInfo,
            chartName: action.chartInfo.nameproposal ? action.chartInfo.nameproposal : state.uploadAirportChartState.chartName,
            chartScale: action.chartInfo.scaleproposal > 0 ? action.chartInfo.scaleproposal : state.uploadAirportChartState.chartScale,
            isUploading: false
        }
    })),

    on(AirportChartActions.uploadAirportChartError, (state, action) => ({
        ...state,
        uploadAirportChartState: {
            ...state.uploadAirportChartState,
            uploadedChartInfo: undefined,
            isUploading: false
        }
    })),

    on(AirportChartActions.chartNameChanged, (state, action) => ({
        ...state,
        uploadAirportChartState: {
            ...state.uploadAirportChartState,
            chartName: action.chartName
        }
    })),

    on(AirportChartActions.chartRegistrationTypeChanged, (state, action) => ({
        ...state,
        uploadAirportChartState: {
            ...state.uploadAirportChartState,
            chartRegistrationType: action.chartRegistrationType,
            mapReference1: action.chartRegistrationType === ChartRegistrationType.ARP_SCALE
                ? GeoCoordinate.ofPos2d(state.uploadAirportChartState.selectedAirport.position)
                : state.uploadAirportChartState.mapReference1,
            mapReference2: action.chartRegistrationType === ChartRegistrationType.ARP_SCALE
                ? undefined
                : state.uploadAirportChartState.mapReference2,
        }
    })),

    on(AirportChartActions.chartReference1Changed, (state, action) => ({
        ...state,
        uploadAirportChartState: {
            ...state.uploadAirportChartState,
            chartReference1: action.chartReference1,
        }
    })),

    on(AirportChartActions.chartReference2Changed, (state, action) => ({
        ...state,
        uploadAirportChartState: {
            ...state.uploadAirportChartState,
            chartReference2: action.chartReference2
        }
    })),

    on(AirportChartActions.chartScaleChanged, (state, action) => ({
        ...state,
        uploadAirportChartState: {
            ...state.uploadAirportChartState,
            chartScale: action.chartScale
        }
    })),

    on(AirportChartActions.geoCoordinateTypeChanged, (state, action) => ({
        ...state,
        uploadAirportChartState: {
            ...state.uploadAirportChartState,
            geoCoordinateType: action.geoCoordinateType,
        }
    })),

    on(AirportChartActions.mapReference1Changed, (state, action) => ({
        ...state,
        uploadAirportChartState: {
            ...state.uploadAirportChartState,
            mapReference1: action.mapReference1
        }
    })),

    on(AirportChartActions.mapReference2Changed, (state, action) => ({
        ...state,
        uploadAirportChartState: {
            ...state.uploadAirportChartState,
            mapReference2: action.mapReference2
        }
    })),
);
