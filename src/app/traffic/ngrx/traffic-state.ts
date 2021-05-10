import {TrafficServiceStatus} from '../domain-model/traffic-service-status';
import {Extent3d} from '../../common/geo-math/domain-model/geometry/extent3d';
import {TrafficMap} from '../domain-model/traffic-map';


export interface TrafficState {
    sessionId: string;
    extent: Extent3d;
    isWatching: boolean;
    status: TrafficServiceStatus;
    trafficMap: TrafficMap;
    maxTrafficAgeSec;
}
