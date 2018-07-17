import {LocationState} from './model/location-state';
import {LocationActions, LocationActionTypes} from './location.actions';
import {LocationServiceStatus} from './services/location/location.service';


const initialState: LocationState = {
    status: LocationServiceStatus.OFF,
    isWatching: false,
    lastPositions: [],
    startTime: undefined,
    interimTime: undefined
};


export function locationReducer(state: LocationState = initialState, action: LocationActions) {
    switch (action.type) {
        case LocationActionTypes.LOCATION_WATCH_START:
            return { ...state,
                isWatching: true,
                lastPositions: [],
                status: LocationServiceStatus.WAITING
            };

        case LocationActionTypes.LOCATION_WATCH_STOP:
            return { ...state,
                isWatching: false,
                status: LocationServiceStatus.OFF
            };

        case LocationActionTypes.LOCATION_READ_TIMER_SUCCESS:
            if (state.isWatching) {
                const newLastPositions = state.lastPositions.slice();
                if (action.position) {
                    newLastPositions.push(action.position);
                }
                return {
                    ...state,
                    lastPositions: newLastPositions,
                    status: LocationServiceStatus.CURRENT
                };
            } else {
                return state;
            }

        case LocationActionTypes.LOCATION_READ_TIMER_ERROR:
            if (state.isWatching) {
                return {
                    ...state,
                    isWatching: false,
                    status: LocationServiceStatus.ERROR
                };
            } else {
                return state;
            }

        default:
            return state;
    }
}
