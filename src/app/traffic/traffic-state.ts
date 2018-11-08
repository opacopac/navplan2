import {TrafficServiceStatus} from './services/traffic-reducer.service';
import {Traffic} from './model/traffic';
import {Altitude} from '../shared/model/quantities/altitude';
import {Extent} from '../shared/model/extent';


export interface TrafficState {
    sessionId: string;
    extent: Extent;
    isWatching: boolean;
    status: TrafficServiceStatus;
    trafficMap: Map<string, Traffic>;
    trafficMaxAltitude: Altitude;
}
