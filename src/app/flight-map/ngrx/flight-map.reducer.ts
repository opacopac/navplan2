import {FlightMapState} from '../domain-model/flight-map-state';
import {FlightMapActions, FlightMapActionTypes} from './flight-map.actions';


const initialState: FlightMapState = {
    dummy: false,
};


export function flightMapReducer(state: FlightMapState = initialState, action: FlightMapActions) {
    switch (action.type) {
        case FlightMapActionTypes.FLIGHT_MAP_DUMMY:
            return { ...state, dummy: true };

        default:
            return state;
    }
}
