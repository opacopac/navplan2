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
            const newLastPositions = state.lastPositions.slice();
            if (action.position) {
                newLastPositions.push(action.position.clone());
            }
            return { ...state,
                lastPositions: newLastPositions,
                status: LocationServiceStatus.CURRENT
            };

        case LocationActionTypes.LOCATION_READ_TIMER_ERROR:
            return { ...state,
                isWatching: false,
                status: LocationServiceStatus.ERROR
            };

        default:
            return state;
    }
}
