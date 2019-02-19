import {Traffic} from './model/traffic';
import {TrafficServiceStatus} from './services/traffic-service-status';
import {Extent4d} from '../shared/model/geometry/extent4d';


export interface TrafficState {
    sessionId: string;
    extent: Extent4d;
    isWatching: boolean;
    status: TrafficServiceStatus;
    trafficMap: Map<string, Traffic>;
}
