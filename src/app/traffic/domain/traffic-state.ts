import {TrafficServiceStatus} from './traffic-service-status';
import {Extent3d} from '../../geo-math/domain/geometry/extent3d';
import {TrafficMap} from './traffic-map';


export interface TrafficState {
    sessionId: string;
    extent: Extent3d;
    isWatching: boolean;
    status: TrafficServiceStatus;
    trafficMap: TrafficMap;
    maxTrafficAgeSec;
}
