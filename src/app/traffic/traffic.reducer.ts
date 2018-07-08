import {TrafficState} from './model/traffic-state';
import {TrafficServiceStatus} from './services/traffic.service';
import {TrafficActions, TrafficActionTypes} from './traffic.actions';


const initialState: TrafficState = {
    isWatching: false,
    status: TrafficServiceStatus.OFF,
    trafficList: []
};


export function trafficReducer(state: TrafficState = initialState, action: TrafficActions) {
    switch (action.type) {
        case TrafficActionTypes.TRAFFIC_TOGGLE_WATCH:
            return { ...state, isWatching: !state.isWatching };

        default:
            return state;
    }
}
