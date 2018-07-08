import {LocationState} from './model/location-state';
import {LocationActions, LocationActionTypes} from './location.actions';
import {LocationServiceStatus} from './services/location/location.service';


const initialState: LocationState = {
    status: LocationServiceStatus.OFF,
    isWatching: false,
    currentPosition: undefined,
    lastPositions: [],
    startTime: undefined,
    interimTime: undefined
};


export function locationReducer(state: LocationState = initialState, action: LocationActions) {
    switch (action.type) {
        case LocationActionTypes.LOCATION_TOGGLE_WATCH:
            return { ...state, isWatching: !state.isWatching };

        default:
            return state;
    }
}
