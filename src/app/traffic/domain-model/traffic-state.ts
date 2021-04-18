import {TrafficServiceStatus} from './traffic-service-status';
import {Extent3d} from '../../common/geo-math/domain-model/geometry/extent3d';
import {TrafficMap} from './traffic-map';


export interface TrafficState {
    sessionId: string;
    extent: Extent3d;
    isWatching: boolean;
    status: TrafficServiceStatus;
    trafficMap: TrafficMap;
    maxTrafficAgeSec;
}
