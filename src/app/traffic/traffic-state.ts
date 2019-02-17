import {Traffic} from './model/traffic';
import {Length} from '../shared/model/quantities/length';
import {Extent} from '../shared/model/extent';
import {TrafficServiceStatus} from './services/traffic-service-status';


export interface TrafficState {
    sessionId: string;
    extent: Extent;
    isWatching: boolean;
    status: TrafficServiceStatus;
    trafficMap: Map<string, Traffic>;
    trafficMaxAltitude: Length;
}
