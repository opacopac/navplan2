import {FlightMapState} from './flight-map-state';
import {FlightMapActions} from './flight-map.actions';
import {createReducer, on} from '@ngrx/store';
import {WaypointConverter} from '../../../flightroute/domain/model/converter/waypoint-converter';
import {MeteoLayer} from '../../domain/model/meteo-layer';


const initialState: FlightMapState = {
    showMapOverlay: {
        dataItem: undefined,
        waypoint: undefined,
        clickPos: undefined,
        metarTaf: undefined,
        notams: [],
        tabIndex: 0
    },
    showMeteoLayer: false,
    meteoLayer: MeteoLayer.SmaStationsLayer
};


export const flightMapReducer = createReducer(
    initialState,
    on(FlightMapActions.showOverlaySuccess, (state, action) => ({
        ...state,
        showMapOverlay: {
            dataItem: action.dataItem,
            waypoint: action.waypoints?.length > 0
                ? action.waypoints[0] // TODO: handle multiple waypoints
                : WaypointConverter.createWaypointFromDataItem(action.dataItem, action.clickPos),
            clickPos: action.clickPos,
            metarTaf: action.metarTaf,
            notams: action.notams,
            tabIndex: action.tabIndex
        }
    })),
    on(FlightMapActions.hideOverlay, (state) => ({
        ...state,
        showMapOverlay: initialState.showMapOverlay
    })),
    on(FlightMapActions.toggleMeteoLayer, (state) => ({
        ...state,
        showMeteoLayer: !state.showMeteoLayer
    })),
    on(FlightMapActions.selectMeteoLayer, (state, action) => ({
        ...state,
        meteoLayer: action.meteoLayer
    }))
);
