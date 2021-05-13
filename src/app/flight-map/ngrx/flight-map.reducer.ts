import {FlightMapState} from './flight-map-state';
import {FlightMapActions} from './flight-map.actions';
import {createReducer, on} from '@ngrx/store';


export const initialFlightMapState: FlightMapState = {
    airportState: { extent: undefined, zoom: undefined, airports: [] },
    airportCircuitState: { extent: undefined, zoom: undefined, airportCircuits: [] },
    reportingPointSectorState: { extent: undefined, zoom: undefined, reportingPoints: [], reportingSectors: [] },
    airspaceState: { extent: undefined, zoom: undefined, airspaces: [] },
    navaidState: { extent: undefined, zoom: undefined, navaids: [] },
    webcamState: { extent: undefined, zoom: undefined, webcams: [] },
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
    on(FlightMapActions.showNavaids, (state, action) => ({
        ...state,
        navaidState: { extent: action.extent, zoom: action.zoom, navaids: action.navaids }
    })),
    on(FlightMapActions.showWebcams, (state, action) => ({
        ...state,
        webcamState: { extent: action.extent, zoom: action.zoom, webcams: action.webcams }
    })),
    on(FlightMapActions.showOverlay, (state, action) => ({
        ...state,
        showOverlay: action
    })),
    on(FlightMapActions.closeAllOverlays, (state) => ({
        ...state,
        showOverlay: { dataItem: undefined, clickPos: undefined }
    })),
);
