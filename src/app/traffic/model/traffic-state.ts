import {TrafficServiceStatus} from '../services/traffic.service';
import {Traffic} from './traffic';
import {Altitude} from '../../shared/model/quantities/altitude';
import {Extent} from '../../shared/model/extent';


export interface TrafficState {
    extent: Extent;
    isWatching: boolean;
    status: TrafficServiceStatus;
    trafficMap: Map<string, Traffic>;
    trafficMaxAltitude: Altitude;
}
