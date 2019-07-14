import {TrafficState} from '../domain/traffic-state';
import {TrafficActions, TrafficActionTypes} from './traffic.actions';
import {OlMapActions, OlMapActionTypes} from '../../ol-map/ngrx/ol-map.actions';
import {TrafficServiceStatus} from '../domain/traffic-service-status';
import {TrafficPositionMerger} from '../use-case/traffic-position-merger';
import {TrafficMap} from '../domain/traffic-map';
import {Extent3d} from '../../geo-math/domain/geometry/extent3d';
import {Altitude} from '../../geo-math/domain/geometry/altitude';
import {AltitudeUnit} from '../../geo-math/domain/geometry/altitude-unit';
import {AltitudeReference} from '../../geo-math/domain/geometry/altitude-reference';
import {JsDate} from '../../system/use-case/date/js-date';


export const initialTrafficState: TrafficState = {
    sessionId: Math.floor((Math.random() * 1000000000)).toString(),
    extent: undefined,
    isWatching: false,
    status: TrafficServiceStatus.OFF,
    trafficMap: new TrafficMap(new JsDate()),
    maxTrafficAgeSec: TrafficPositionMerger.TRAFFIC_MAX_AGE_SEC
};


export function trafficReducer(state: TrafficState = initialTrafficState, action: TrafficActions | OlMapActions): TrafficState {
    switch (action.type) {
        case OlMapActionTypes.OL_MAP_MOVED_ZOOMED_ROTATED:
            return {
                ...state,
                extent: new Extent3d(
                    action.extent.minLon,
                    action.extent.minLat,
                    new Altitude(0, AltitudeUnit.FT, AltitudeReference.MSL), // TODO
                    action.extent.maxLon,
                    action.extent.maxLat,
                    new Altitude(15000, AltitudeUnit.FT, AltitudeReference.MSL), // TODO
                )
            };

        case TrafficActionTypes.TRAFFIC_WATCH_START:
            return { ...state, isWatching: true, status: TrafficServiceStatus.WAITING };

        case TrafficActionTypes.TRAFFIC_WATCH_STOP:
            return { ...state, isWatching: false, status: TrafficServiceStatus.OFF };

        case TrafficActionTypes.TRAFFIC_READ_SUCCESS:
            if (state.isWatching) {
                return { ...state, trafficMap: action.newTrafficMap, status: TrafficServiceStatus.CURRENT };
            } else {
                return state;
            }

        case TrafficActionTypes.TRAFFIC_READ_ERROR:
            if (state.isWatching) {
                return { ...state, status: TrafficServiceStatus.ERROR };
            } else {
                return state;
            }

        default:
            return state;
    }
}
