import {FlightrouteState} from "./model/flightroute-state";
import {WaypointActionTypes, WaypointsActions} from "./waypoints.actions";


const initialState: FlightrouteState = {
    flightrouteList: undefined,
    flightroute: undefined,
    showShareId: undefined,
};


export function waypointsReducer(
    state: FlightrouteState = initialState,
    action: WaypointsActions) {

    switch (action.type) {
        case WaypointActionTypes.WAYPOINTS_REVERSE:
            return { ...state }; // TODO

        default:
            return state;
    }
}
