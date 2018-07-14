import {TrafficState} from './model/traffic-state';
import {TrafficService, TrafficServiceStatus} from './services/traffic.service';
import {TrafficActions, TrafficActionTypes} from './traffic.actions';
import {Altitude} from '../shared/model/quantities/altitude';
import {LengthUnit} from '../shared/model/units';
import {Traffic} from './model/traffic';
import {MapActions, MapActionTypes} from '../map/map.actions';


const initialState: TrafficState = {
    extent: undefined,
    isWatching: false,
    status: TrafficServiceStatus.OFF,
    trafficMap: new Map<string, Traffic>(),
    trafficMaxAltitude: new Altitude(15000, LengthUnit.FT),
};


export function trafficReducer(state: TrafficState = initialState, action: TrafficActions | MapActions) {
    switch (action.type) {
        case MapActionTypes.MAP_MOVED_ZOOMED_ROTATED:
            return { ...state, extent: action.extent };

        case TrafficActionTypes.TRAFFIC_WATCH_START:
            return { ...state,
                isWatching: true,
                status: TrafficServiceStatus.WAITING
            };

        case TrafficActionTypes.TRAFFIC_WATCH_STOP:
            return { ...state,
                isWatching: false,
                status: TrafficServiceStatus.OFF
            };

        case TrafficActionTypes.TRAFFIC_READ_OGN_SUCCESS:
        case TrafficActionTypes.TRAFFIC_READ_ADSBEX_SUCCESS:
            return { ...state,
                trafficMap: TrafficService.reduceTrafficMap(state.trafficMap, action.traffic),
                status: TrafficServiceStatus.CURRENT,
            };

        case TrafficActionTypes.TRAFFIC_READ_OGN_ERROR:
        case TrafficActionTypes.TRAFFIC_READ_ADSBEX_ERROR:
            return { ...state,
                status: TrafficServiceStatus.ERROR,
            };

        default:
            return state;
    }
}
