import {Traffic} from './domain/traffic';
import {TrafficServiceStatus} from './services/traffic-service-status';
import {Extent3d} from '../shared/model/geometry/extent3d';


export interface TrafficState {
    sessionId: string;
    extent: Extent3d;
    isWatching: boolean;
    status: TrafficServiceStatus;
    trafficMap: Map<string, Traffic>;
}
