import {Traffic} from './model/traffic';
import {Length} from '../shared/model/quantities/length';
import {Extent2d} from '../shared/model/geometry/extent2d';
import {TrafficServiceStatus} from './services/traffic-service-status';


export interface TrafficState {
    sessionId: string;
    extent: Extent2d;
    isWatching: boolean;
    status: TrafficServiceStatus;
    trafficMap: Map<string, Traffic>;
    trafficMaxAltitude: Length;
}
