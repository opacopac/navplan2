import {FlightMapState} from '../domain-model/flight-map-state';
import {FlightMapActions} from './flight-map.actions';
import {createReducer, on} from '@ngrx/store';


export const initialFlightMapState: FlightMapState = {
    airportState: { extent: undefined, zoom: undefined, airports: [] },
    airportChartState: { airportCharts: [] },
    airportCircuitState: { extent: undefined, zoom: undefined, airportCircuits: [] },
    reportingPointSectorState: { extent: undefined, zoom: undefined, reportingPoints: [], reportingSectors: [] },
    airspaceState: { extent: undefined, zoom: undefined, airspaces: [] },
    metarTafState: { extent: undefined, zoom: undefined, timestamp: 0, metarTafs: [] },
    navaidState: { extent: undefined, zoom: undefined, navaids: [] },
    webcamState: { extent: undefined, zoom: undefined, webcams: [] },
    showAirportOverlay: { airport: undefined, metarTaf: undefined, notams: [], tabIndex: 0 },
    showOverlay: { dataItem: undefined, clickPos: undefined },
};


export const flightMapReducer = createReducer(
    initialFlightMapState,
    on(FlightMapActions.showAirports, (state, action) => ({
        ...state,
        airportState: { extent: action.extent, zoom: action.zoom, airports: action.airports }
    })),
    on(FlightMapActions.showCircuits, (state, action) => ({
        ...state,
        airportCircuitState: { extent: action.extent, zoom: action.zoom, airportCircuits: action.airportCircuits }
    })),
    on(FlightMapActions.showReportingPointsSectors, (state, action) => ({
        ...state,
        reportingPointSectorState: { extent: action.extent, zoom: action.zoom, reportingPoints: action.reportingPoints,
            reportingSectors: action.reportingSectors }
    })),
    on(FlightMapActions.showAirspaces, (state, action) => ({
        ...state,
        airspaceState: { extent: action.extent, zoom: action.zoom, airspaces: action.airspaces }
    })),
    on(FlightMapActions.showMetarTafs, (state, action) => ({
        ...state,
        metarTafState: { extent: action.extent, zoom: action.zoom, timestamp: action.timestamp, metarTafs: action.metarTafs }
    })),
    on(FlightMapActions.showNavaids, (state, action) => ({
        ...state,
        navaidState: { extent: action.extent, zoom: action.zoom, navaids: action.navaids }
    })),
    on(FlightMapActions.showWebcams, (state, action) => ({
        ...state,
        webcamState: { extent: action.extent, zoom: action.zoom, webcams: action.webcams }
    })),
    on(FlightMapActions.showAirportOverlay, (state, action) => ({
        ...state,
        showAirportOverlay: { airport: action.airport, metarTaf: action.metarTaf, notams: action.notams, tabIndex: action.tabIndex }
    })),
    on(FlightMapActions.showOverlay, (state, action) => ({
        ...state,
        showOverlay: { dataItem: action.dataItem, clickPos: action.clickPos }
    })),
    on(FlightMapActions.showAirportChart, (state, action) => ({
        ...state,
        airportChartState: { airportCharts: [...state.airportChartState.airportCharts, action.chart ] },
        showOverlay: { dataItem: undefined, clickPos: undefined }
    })),
    on(FlightMapActions.closeAirportChart, (state, action) => ({
        ...state,
        airportChartState: {
            airportCharts: [ ...state.airportChartState.airportCharts.filter(chart => chart.id !== action.chartId) ]
        },
    })),
    on(FlightMapActions.closeAllOverlays, (state) => ({
        ...state,
        showOverlay: { dataItem: undefined, clickPos: undefined },
        showAirportOverlay: { airport: undefined, metarTaf: undefined, notams: [], tabIndex: 0 },
    })),
);
