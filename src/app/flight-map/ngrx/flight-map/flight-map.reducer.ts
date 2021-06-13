import {FlightMapState} from '../../domain-model/flight-map-state';
import {FlightMapActions} from './flight-map.actions';
import {createReducer, on} from '@ngrx/store';
import {WaypointConverter} from '../../../flightroute/domain-model/converter/waypoint-converter';


const initialState: FlightMapState = {
    showOverlay: {
        dataItem: undefined,
        waypoint: undefined,
        clickPos: undefined,
        metarTaf: undefined,
        notams: [],
        tabIndex: 0
    },
};


export const flightMapReducer = createReducer(
    initialState,
    on(FlightMapActions.showOverlay, (state, action) => ({
        ...state,
        showOverlay: {
            dataItem: action.dataItem,
            waypoint: WaypointConverter.createWaypointFromDataItem(action.dataItem, action.clickPos),
            clickPos: action.clickPos,
            metarTaf: action.metarTaf,
            notams: action.notams,
            tabIndex: action.tabIndex
        }
    })),
    on(FlightMapActions.hideOverlay, (state) => ({
        ...state,
        showOverlay: initialState.showOverlay
    })),
);
