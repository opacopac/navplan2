import {TrafficState} from './traffic-state';
import {TrafficReducerService, TrafficServiceStatus} from './services/traffic-reducer.service';
import {TrafficActions, TrafficActionTypes} from './traffic.actions';
import {Altitude} from '../shared/model/quantities/altitude';
import {LengthUnit} from '../shared/model/units';
import {Traffic} from './model/traffic';
import {BaseMapActions, BaseMapActionTypes} from '../base-map/base-map.actions';


const initialState: TrafficState = {
    sessionId: Math.floor((Math.random() * 1000000000)).toString(),
    extent: undefined,
    isWatching: false,
    status: TrafficServiceStatus.OFF,
    trafficMap: new Map<string, Traffic>(),
    trafficMaxAltitude: new Altitude(15000, LengthUnit.FT),
};


export function trafficReducer(state: TrafficState = initialState, action: TrafficActions | BaseMapActions) {
    switch (action.type) {
        case BaseMapActionTypes.BASEMAP_MOVED_ZOOMED_ROTATED:
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
        case TrafficActionTypes.TRAFFIC_READ_OPENSKY_SUCCESS:
            if (state.isWatching) {
                return {
                    ...state,
                    trafficMap: TrafficReducerService.reduceTrafficMap(state.trafficMap, action.traffic),
                    status: TrafficServiceStatus.CURRENT,
                };
            } else {
                return state;
            }

        case TrafficActionTypes.TRAFFIC_READ_OGN_ERROR:
        case TrafficActionTypes.TRAFFIC_READ_ADSBEX_ERROR:
        case TrafficActionTypes.TRAFFIC_READ_OPENSKY_ERROR:
            if (state.isWatching) {
                return {
                    ...state,
                    status: TrafficServiceStatus.ERROR,
                };
            } else {
                return state;
            }

        default:
            return state;
    }
}
