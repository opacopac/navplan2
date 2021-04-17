import {FlightMapState} from '../domain-model/flight-map-state';
import {FlightMapActions, FlightMapActionTypes} from './flight-map.actions';


const initialState: FlightMapState = {
    isActive: false,
};


export function flightMapReducer(state: FlightMapState = initialState, action: FlightMapActions) {
    switch (action.type) {
        case FlightMapActionTypes.FLIGHT_MAP_ACTIVATE:
            return { ...state, isActive: action.isActive };

        default:
            return state;
    }
}
