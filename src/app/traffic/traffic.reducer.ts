import {TrafficState} from './traffic-state';
import {TrafficMerger} from './traffic-merger/traffic-merger';
import {TrafficActions, TrafficActionTypes} from './traffic.actions';
import {Length} from '../shared/model/quantities/length';
import {LengthUnit} from '../shared/model/quantities/units';
import {Traffic} from './model/traffic';
import {BaseMapActions, BaseMapActionTypes} from '../base-map/base-map.actions';
import {TrafficServiceStatus} from './services/traffic-service-status';
import {Extent3d} from '../shared/model/geometry/extent3d';


export const initialTrafficState: TrafficState = {
    sessionId: Math.floor((Math.random() * 1000000000)).toString(),
    extent: undefined,
    isWatching: false,
    status: TrafficServiceStatus.OFF,
    trafficMap: new Map<string, Traffic>(),
};


export function trafficReducer(state: TrafficState = initialTrafficState, action: TrafficActions | BaseMapActions) {
    switch (action.type) {
        case BaseMapActionTypes.BASEMAP_MOVED_ZOOMED_ROTATED:
            return {
                ...state,
                extent: new Extent3d(
                    action.extent.minLon,
                    action.extent.minLat,
                    new Length(0, LengthUnit.FT), // TODO
                    action.extent.maxLon,
                    action.extent.maxLat,
                    new Length(15000, LengthUnit.FT), // TODO
                )
            };

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

        case TrafficActionTypes.TRAFFIC_READ_SUCCESS:
            if (state.isWatching) {
                return {
                    ...state,
                    trafficMap: TrafficMerger.mergeTrafficMap(state.trafficMap, action.traffic, state.extent),
                    status: TrafficServiceStatus.CURRENT,
                };
            } else {
                return state;
            }

        case TrafficActionTypes.TRAFFIC_READ_ERROR:
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
